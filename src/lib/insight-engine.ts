import { db } from "@/db";
import { submissions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Generate an AI insight from form submissions using Cloudflare Workers AI.
 * Uses @cf/openai/gpt-oss-20b model via the AI binding.
 */
export async function generateInsight(formId: string): Promise<string> {
	// Fetch submissions for this form
	const subs = await db
		.select({ payload: submissions.payload, createdAt: submissions.createdAt })
		.from(submissions)
		.where(eq(submissions.formId, formId))
		.limit(500);

	if (subs.length === 0) {
		return "No submissions to analyze yet. Send some test submissions first.";
	}

	// Prepare data for AI
	const submissionData = subs.map(s => ({
		payload: s.payload,
		date: s.createdAt.toISOString()
	}));

	const prompt = `You are FormGuard AI, an expert at analyzing form submissions.
Analyze the following ${subs.length} form submissions and provide a structured summary.

Submissions Data:
${JSON.stringify(submissionData)}

Please format your response strictly as follows:
1. FormGuard AI Insight — [count] submissions analyzed
2. === Fields Detected ===
   List each field found and a brief note on its distribution or common values.
3. === Content Themes ===
   Summarize the core messages or themes found in text responses.
4. === Action Items ===
   Provide 2-3 specific recommendations based on the data.

Keep the tone professional, concise, and brutalist (minimalist but high-impact).
Generated at ${new Date().toISOString()} · FormGuard Insight Engine`;

	try {
		const { env } = await getCloudflareContext({ async: true });
		const ai = env.AI;

		const response = await ai.run("@cf/openai/gpt-oss-20b" as any, {
			messages: [
				{ role: "system", content: "You are FormGuard AI, an expert form submission analyst. Be concise and structured." },
				{ role: "user", content: prompt }
			],
			max_tokens: 1024,
		});

		if ("response" in response && typeof response.response === "string") {
			return response.response;
		}

		// Handle streaming or other response shapes
		return String(response) || "No insight generated.";
	} catch (error: any) {
		console.error("Cloudflare Workers AI Error:", error);
		return "Error generating AI insight. Please check your Cloudflare AI binding configuration.";
	}
}
