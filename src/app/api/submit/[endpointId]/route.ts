import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { forms, submissions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ endpointId: string }> }
) {
	try {
		const { endpointId } = await params;

		// Find the form by endpointId
		const [form] = await db
			.select()
			.from(forms)
			.where(eq(forms.endpointId, endpointId))
			.limit(1);

		if (!form) {
			return NextResponse.json(
				{ error: "Form not found" },
				{ status: 404 }
			);
		}

		// Parse payload — support JSON and form-data
		let payload: Record<string, unknown>;
		const contentType = req.headers.get("content-type") ?? "";

		if (contentType.includes("application/json")) {
			payload = await req.json();
		} else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
			const formData = await req.formData();
			payload = Object.fromEntries(formData.entries());
		} else {
			// Try JSON anyway
			try {
				payload = await req.json();
			} catch {
				return NextResponse.json(
					{ error: "Unsupported content type. Send JSON or form-data." },
					{ status: 400 }
				);
			}
		}

		// Get IP address
		const ipAddress =
			req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
			req.headers.get("cf-connecting-ip") ??
			null;

		// Basic spam check (simple heuristic — can be enhanced later)
		let isSpam = false;

		// Turnstile Verification
		if (form.turnstileEnabled) {
			const turnstileToken = payload["cf-turnstile-response"] as string | undefined;
			
			if (!turnstileToken) {
				return NextResponse.json(
					{ error: "Spam protection triggered. Turnstile token missing." },
					{ status: 403 }
				);
			}

			const verification = await verifyTurnstileToken(turnstileToken);
			if (!verification.success) {
				console.log(`[SPAM] Turnstile verification failed for form ${form.id}:`, (verification as any)["error-codes"]);
				isSpam = true;
				
				// Optional: Block submissions entirely if verification fails
				// return NextResponse.json({ error: "Spam protection triggered. verification failed." }, { status: 403 });
			}
		}

		// Insert submission
		const [submission] = await db
			.insert(submissions)
			.values({
				formId: form.id,
				payload,
				ipAddress,
				isSpam,
			})
			.returning({ id: submissions.id, createdAt: submissions.createdAt });

		// Invalidate dashboard caches
		revalidatePath("/dashboard", "page");
		revalidatePath(`/dashboard/forms/${form.id}`, "page");
		revalidatePath("/dashboard/submissions", "page");

		// Return success with CORS headers
		return NextResponse.json(
			{
				success: true,
				id: submission.id,
				timestamp: submission.createdAt,
			},
			{
				status: 201,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type",
				},
			}
		);
	} catch (error) {
		console.error("Submission error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

// Handle CORS preflight
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}
