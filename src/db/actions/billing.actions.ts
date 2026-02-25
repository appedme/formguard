"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { PlanName } from "@/lib/plans";

export async function upgradePlan(userId: string, plan: PlanName) {
	const [updated] = await db
		.update(users)
		.set({ plan })
		.where(eq(users.id, userId))
		.returning();

	return updated;
}
