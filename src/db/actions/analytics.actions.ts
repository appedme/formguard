"use server";

import { db } from "@/db";
import { forms, submissions } from "@/db/schema";
import { eq, count, desc, sql, and, gte } from "drizzle-orm";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

/**
 * Fetches submission statistics for a user across all their forms.
 * Optimized to use minimal queries.
 */
export async function getSubmissionStats(userId: string) {
    try {
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
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // 1. Aggregated counts in a single pass if possible, or targeted queries
        const [totalResult] = await db
            .select({ count: count() })
            .from(submissions)
            .where(sql`${submissions.formId} IN (${sql.join(formIds.map(id => sql`${id}`), sql`, `)})`);

        const [last7Result] = await db
            .select({ count: count() })
            .from(submissions)
            .where(
                and(
                    sql`${submissions.formId} IN (${sql.join(formIds.map(id => sql`${id}`), sql`, `)})`,
                    gte(submissions.createdAt, sevenDaysAgo)
                )
            );

        const [last30Result] = await db
            .select({ count: count() })
            .from(submissions)
            .where(
                and(
                    sql`${submissions.formId} IN (${sql.join(formIds.map(id => sql`${id}`), sql`, `)})`,
                    gte(submissions.createdAt, thirtyDaysAgo)
                )
            );

        // 2. Optimized daily counts using SQL GROUP BY
        const dailyResults = await db
            .select({
                date: sql<string>`DATE_TRUNC('day', ${submissions.createdAt})::DATE`,
                count: count(),
            })
            .from(submissions)
            .where(
                and(
                    sql`${submissions.formId} IN (${sql.join(formIds.map(id => sql`${id}`), sql`, `)})`,
                    gte(submissions.createdAt, thirtyDaysAgo)
                )
            )
            .groupBy(sql`DATE_TRUNC('day', ${submissions.createdAt})`)
            .orderBy(sql`DATE_TRUNC('day', ${submissions.createdAt})`);

        // 3. Optimized per-form breakdown
        const breakdownResults = await db
            .select({
                formId: submissions.formId,
                count: count(),
            })
            .from(submissions)
            .where(sql`${submissions.formId} IN (${sql.join(formIds.map(id => sql`${id}`), sql`, `)})`)
            .groupBy(submissions.formId);

        const formsBreakdown = userForms.map(f => ({
            formId: f.id,
            formName: f.name,
            count: Number(breakdownResults.find(b => b.formId === f.id)?.count ?? 0),
        })).sort((a, b) => b.count - a.count);

        return {
            totalSubmissions: totalResult?.count ?? 0,
            last7Days: last7Result?.count ?? 0,
            last30Days: last30Result?.count ?? 0,
            formsBreakdown,
            dailyCounts: dailyResults.map(r => ({
                date: String(r.date),
                count: Number(r.count),
            })),
        };
    } catch (error) {
        logger.error("Failed to fetch submission stats", { error, userId });
        throw new AppError("Failed to load statistics", 500);
    }
}

/**
 * Fetches analytics for a specific form.
 */
export async function getFormAnalytics(formId: string) {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const [totalResult] = await db
            .select({ count: count() })
            .from(submissions)
            .where(eq(submissions.formId, formId));

        const [last30Result] = await db
            .select({ count: count() })
            .from(submissions)
            .where(
                and(eq(submissions.formId, formId), gte(submissions.createdAt, thirtyDaysAgo))
            );

        const dailyHistory = await db
            .select({
                date: sql<string>`DATE_TRUNC('day', ${submissions.createdAt})::DATE`,
                count: count(),
            })
            .from(submissions)
            .where(
                and(eq(submissions.formId, formId), gte(submissions.createdAt, thirtyDaysAgo))
            )
            .groupBy(sql`DATE_TRUNC('day', ${submissions.createdAt})`)
            .orderBy(sql`DATE_TRUNC('day', ${submissions.createdAt})`);

        return {
            total: totalResult?.count ?? 0,
            last30Days: last30Result?.count ?? 0,
            dailyHistory: dailyHistory.map(h => ({
                date: new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                count: Number(h.count),
            })),
        };
    } catch (error) {
        logger.error("Failed to fetch form analytics", { error, formId });
        throw new AppError("Failed to load analytics", 500);
    }
}
