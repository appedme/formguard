import { Form } from "@/db/schema";
import { logger } from "@/lib/logger";

/**
 * Fallback logic for Edge runtime (no Resend SDK required to prevent CJS imports crashing)
 */
export async function sendResendEmail(payload: { from: string; to: string; subject: string; html?: string; text?: string }) {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey || apiKey === "re_fallback_key") {
		logger.warn("[EMAIL] Resend API key missing, skipping email.");
		return;
	}
	
	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});
	
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Resend API Error ${res.status}: ${text}`);
	}
}

/**
 * Fires all configured integrations for a form submission.
 * Non-blocking — errors are logged but don't fail the submission.
 */
export async function fireIntegrations(
	form: Form,
	payload: Record<string, unknown>,
	submissionId: string,
    userEmail?: string | null
) {
	const promises: Promise<any>[] = [];

	// ─── Webhooks ────────────────────────────────────────
	if (form.webhookEnabled && form.webhookUrl) {
		promises.push(
            fetch(form.webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    formId: form.id,
                    submissionId,
                    payload,
                    timestamp: new Date().toISOString(),
                }),
            }).catch(err => logger.error("Webhook failed", { err, formId: form.id }))
		);
	}

    // ─── Slack ───────────────────────────────────────────
    if (form.webhookEnabled && form.slackWebhookUrl) {
        promises.push(
            fetch(form.slackWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: `*New Submission for ${form.name}*\n\n` + 
                          Object.entries(payload)
                            .map(([key, value]) => `*${key}:* ${value}`)
                            .join("\n")
                }),
            }).catch(err => logger.error("Slack Webhook failed", { err, formId: form.id }))
        );
    }

	// ─── Google Sheets ───────────────────────────────────
	if (form.googleSheetsUrl) {
		promises.push(
			sendToGoogleSheets(form.googleSheetsUrl, form.name, payload)
		);
	}

	// ─── Telegram Bot ────────────────────────────────────
	if (form.telegramBotToken && form.telegramChatId) {
		promises.push(
			sendToTelegram(form.telegramBotToken, form.telegramChatId, form.name, payload)
		);
	}

	// ─── Notion ──────────────────────────────────────────
	if (form.notionToken && form.notionDatabaseId) {
		promises.push(
			sendToNotion(form.notionToken, form.notionDatabaseId, form.name, payload)
		);
	}

    // ─── Email Notifications ─────────────────────────────
    if (form.emailNotifications && userEmail) {
        promises.push(
            sendResendEmail({
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
            }).catch(err => logger.error("Email notification failed", { err, formId: form.id }))
        );
    }

	await Promise.allSettled(promises);
    logger.info("All integrations processed", { formId: form.id, submissionId });
}

async function sendToGoogleSheets(scriptUrl: string, formName: string, payload: Record<string, unknown>) {
	try {
		await fetch(scriptUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ formName, ...payload }),
		});
	} catch (err) {
		logger.error("Google Sheets integration failed", { err, formName });
	}
}

async function sendToTelegram(botToken: string, chatId: string, formName: string, payload: Record<string, unknown>) {
	try {
		const lines = Object.entries(payload)
			.map(([key, value]) => `• <b>${key}</b>: ${String(value)}`)
			.join("\n");
		const text = `📩 <b>New submission: ${formName}</b>\n\n${lines}`;
		await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
		});
	} catch (err) {
		logger.error("Telegram integration failed", { err, formName });
	}
}

async function sendToNotion(notionToken: string, databaseId: string, formName: string, payload: Record<string, unknown>) {
	try {
		const properties: Record<string, any> = {
			Name: { title: [{ text: { content: `${formName} Submission` } }] },
		};
		for (const [key, value] of Object.entries(payload)) {
			if (key === "cf-turnstile-response") continue;
			properties[key] = { rich_text: [{ text: { content: String(value).substring(0, 2000) } }] };
		}
		await fetch("https://api.notion.com/v1/pages", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${notionToken}`,
				"Content-Type": "application/json",
				"Notion-Version": "2022-06-28",
			},
			body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
		});
	} catch (err) {
		logger.error("Notion integration failed", { err, formName });
	}
}
