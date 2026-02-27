import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { forms, submissions, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { fireIntegrations } from "@/lib/integrations";
import { Resend } from "resend";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");


export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ endpointId: string }> }
) {
	try {
		const { endpointId } = await params;

		// Find the form by endpointId and get user email
		const result = await db
			.select({
				form: forms,
				userEmail: users.email
			})
			.from(forms)
			.leftJoin(users, eq(forms.userId, users.id))
			.where(eq(forms.endpointId, endpointId))
			.limit(1);

		if (result.length === 0) {
			return NextResponse.json(
				{ error: "Form not found" },
				{ status: 404 }
			);
		}

		const { form, userEmail } = result[0];

		// CORS / Allowed Origins Check
		const origin = req.headers.get("origin") || req.headers.get("referer");
		if (form.allowedOrigins) {
			const allowedOrigins = form.allowedOrigins.split(",").map(o => o.trim());
			if (origin) {
				const originUrl = new URL(origin);
				const isAllowed = allowedOrigins.some(allowed => 
					originUrl.hostname === allowed || 
					originUrl.origin === allowed ||
					allowed === "*" // Allow wildcard
				);

				if (!isAllowed) {
					return NextResponse.json(
						{ error: `Origin '${origin}' not allowed` },
						{ status: 403 }
					);
				}
			}
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
			
			if (turnstileToken) {
				// Token provided — verify it
				const verification = await verifyTurnstileToken(turnstileToken);
				if (!verification.success) {
					console.log(`[SPAM] Turnstile verification failed for form ${form.id}:`, (verification as any)["error-codes"]);
					isSpam = true;
				}
			} else {
				// No token — log but don't block (playground, API, or no widget embedded)
				console.log(`[TURNSTILE] No token provided for form ${form.id} — skipping verification`);
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

		// --- Handle Webhooks ---
		if (form.webhookEnabled) {
			if (form.webhookUrl) {
				try {
					await fetch(form.webhookUrl, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							formId: form.id,
							submissionId: submission.id,
							payload,
							createdAt: submission.createdAt,
						}),
					});
				} catch (err) {
					console.error("Webhook failed:", err);
				}
			}

			if (form.slackWebhookUrl) {
				try {
					const slackPayload = {
						text: `*New Submission for ${form.name}*\n\n` + 
							  Object.entries(payload)
								.map(([key, value]) => `*${key}:* ${value}`)
								.join("\n")
					};
					await fetch(form.slackWebhookUrl, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(slackPayload),
					});
				} catch (err) {
					console.error("Slack Webhook failed:", err);
				}
			}

			if (form.discordWebhookUrl) {
				try {
					const discordPayload = {
						content: `**New Submission for ${form.name}**`,
						embeds: [{
							title: "Submission Details",
							color: 3447003,
							fields: Object.entries(payload).map(([key, value]) => ({
								name: key,
								value: String(value).substring(0, 1024),
								inline: true
							}))
						}]
					};
					await fetch(form.discordWebhookUrl, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(discordPayload),
					});
				} catch (err) {
					console.error("Discord Webhook failed:", err);
				}
			}
		}

		// --- Handle Integrations ---
		fireIntegrations(form, payload, submission.id);

		// --- Handle Email Notifications ---
		if (form.emailNotifications && userEmail) {
			try {
				await resend.emails.send({
					from: process.env.RESEND_FROM_EMAIL || "FormGuard <notifications@formguard.dev>",
					to: userEmail,
					subject: `New Submission: ${form.name}`,
					html: `
						<h1>New Form Submission</h1>
						<p>You have received a new submission for your form <strong>${form.name}</strong>.</p>
						<hr />
						<div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px;">
							<pre style="white-space: pre-wrap;">${JSON.stringify(payload, null, 2)}</pre>
						</div>
						<p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/forms/${form.id}/submissions">View in Dashboard</a></p>
					`,
				});
			} catch (emailError) {
				console.error("[EMAIL] Failed to send notification:", emailError);
			}
		}

		// --- Handle Auto-Responder ---
		if (form.autoResponderEnabled) {
			// Try to find an email field in the payload
			const submitterEmail = 
				(payload.email as string) || 
				(payload.Email as string) || 
				(payload.EMAIL as string);

			if (submitterEmail && typeof submitterEmail === 'string' && submitterEmail.includes('@')) {
				try {
					await resend.emails.send({
						from: process.env.RESEND_FROM_EMAIL || "FormGuard <notifications@formguard.dev>",
						to: submitterEmail,
						subject: form.autoResponderSubject || `Thank you for contacting ${form.name}`,
						text: form.autoResponderMessage || "We have received your submission and will get back to you shortly.",
					});
				} catch (emailError) {
					console.error("[EMAIL] Failed to send auto-responder:", emailError);
				}
			}
		}

		// --- Handle Redirects ---
		if (form.redirectUrl) {
			return NextResponse.redirect(form.redirectUrl, 302);
		}

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
