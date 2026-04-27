"use server";

import { db } from "@/db";
import { forms, submissions, insights } from "@/db/schema";
import { eq, count, desc, sql, and, like } from "drizzle-orm";
import { nanoid } from "nanoid";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

/**
 * Creates a new form for a user.
 */
export async function createForm(userId: string, name: string) {
    try {
        const endpointId = nanoid(12);
        const [form] = await db
            .insert(forms)
            .values({
                userId,
                name,
                endpointId,
            })
            .returning();

        logger.info("Form created", { userId, formId: form.id });
        return form;
    } catch (error) {
        logger.error("Failed to create form", { error, userId });
        throw new AppError("Failed to create form", 500);
    }
}

/**
 * Creates a new form from a template.
 */
export async function createFormFromTemplate(
	userId: string,
	templateId: string
) {
    try {
        const { formTemplates } = await import("@/lib/templates");
        const template = formTemplates.find((t) => t.id === templateId);
        if (!template) throw new AppError("Template not found", 404);

        const endpointId = nanoid(12);

        const [form] = await db
            .insert(forms)
            .values({
                userId,
                name: template.name,
                endpointId,
                isPublic: true,
                publicFormDescription: template.description,
                publicFormFields: template.fields,
                publicFormSuccessMessage: template.successMessage,
                publicFormButtonText: template.buttonText,
            })
            .returning();

        logger.info("Form created from template", { userId, formId: form.id, templateId });
        return form;
    } catch (error) {
        if (error instanceof AppError) throw error;
        logger.error("Failed to create form from template", { error, userId, templateId });
        throw new AppError("Failed to create form from template", 500);
    }
}

/**
 * Fetches all forms for a user with submission counts.
 * Optimized with a single JOIN and GROUP BY to avoid N+1 queries.
 */
export async function getUserForms(userId: string) {
    try {
        const results = await db
            .select({
                id: forms.id,
                name: forms.name,
                endpointId: forms.endpointId,
                createdAt: forms.createdAt,
                submissionCount: count(submissions.id),
            })
            .from(forms)
            .leftJoin(submissions, eq(forms.id, submissions.formId))
            .where(eq(forms.userId, userId))
            .groupBy(forms.id)
            .orderBy(desc(forms.createdAt));

        return results.map(r => ({
            ...r,
            submissions: Number(r.submissionCount),
        }));
    } catch (error) {
        logger.error("Failed to fetch user forms", { error, userId });
        throw new AppError("Failed to fetch forms", 500);
    }
}

/**
 * Paginated version of getUserForms with search capability.
 */
export async function getPaginatedUserForms(
	userId: string,
	page: number = 1,
	pageSize: number = 10,
	search?: string
) {
    try {
        const offset = (page - 1) * pageSize;
        const whereClause = search 
            ? and(eq(forms.userId, userId), like(forms.name, `%${search}%`))
            : eq(forms.userId, userId);

        // Get total count
        const [countResult] = await db
            .select({ count: count() })
            .from(forms)
            .where(whereClause);

        const total = countResult?.count ?? 0;
        const totalPages = Math.ceil(total / pageSize);

        const results = await db
            .select({
                id: forms.id,
                name: forms.name,
                endpointId: forms.endpointId,
                createdAt: forms.createdAt,
                submissionCount: count(submissions.id),
            })
            .from(forms)
            .leftJoin(submissions, eq(forms.id, submissions.formId))
            .where(whereClause)
            .groupBy(forms.id)
            .limit(pageSize)
            .offset(offset)
            .orderBy(desc(forms.createdAt));

        return {
            forms: results.map(r => ({ ...r, submissions: Number(r.submissionCount) })),
            total,
            totalPages,
        };
    } catch (error) {
        logger.error("Failed to fetch paginated forms", { error, userId });
        throw new AppError("Failed to fetch forms", 500);
    }
}

/**
 * Fetches a single form by ID, ensuring user ownership.
 */
export async function getFormById(formId: string, userId: string) {
    try {
        const [form] = await db
            .select()
            .from(forms)
            .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
            .limit(1);

        if (!form) return null;

        const [countResult] = await db
            .select({ count: count() })
            .from(submissions)
            .where(eq(submissions.formId, formId));

        const formInsights = await db
            .select()
            .from(insights)
            .where(eq(insights.formId, formId))
            .orderBy(desc(insights.createdAt));

        return {
            ...form,
            submissions: countResult?.count ?? 0,
            insights: formInsights,
        };
    } catch (error) {
        logger.error("Failed to fetch form", { error, formId, userId });
        throw new AppError("Failed to fetch form", 500);
    }
}

/**
 * Deletes a form, ensuring user ownership in the delete query.
 */
export async function deleteForm(formId: string, userId: string) {
    try {
        const result = await db
            .delete(forms)
            .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
            .returning();
        
        const success = result.length > 0;
        if (success) logger.info("Form deleted", { formId, userId });
        return success;
    } catch (error) {
        logger.error("Failed to delete form", { error, formId, userId });
        throw new AppError("Failed to delete form", 500);
    }
}

/**
 * Updates a form, ensuring user ownership in the update query.
 */
export async function updateForm(formId: string, userId: string, data: any) {
    try {
        const result = await db
            .update(forms)
            .set(data)
            .where(and(eq(forms.id, formId), eq(forms.userId, userId)))
            .returning();

        const success = result.length > 0;
        if (success) logger.info("Form updated", { formId, userId });
        return success;
    } catch (error) {
        logger.error("Failed to update form", { error, formId, userId });
        throw new AppError("Failed to update form", 500);
    }
}

export async function getFormByEndpointIdPublic(endpointId: string) {
	const result = await db
		.select({
			id: forms.id,
			name: forms.name,
			endpointId: forms.endpointId,
			isPublic: forms.isPublic,
			publicFormDescription: forms.publicFormDescription,
			publicFormFields: forms.publicFormFields,
			publicFormSuccessMessage: forms.publicFormSuccessMessage,
			publicFormButtonText: forms.publicFormButtonText,
			publicFormHeaderImage: forms.publicFormHeaderImage,
			publicFormThemeColor: forms.publicFormThemeColor,
			publicFormStyle: forms.publicFormStyle,
			turnstileEnabled: forms.turnstileEnabled,
		})
		.from(forms)
		.where(eq(forms.endpointId, endpointId))
		.limit(1);

	const form = result[0];
	if (!form || !form.isPublic) return null;

	return form;
}
