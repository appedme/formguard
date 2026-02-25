"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getOrCreateUser(stackAuthUser: {
	id: string;
	primaryEmail: string | null;
	displayName: string | null;
}) {
	// Check if user exists
	const existing = await db
		.select()
		.from(users)
		.where(eq(users.stackAuthId, stackAuthUser.id))
		.limit(1);

	if (existing.length > 0) return existing[0];

	// Create new user
	const [newUser] = await db
		.insert(users)
		.values({
			stackAuthId: stackAuthUser.id,
			email: stackAuthUser.primaryEmail ?? "",
			displayName: stackAuthUser.displayName,
		})
		.returning();

	return newUser;
}

export async function getUserByStackAuthId(stackAuthId: string) {
	const result = await db
		.select()
		.from(users)
		.where(eq(users.stackAuthId, stackAuthId))
		.limit(1);

	return result[0] ?? null;
}
