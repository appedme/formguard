import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { deleteForm } from "@/db/actions/form.actions";

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ formId: string }> }
) {
	try {
		const stackUser = await stackServerApp.getUser();
		if (!stackUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const dbUser = await getUserByStackAuthId(stackUser.id);
		if (!dbUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const { formId } = await params;
		const deleted = await deleteForm(formId, dbUser.id);

		if (!deleted) {
			return NextResponse.json({ error: "Form not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Delete form error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
