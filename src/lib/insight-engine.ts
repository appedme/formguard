import { db } from "@/db";
import { submissions } from "@/db/schema";
import { eq } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI({
	baseURL: "https://openrouter.ai/api/v1",
	apiKey: process.env.OPENROUTER_API_KEY,
	defaultHeaders: {
		"HTTP-Referer": "https://formguard.strivio.world", // Optional, for including your app on openrouter.ai rankings.
		"X-Title": "FormGuard", // Optional. Shows in rankings on openrouter.ai.
	}
});

/**
 * Generate an AI insight from form submissions using OpenRouter.
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

	// Prepare data for Gemini
	const submissionData = subs.map(s => ({
		payload: s.payload,
		date: s.createdAt.toISOString()
	}));

	const prompt = `
		You are FormGuard AI, an expert at analyzing form submissions.
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
		Generated at ${new Date().toISOString()} · FormGuard Insight Engine
	`;

	try {
		const completion = await openai.chat.completions.create({
			model: "google/gemini-2.5-flash-free", // Using a free model on OpenRouter
			messages: [
				{
					role: "user",
					content: prompt
				}
			],
		});
		
		return completion.choices[0]?.message?.content || "No insight generated.";
	} catch (error: any) {
		console.error("OpenRouter AI Error:", error);
		if (error?.status === 429) {
			return "Rate limit exceeded. Please try again later.";
		}
		return "Error generating AI insight. Please ensure your OPENROUTER_API_KEY is correct.";
	}
}
