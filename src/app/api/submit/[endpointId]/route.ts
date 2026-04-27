import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { forms, submissions, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { fireIntegrations, sendResendEmail } from "@/services/integrations.service";
import { logger } from "@/lib/logger";
import { z } from "zod";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
};

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ endpointId: string }> }
) {
	const startTime = Date.now();
	try {
		const { endpointId } = await params;

		// 1. Find the form and user
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
			logger.warn("Form not found", { endpointId });
			return NextResponse.json({ error: "Form not found" }, { status: 404, headers: corsHeaders });
		}

		const { form, userEmail } = result[0];

		// 2. CORS / Allowed Origins Check
		let origin = req.headers.get("origin") || req.headers.get("referer");
		if (origin === "null") origin = null;

		if (form.allowedOrigins && !form.allowedOrigins.includes("*")) {
			const allowedOrigins = form.allowedOrigins.split(",").map(o => o.trim());
			if (!origin) {
				return NextResponse.json({ error: "Origin missing" }, { status: 403, headers: corsHeaders });
			}
			try {
				const originUrl = new URL(origin);
				const isAllowed = allowedOrigins.some(allowed => originUrl.hostname === allowed || originUrl.origin === allowed);
				if (!isAllowed) {
					logger.warn("CORS block", { origin, endpointId });
					return NextResponse.json({ error: "Origin not allowed" }, { status: 403, headers: corsHeaders });
				}
			} catch (e) {
				return NextResponse.json({ error: "Invalid origin" }, { status: 400, headers: corsHeaders });
			}
		}

		// 3. Parse and Validate Payload
		let payload: Record<string, unknown>;
		const contentType = req.headers.get("content-type") ?? "";

		try {
			if (contentType.includes("application/json")) {
				payload = await req.json();
			} else if (contentType.includes("form-data") || contentType.includes("x-www-form-urlencoded")) {
				const formData = await req.formData();
				payload = Object.fromEntries(formData.entries());
			} else {
				payload = await req.json();
			}
		} catch (err) {
			return NextResponse.json({ error: "Invalid payload" }, { status: 400, headers: corsHeaders });
		}

		// 4. Rate Limiting (Heuristic for now, should use KV/Redis for prod)
		const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("cf-connecting-ip") ?? "unknown";

		// 5. Spam Protection
		let isSpam = false;
		if (form.turnstileEnabled) {
			const token = payload["cf-turnstile-response"] as string | undefined;
			if (token) {
				const verification = await verifyTurnstileToken(token);
				if (!verification.success) {
					logger.info("Spam blocked (Turnstile)", { endpointId, ip });
					isSpam = true;
				}
			} else {
				logger.debug("Turnstile token missing on protected form", { endpointId, ip });
			}
		}

		// 6. Persistence
		const [submission] = await db
			.insert(submissions)
			.values({
				formId: form.id,
				payload,
				ipAddress: ip,
				isSpam,
			})
			.returning({ id: submissions.id, createdAt: submissions.createdAt });

		// 7. Background Processing (integrations, emails, notifications)
		// We use waitUntil if available (Cloudflare) or just don't await to keep response fast
        // Since we are in a Next.js route on Edge, we can fire and forget or use a queue.
        // For now, we fire integrations without awaiting the final results to minimize TTFB.
		fireIntegrations(form, payload, submission.id, userEmail);

        // --- Handle Auto-Responder (also semi-async) ---
		if (form.autoResponderEnabled && !isSpam) {
			const submitterEmail = (payload.email || payload.Email || payload.EMAIL) as string;
			if (submitterEmail?.includes('@')) {
				sendResendEmail({
					from: process.env.RESEND_FROM_EMAIL || "FormGuard <notifications@formguard.dev>",
					to: submitterEmail,
					subject: form.autoResponderSubject || `Thank you for contacting ${form.name}`,
					text: form.autoResponderMessage || "We have received your submission.",
				}).catch(err => logger.error("Auto-responder failed", { err, submissionId: submission.id }));
			}
		}

		// 8. Revalidation
		revalidatePath("/dashboard", "page");

		logger.info("Submission processed", { 
            endpointId, 
            submissionId: submission.id, 
            duration: Date.now() - startTime,
            isSpam 
        });

		// 9. Response / Redirect
		if (form.redirectUrl) {
			const accept = req.headers.get("accept") || "";
			if (accept.includes("application/json")) {
				return NextResponse.json({ success: true, redirectUrl: form.redirectUrl }, { status: 200, headers: corsHeaders });
			}
			return NextResponse.redirect(new URL(form.redirectUrl), 302);
		}

		return NextResponse.json({ success: true, id: submission.id, timestamp: submission.createdAt }, { status: 201, headers: corsHeaders });

	} catch (error) {
		logger.error("Internal submission error", { error });
		return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders });
	}
}

export async function OPTIONS() {
	return new NextResponse(null, { status: 204, headers: corsHeaders });
}
