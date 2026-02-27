import { Form } from "@/db/schema";

/**
 * Fires all configured integrations for a form submission.
 * Non-blocking — errors are logged but don't fail the submission.
 */
export async function fireIntegrations(
	form: Form,
	payload: Record<string, unknown>,
	submissionId: string
) {
	const promises: Promise<void>[] = [];

	// ─── Google Sheets (Apps Script Web App URL) ─────────
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

	await Promise.allSettled(promises);
}

// ─── Google Sheets via Apps Script ───────────────────────
async function sendToGoogleSheets(
	scriptUrl: string,
	formName: string,
	payload: Record<string, unknown>
) {
	try {
		await fetch(scriptUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ formName, ...payload }),
		});
	} catch (err) {
		console.error("[INTEGRATION] Google Sheets failed:", err);
	}
}

// ─── Telegram Bot API ───────────────────────────────────
async function sendToTelegram(
	botToken: string,
	chatId: string,
	formName: string,
	payload: Record<string, unknown>
) {
	try {
		const lines = Object.entries(payload)
			.map(([key, value]) => `• <b>${key}</b>: ${String(value)}`)
			.join("\n");

		const text = `📩 <b>New submission: ${formName}</b>\n\n${lines}`;

		await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text,
				parse_mode: "HTML",
			}),
		});
	} catch (err) {
		console.error("[INTEGRATION] Telegram failed:", err);
	}
}

// ─── Notion API ─────────────────────────────────────────
async function sendToNotion(
	notionToken: string,
	databaseId: string,
	formName: string,
	payload: Record<string, unknown>
) {
	try {
		const properties: Record<string, any> = {
			Name: {
				title: [{ text: { content: `${formName} Submission` } }],
			},
		};

		// Map payload fields to Notion rich_text properties
		for (const [key, value] of Object.entries(payload)) {
			if (key === "cf-turnstile-response") continue;
			properties[key] = {
				rich_text: [{ text: { content: String(value).substring(0, 2000) } }],
			};
		}

		await fetch("https://api.notion.com/v1/pages", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${notionToken}`,
				"Content-Type": "application/json",
				"Notion-Version": "2022-06-28",
			},
			body: JSON.stringify({
				parent: { database_id: databaseId },
				properties,
			}),
		});
	} catch (err) {
		console.error("[INTEGRATION] Notion failed:", err);
	}
}
