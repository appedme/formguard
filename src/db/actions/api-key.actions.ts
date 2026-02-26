"use server";

import { db } from "@/db";
import { apiKeys } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function createApiKey(userId: string, name: string) {
	const key = `fg_${globalThis.crypto.randomUUID().replace(/-/g, "")}`;
	
	const [newKey] = await db
		.insert(apiKeys)
		.values({
			userId,
			name,
			key,
		})
		.returning();
	
	return newKey;
}

export async function getUserApiKeys(userId: string) {
	return await db
		.select()
		.from(apiKeys)
		.where(eq(apiKeys.userId, userId))
		.orderBy(apiKeys.createdAt);
}

export async function deleteApiKey(userId: string, keyId: string) {
	const result = await db
		.delete(apiKeys)
		.where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)))
		.returning();
	
	return result.length > 0;
}

export async function validateApiKey(key: string) {
	const result = await db
		.select()
		.from(apiKeys)
		.where(eq(apiKeys.key, key))
		.limit(1);
	
	if (result.length === 0) return null;
	
	// Update last used
	await db
		.update(apiKeys)
		.set({ lastUsedAt: new Date() })
		.where(eq(apiKeys.id, result[0].id));
	
	return result[0];
}
