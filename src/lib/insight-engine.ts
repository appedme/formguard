import { db } from "@/db";
import { submissions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generate an AI insight from form submissions using Google Gemini.
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
		const result = await model.generateContent(prompt);
		const response = await result.response;
		return response.text();
	} catch (error) {
		console.error("Gemini AI Error:", error);
		return "Error generating AI insight. Please ensure your GEMINI_API_KEY is correct.";
	}
}
