import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { createForm, getUserForms } from "@/db/actions/form.actions";
import { PLAN_LIMITS } from "@/lib/plans";

export async function POST(req: NextRequest) {
	try {
		const stackUser = await stackServerApp.getUser();
		if (!stackUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const dbUser = await getUserByStackAuthId(stackUser.id);
		if (!dbUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Enforce plan limits
		const existingForms = await getUserForms(dbUser.id);
		const limits = PLAN_LIMITS[dbUser.plan];

		if (existingForms.length >= limits.maxForms) {
			return NextResponse.json(
				{
					error: `Your ${limits.label} plan allows up to ${limits.maxForms} form${limits.maxForms === 1 ? "" : "s"}. Upgrade to create more.`,
				},
				{ status: 403 }
			);
		}

		const body = await req.json();
		const { name } = body;

		if (!name || typeof name !== "string" || name.trim().length === 0) {
			return NextResponse.json({ error: "Form name is required" }, { status: 400 });
		}

		const form = await createForm(dbUser.id, name.trim());

		return NextResponse.json({ form }, { status: 201 });
	} catch (error) {
		console.error("Error creating form:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
