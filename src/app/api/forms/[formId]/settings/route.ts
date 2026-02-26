import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { updateForm } from "@/db/actions/form.actions";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ formId: string }> }
) {
	try {
		const { formId } = await params;
		const stackUser = await stackServerApp.getUser();
		if (!stackUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const dbUser = await getUserByStackAuthId(stackUser.id);
		if (!dbUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const body = await req.json();
		const success = await updateForm(formId, dbUser.id, body as any);

		if (!success) {
			return NextResponse.json({ error: "Forbidden or not found" }, { status: 403 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Update Form Error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
