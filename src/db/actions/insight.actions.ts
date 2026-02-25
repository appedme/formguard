"use server";

import { db } from "@/db";
import { insights, submissions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

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

export async function getInsightCount(userId: string) {
	// Count all insights across all forms owned by this user
	// We do a join through forms
	const result = await db.execute(
		`SELECT COUNT(i.id) as count FROM insights i
		 JOIN forms f ON i.form_id = f.id
		 WHERE f.user_id = '${userId}'`
	);

	return Number((result as unknown as Array<{ count: string }>)[0]?.count ?? 0);
}
