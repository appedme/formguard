"use server";

import { db } from "@/db";
import { forms, submissions } from "@/db/schema";
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

	return {
		...form,
		submissions: countResult?.count ?? 0,
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
