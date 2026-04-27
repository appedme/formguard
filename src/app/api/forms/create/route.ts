import { NextRequest } from "next/server";
import { stackServerApp } from "@/stack/server";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { FormService } from "@/services/form.service";
import { handleError, AppError } from "@/lib/errors";
import { z } from "zod";

const createFormSchema = z.object({
    name: z.string().min(1, "Form name is required").max(100, "Name is too long"),
});

export async function POST(req: NextRequest) {
	try {
		const stackUser = await stackServerApp.getUser();
		if (!stackUser) {
            throw new AppError("Unauthorized", 401);
		}

		const dbUser = await getUserByStackAuthId(stackUser.id);
		if (!dbUser) {
            throw new AppError("User not found", 404);
		}

        const body = await req.json();
        const { name } = createFormSchema.parse(body);

		const form = await FormService.createFormWithLimitCheck(dbUser.id, name.trim(), dbUser.plan);

		return Response.json({ form }, { status: 201 });
	} catch (error) {
		return handleError(error);
	}
}
