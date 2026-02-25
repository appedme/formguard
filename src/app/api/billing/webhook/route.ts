import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { upgradePlan } from "@/db/actions/billing.actions";
import type { PlanName } from "@/lib/plans";

export async function POST(req: NextRequest) {
	const body = await req.text();
	const signature = req.headers.get("stripe-signature");

	if (!signature) {
		return NextResponse.json({ error: "Missing signature" }, { status: 400 });
	}

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (err) {
		console.error("Webhook signature verification failed:", err);
		return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object as any;
		const userId = session.metadata.userId;
		const plan = session.metadata.plan as PlanName;

		if (userId && plan) {
			await upgradePlan(userId, plan);
			console.log(`User ${userId} upgraded to ${plan}`);
		}
	}

	return NextResponse.json({ received: true });
}

// Next.js dynamic config for webhook
export const runtime = "edge";
