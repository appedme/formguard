import { db } from "@/db";
import { submissions } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Generate an AI insight from form submissions.
 * 
 * This uses a simple built-in summarizer approach.
 * In production, replace with OpenAI / Anthropic / Gemini API call.
 */
export async function generateInsight(formId: string): Promise<string> {
	// Fetch all non-spam submissions for this form
	const subs = await db
		.select({ payload: submissions.payload, createdAt: submissions.createdAt })
		.from(submissions)
		.where(eq(submissions.formId, formId))
		.limit(500);

	if (subs.length === 0) {
		return "No submissions to analyze yet. Send some test submissions first.";
	}

	// Extract all field values for analysis
	const allFields = new Map<string, string[]>();
	for (const sub of subs) {
		const payload = sub.payload as Record<string, unknown>;
		for (const [key, value] of Object.entries(payload)) {
			if (!allFields.has(key)) allFields.set(key, []);
			allFields.get(key)!.push(String(value));
		}
	}

	// Build a structured summary
	const lines: string[] = [];
	lines.push(`FormGuard AI Insight — ${subs.length} submissions analyzed`);
	lines.push("");

	// Field breakdown
	lines.push("=== Fields Detected ===");
	for (const [field, values] of allFields.entries()) {
		const unique = new Set(values);
		lines.push(`• ${field}: ${values.length} entries, ${unique.size} unique values`);

		// Show most common values (top 3)
		const freq = new Map<string, number>();
		for (const v of values) {
			freq.set(v, (freq.get(v) ?? 0) + 1);
		}
		const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
		if (sorted.length > 0 && unique.size > 1) {
			lines.push(`  Top values: ${sorted.map(([v, c]) => `"${v.slice(0, 50)}" (×${c})`).join(", ")}`);
		}
	}
	lines.push("");

	// Submission volume
	lines.push("=== Volume ===");
	lines.push(`Total submissions: ${subs.length}`);

	// Timeline
	const dates = subs.map((s) => new Date(s.createdAt));
	const earliest = new Date(Math.min(...dates.map((d) => d.getTime())));
	const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
	lines.push(`Date range: ${earliest.toLocaleDateString()} — ${latest.toLocaleDateString()}`);

	const daysDiff = Math.max(1, (latest.getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24));
	lines.push(`Avg rate: ${(subs.length / daysDiff).toFixed(1)} submissions/day`);
	lines.push("");

	// Common themes in text fields
	const textFields = [...allFields.entries()].filter(
		([, values]) => values.some((v) => v.length > 20)
	);

	if (textFields.length > 0) {
		lines.push("=== Content Themes ===");
		for (const [field, values] of textFields) {
			const longValues = values.filter((v) => v.length > 10);
			if (longValues.length === 0) continue;

			// Simple word frequency
			const words = longValues
				.join(" ")
				.toLowerCase()
				.split(/\s+/)
				.filter((w) => w.length > 4)
				.filter((w) => !["about", "their", "would", "could", "should", "there", "where", "which", "these", "those", "other", "after", "before", "between", "under", "above"].includes(w));

			const wordFreq = new Map<string, number>();
			for (const w of words) {
				wordFreq.set(w, (wordFreq.get(w) ?? 0) + 1);
			}

			const topWords = [...wordFreq.entries()]
				.sort((a, b) => b[1] - a[1])
				.slice(0, 5)
				.map(([w, c]) => `${w} (${c})`);

			if (topWords.length > 0) {
				lines.push(`• "${field}" keywords: ${topWords.join(", ")}`);
			}
		}
		lines.push("");
	}

	lines.push("=== Action Items ===");
	lines.push(`• Review ${subs.length} submissions in the dashboard`);
	if (subs.length > 50) {
		lines.push("• Consider enabling webhook automation for high-volume processing");
	}
	if (textFields.length > 0) {
		lines.push("• Analyze text responses for recurring requests or issues");
	}
	lines.push("");
	lines.push(`Generated at ${new Date().toISOString()} · FormGuard Insight Engine`);

	return lines.join("\n");
}
