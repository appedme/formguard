import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { stripe } from "@/lib/stripe";
import { PLAN_LIMITS, type PlanName } from "@/lib/plans";

const validPlans: PlanName[] = ["pro", "growth"];

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

		const body = (await req.json()) as { plan?: string };
		const { plan } = body;

		if (!plan || !validPlans.includes(plan)) {
			return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
		}

		if (plan === dbUser.plan) {
			return NextResponse.json({ error: "Already on this plan" }, { status: 400 });
		}

		const planConfig = PLAN_LIMITS[plan as PlanName];
		const origin = req.headers.get("origin") || "http://localhost:3000";

		// Create Stripe Checkout Session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: `FormGuard ${planConfig.label} Plan`,
							description: `Upgrade to ${planConfig.label} plan for FormGuard.`,
						},
						unit_amount: planConfig.price * 100, // Amount in cents
					},
					quantity: 1,
				},
			],
			mode: "payment", // Use "subscription" for recurring
			success_url: `${origin}/dashboard/settings?success=true`,
			cancel_url: `${origin}/dashboard/settings?canceled=true`,
			metadata: {
				userId: dbUser.id,
				plan: plan,
			},
			customer_email: dbUser.email,
		});

		return NextResponse.json({ url: session.url });
	} catch (error) {
		console.error("Stripe Checkout Error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
