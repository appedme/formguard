import { NextRequest } from "next/server";
import { stackServerApp } from "@/stack/server";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { updateForm } from "@/db/actions/form.actions";
import { handleError, AppError } from "@/lib/errors";
import { z } from "zod";

const updateFormSchema = z.object({
	name: z.string().min(1).max(100).optional(),
	redirectUrl: z.string().url().or(z.literal("")).optional(),
	errorUrl: z.string().url().or(z.literal("")).optional(),
	emailNotifications: z.boolean().optional(),
	webhookUrl: z.string().url().or(z.literal("")).optional(),
	webhookEnabled: z.boolean().optional(),
	slackWebhookUrl: z.string().url().or(z.literal("")).optional(),
	discordWebhookUrl: z.string().url().or(z.literal("")).optional(),
	autoResponderEnabled: z.boolean().optional(),
	autoResponderSubject: z.string().max(200).optional(),
	autoResponderMessage: z.string().max(2000).optional(),
	allowedOrigins: z.string().optional(),
	turnstileEnabled: z.boolean().optional(),
	isPublic: z.boolean().optional(),
	publicFormDescription: z.string().max(1000).optional(),
	publicFormSuccessMessage: z.string().max(1000).optional(),
	publicFormButtonText: z.string().max(50).optional(),
	publicFormThemeColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
	publicFormStyle: z.string().optional(),
});

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ formId: string }> }
) {
	try {
		const { formId } = await params;
		const stackUser = await stackServerApp.getUser();
		if (!stackUser) {
            throw new AppError("Unauthorized", 401);
		}

		const dbUser = await getUserByStackAuthId(stackUser.id);
		if (!dbUser) {
            throw new AppError("User not found", 404);
		}

		const body = await req.json();
        const validatedData = updateFormSchema.parse(body);

		const success = await updateForm(formId, dbUser.id, validatedData);

		if (!success) {
            throw new AppError("Forbidden or not found", 403);
		}

		return Response.json({ success: true });
	} catch (error) {
		return handleError(error);
	}
}
