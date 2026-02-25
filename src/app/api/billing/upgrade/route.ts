import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { upgradePlan } from "@/db/actions/billing.actions";
import { PLAN_LIMITS, type PlanName } from "@/lib/plans";

const validPlans: PlanName[] = ["free", "pro", "growth"];

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

		const body = await req.json();
		const { plan } = body;

		if (!plan || !validPlans.includes(plan)) {
			return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
		}

		if (plan === dbUser.plan) {
			return NextResponse.json({ error: "Already on this plan" }, { status: 400 });
		}

		// TODO: In production, integrate Stripe Checkout here:
		// 1. Create a Stripe Checkout session for the target plan
		// 2. Return the session URL for redirect
		// 3. On webhook confirmation, call upgradePlan()
		//
		// For now, we upgrade directly (useful for testing / admin override)

		const updated = await upgradePlan(dbUser.id, plan);

		return NextResponse.json({
			success: true,
			plan: updated.plan,
			limits: PLAN_LIMITS[updated.plan],
		});
	} catch (error) {
		console.error("Billing upgrade error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
