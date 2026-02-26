"use server";

import { db } from "@/db";
import { insights, forms, submissions } from "@/db/schema";
import { eq, desc, and, gte, count } from "drizzle-orm";

export async function createInsight(formId: string, summary: string) {
	const [insight] = await db
		.insert(insights)
		.values({
			formId,
			summary,
		})
		.returning();

	return insight;
}

export async function getFormInsights(formId: string) {
	return db
		.select()
		.from(insights)
		.where(eq(insights.formId, formId))
		.orderBy(desc(insights.createdAt));
}

export async function deleteInsight(insightId: string, userId: string) {
	// Verify ownership: join insight → form → check userId
	const result = await db
		.select({ insightId: insights.id })
		.from(insights)
		.innerJoin(forms, eq(insights.formId, forms.id))
		.where(and(eq(insights.id, insightId), eq(forms.userId, userId)))
		.limit(1);

	if (result.length === 0) {
		throw new Error("Insight not found or unauthorized");
	}

	await db.delete(insights).where(eq(insights.id, insightId));
	return { success: true };
}

export async function getMonthlyInsightCount(userId: string) {
	// Count insights generated this calendar month across all user forms
	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

	const result = await db
		.select({ count: count() })
		.from(insights)
		.innerJoin(forms, eq(insights.formId, forms.id))
		.where(
			and(
				eq(forms.userId, userId),
				gte(insights.createdAt, startOfMonth)
			)
		);

	return result[0]?.count ?? 0;
}

export async function getInsightCount(userId: string) {
	// Count all insights across all forms owned by this user
	const result = await db
		.select({ count: count() })
		.from(insights)
		.innerJoin(forms, eq(insights.formId, forms.id))
		.where(eq(forms.userId, userId));

	return result[0]?.count ?? 0;
}
