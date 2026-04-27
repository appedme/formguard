"use server";

import { db } from "@/db";
import { forms, submissions } from "@/db/schema";
import { eq, count, desc, inArray, and } from "drizzle-orm";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

/**
 * Fetches paginated submissions for a specific form.
 */
export async function getFormSubmissions(
	formId: string,
	page: number = 1,
	limit: number = 20
) {
    try {
        const offset = (page - 1) * limit;

        const results = await db
            .select({
                submission: submissions,
                formName: forms.name,
                endpointId: forms.endpointId
            })
            .from(submissions)
            .innerJoin(forms, eq(submissions.formId, forms.id))
            .where(eq(submissions.formId, formId))
            .orderBy(desc(submissions.createdAt))
            .limit(limit)
            .offset(offset);

        const [total] = await db
            .select({ count: count() })
            .from(submissions)
            .where(eq(submissions.formId, formId));

        return {
            submissions: results,
            total: total?.count ?? 0,
            page,
            totalPages: Math.ceil((total?.count ?? 0) / limit),
        };
    } catch (error) {
        logger.error("Failed to fetch form submissions", { error, formId });
        throw new AppError("Failed to load submissions", 500);
    }
}

/**
 * Fetches all submissions for a form (e.g., for export).
 */
export async function getAllFormSubmissions(formId: string) {
    try {
        return await db
            .select()
            .from(submissions)
            .where(eq(submissions.formId, formId))
            .orderBy(desc(submissions.createdAt));
    } catch (error) {
        logger.error("Failed to fetch all form submissions", { error, formId });
        throw new AppError("Failed to load submissions", 500);
    }
}

/**
 * Fetches paginated submissions for a user across all their forms.
 */
export async function getUserSubmissions(
	userId: string,
	page: number = 1,
	limit: number = 20
) {
    try {
        const offset = (page - 1) * limit;

        const results = await db
            .select({
                submission: submissions,
                formName: forms.name,
                endpointId: forms.endpointId
            })
            .from(submissions)
            .innerJoin(forms, eq(submissions.formId, forms.id))
            .where(eq(forms.userId, userId))
            .orderBy(desc(submissions.createdAt))
            .limit(limit)
            .offset(offset);

        const [total] = await db
            .select({ count: count() })
            .from(submissions)
            .innerJoin(forms, eq(submissions.formId, forms.id))
            .where(eq(forms.userId, userId));

        return {
            submissions: results,
            total: total?.count ?? 0,
            page,
            totalPages: Math.ceil((total?.count ?? 0) / limit),
        };
    } catch (error) {
        logger.error("Failed to fetch user submissions", { error, userId });
        throw new AppError("Failed to load submissions", 500);
    }
}

/**
 * Deletes multiple submissions after verifying ownership.
 */
export async function deleteSubmissions(submissionIds: string[], userId: string) {
    try {
        if (!submissionIds.length) return { success: false, error: "No submissions selected" };

        // Atomic delete with ownership check via JOIN/subquery if possible, 
        // or a two-step process if driver doesn't support complex deletes.
        // Drizzle delete doesn't support JOIN directly, so we use a subquery/inArray.
        
        const validSubmissions = await db
            .select({ id: submissions.id })
            .from(submissions)
            .innerJoin(forms, eq(submissions.formId, forms.id))
            .where(
                and(
                    inArray(submissions.id, submissionIds),
                    eq(forms.userId, userId)
                )
            );

        const validIds = validSubmissions.map((s) => s.id);

        if (validIds.length === 0) {
            throw new AppError("No valid submissions found to delete", 403);
        }

        await db.delete(submissions).where(inArray(submissions.id, validIds));

        logger.info("Submissions deleted", { userId, count: validIds.length });
        return { success: true, count: validIds.length };
    } catch (error) {
        if (error instanceof AppError) throw error;
        logger.error("Failed to delete submissions", { error, userId });
        throw new AppError("Failed to delete submissions", 500);
    }
}
