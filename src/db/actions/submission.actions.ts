"use server";

import { db } from "@/db";
import { forms, submissions } from "@/db/schema";
import { eq, count, desc, inArray, and } from "drizzle-orm";

export async function getFormSubmissions(
	formId: string,
	page: number = 1,
	limit: number = 20
) {
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
}

export async function getAllFormSubmissions(formId: string) {
	const results = await db
		.select()
		.from(submissions)
		.where(eq(submissions.formId, formId))
		.orderBy(desc(submissions.createdAt));

	return results;
}

export async function getSubmissionCount(formId: string) {
	const [result] = await db
		.select({ count: count() })
		.from(submissions)
		.where(eq(submissions.formId, formId));

	return result?.count ?? 0;
}

export async function getUserSubmissions(
	userId: string,
	page: number = 1,
	limit: number = 20
) {
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
}

export async function deleteSubmissions(submissionIds: string[], userId: string) {
	if (!submissionIds.length) return { success: false, error: "No submissions selected" };

	// Find the submissions that belong to this user
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
		return { success: false, error: "No valid submissions found to delete" };
	}

	// Delete them
	await db.delete(submissions).where(inArray(submissions.id, validIds));

	return { success: true, count: validIds.length };
}
