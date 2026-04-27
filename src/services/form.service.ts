import { db } from "@/db";
import { forms, submissions } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { PLAN_LIMITS } from "@/lib/plans";
import { AppError } from "@/lib/errors";
import { createForm, getUserForms } from "@/db/actions/form.actions";

/**
 * Service to handle form-related business logic.
 */
export class FormService {
    /**
     * Creates a form after verifying plan limits.
     */
    static async createFormWithLimitCheck(userId: string, name: string, plan: "free" | "pro" | "growth") {
        const existingForms = await getUserForms(userId);
        const limits = PLAN_LIMITS[plan];

        if (existingForms.length >= limits.maxForms) {
            throw new AppError(
                `Your ${limits.label} plan allows up to ${limits.maxForms} forms. Upgrade to create more.`,
                403,
                "PLAN_LIMIT_EXCEEDED"
            );
        }

        return await createForm(userId, name);
    }

    /**
     * Other business logic for forms can be added here.
     */
}
