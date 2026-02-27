"use server";

import { db } from "@/db";
import { feedback } from "@/db/schema";

export async function createFeedback(name: string, email: string, message: string) {
	const [newFeedback] = await db
		.insert(feedback)
		.values({
			name,
			email,
			message,
		})
		.returning();

	return newFeedback;
}
