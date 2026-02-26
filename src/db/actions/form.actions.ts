"use server";

import { db } from "@/db";
import { forms, submissions, insights } from "@/db/schema";
import { eq, count, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function createForm(userId: string, name: string) {
	const endpointId = nanoid(12);

	const [form] = await db
		.insert(forms)
		.values({
			userId,
			name,
			endpointId,
		})
		.returning();

	return form;
}

export async function getUserForms(userId: string) {
	const userForms = await db
		.select({
			id: forms.id,
			name: forms.name,
			endpointId: forms.endpointId,
			createdAt: forms.createdAt,
		})
		.from(forms)
		.where(eq(forms.userId, userId))
		.orderBy(desc(forms.createdAt));

	// Get submission counts per form
	const formsWithCounts = await Promise.all(
		userForms.map(async (form) => {
			const [result] = await db
				.select({ count: count() })
				.from(submissions)
				.where(eq(submissions.formId, form.id));

			return {
				...form,
				submissions: result?.count ?? 0,
			};
		})
	);

	return formsWithCounts;
}

import { like, and } from "drizzle-orm";

export async function getPaginatedUserForms(
	userId: string,
	page: number = 1,
	pageSize: number = 10,
	search?: string
) {
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

	const userForms = await db
		.select({
			id: forms.id,
			name: forms.name,
			endpointId: forms.endpointId,
			createdAt: forms.createdAt,
		})
		.from(forms)
		.where(whereClause)
		.limit(pageSize)
		.offset(offset)
		.orderBy(desc(forms.createdAt));

	// Get submission counts per form
	const formsWithCounts = await Promise.all(
		userForms.map(async (form) => {
			const [result] = await db
				.select({ count: count() })
				.from(submissions)
				.where(eq(submissions.formId, form.id));

			return {
				...form,
				submissions: result?.count ?? 0,
			};
		})
	);

	return {
		forms: formsWithCounts,
		total,
		totalPages,
	};
}


export async function getFormById(formId: string, userId: string) {
	const result = await db
		.select()
		.from(forms)
		.where(eq(forms.id, formId))
		.limit(1);

	const form = result[0];
	if (!form || form.userId !== userId) return null;

	// Get submission count
	const [countResult] = await db
		.select({ count: count() })
		.from(submissions)
		.where(eq(submissions.formId, formId));

	// Get insights
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
}

export async function deleteForm(formId: string, userId: string) {
	// Verify ownership first
	const form = await getFormById(formId, userId);
	if (!form) return false;

	await db.delete(forms).where(eq(forms.id, formId));
	return true;
}

export async function updateForm(formId: string, userId: string, data: Partial<typeof forms.$inferInsert>) {
	// Verify ownership first
	const form = await getFormById(formId, userId);
	if (!form) return false;

	await db
		.update(forms)
		.set(data)
		.where(eq(forms.id, formId));
	
	return true;
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
			turnstileEnabled: forms.turnstileEnabled,
		})
		.from(forms)
		.where(eq(forms.endpointId, endpointId))
		.limit(1);

	const form = result[0];
	if (!form || !form.isPublic) return null;

	return form;
}
