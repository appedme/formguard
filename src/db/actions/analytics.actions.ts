"use server";

import { db } from "@/db";
import { forms, submissions } from "@/db/schema";
import { eq, count, desc, sql, and, gte } from "drizzle-orm";

export async function getSubmissionStats(userId: string) {
	// Get all forms for user
	const userForms = await db
		.select({ id: forms.id, name: forms.name })
		.from(forms)
		.where(eq(forms.userId, userId));

	if (userForms.length === 0) {
		return {
			totalSubmissions: 0,
			last7Days: 0,
			last30Days: 0,
			formsBreakdown: [],
			dailyCounts: [],
		};
	}

	const formIds = userForms.map((f) => f.id);

	// Total submissions across all forms
	const [totalResult] = await db
		.select({ count: count() })
		.from(submissions)
		.where(sql`${submissions.formId} IN (${sql.join(formIds.map(id => sql`${id}`), sql`, `)})`);

	// Last 7 days
	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

	const [last7Result] = await db
		.select({ count: count() })
		.from(submissions)
		.where(
			and(
				sql`${submissions.formId} IN (${sql.join(formIds.map(id => sql`${id}`), sql`, `)})`,
				gte(submissions.createdAt, sevenDaysAgo)
			)
		);

	// Last 30 days
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	const [last30Result] = await db
		.select({ count: count() })
		.from(submissions)
		.where(
			and(
				sql`${submissions.formId} IN (${sql.join(formIds.map(id => sql`${id}`), sql`, `)})`,
				gte(submissions.createdAt, thirtyDaysAgo)
			)
		);

	// Per-form breakdown
	const formsBreakdown = await Promise.all(
		userForms.map(async (form) => {
			const [result] = await db
				.select({ count: count() })
				.from(submissions)
				.where(eq(submissions.formId, form.id));

			return {
				formId: form.id,
				formName: form.name,
				count: result?.count ?? 0,
			};
		})
	);

	// Daily counts for last 14 days
	const fourteenDaysAgo = new Date();
	fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

	const dailyCounts: { date: string; count: number }[] = [];
	for (let i = 13; i >= 0; i--) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		const dayEnd = new Date(dayStart);
		dayEnd.setDate(dayEnd.getDate() + 1);

		const [result] = await db
			.select({ count: count() })
			.from(submissions)
			.where(
				and(
					sql`${submissions.formId} IN (${sql.join(formIds.map(id => sql`${id}`), sql`, `)})`,
					gte(submissions.createdAt, dayStart),
					sql`${submissions.createdAt} < ${dayEnd}`
				)
			);

		dailyCounts.push({
			date: dayStart.toISOString().split("T")[0],
			count: result?.count ?? 0,
		});
	}

	return {
		totalSubmissions: totalResult?.count ?? 0,
		last7Days: last7Result?.count ?? 0,
		last30Days: last30Result?.count ?? 0,
		formsBreakdown: formsBreakdown.sort((a, b) => b.count - a.count),
		dailyCounts,
	};
}

export async function getFormAnalytics(formId: string) {
	// 1. Total Submissions
	const [totalResult] = await db
		.select({ count: count() })
		.from(submissions)
		.where(eq(submissions.formId, formId));

	// 2. Last 30 Days Count
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
	
	const [last30Result] = await db
		.select({ count: count() })
		.from(submissions)
		.where(
			and(
				eq(submissions.formId, formId),
				gte(submissions.createdAt, thirtyDaysAgo)
			)
		);

	// 3. Daily History (Last 30 Days)
	const dailyHistory: { date: string; count: number }[] = [];
	for (let i = 29; i >= 0; i--) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		const dayEnd = new Date(dayStart);
		dayEnd.setDate(dayEnd.getDate() + 1);

		const [result] = await db
			.select({ count: count() })
			.from(submissions)
			.where(
				and(
					eq(submissions.formId, formId),
					gte(submissions.createdAt, dayStart), // Fixed: Use gte/lt properly
					sql`${submissions.createdAt} < ${dayEnd}`
				)
			);

		dailyHistory.push({
			date: dayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
			count: result?.count ?? 0,
		});
	}

	return {
		total: totalResult?.count ?? 0,
		last30Days: last30Result?.count ?? 0,
		dailyHistory,
	};
}
