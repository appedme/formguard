import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { Checkout } from "@dodopayments/nextjs";
import type { PlanName } from "@/lib/plans";

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

		if (!plan || !validPlans.includes(plan as PlanName)) {
			return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
		}

		if (plan === dbUser.plan) {
			return NextResponse.json({ error: "Already on this plan" }, { status: 400 });
		}

		const origin = req.headers.get("origin") || "http://localhost:3000";
		const isLive = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode";
		const bearerToken = isLive
			? process.env.DODO_PAYMENTS_API_KEY_LIVE!
			: process.env.DODO_PAYMENTS_API_KEY!;

		// Dodo Payments Checkout Handler (Programmatic POST for sessions)
		const handler = Checkout({
			bearerToken,
			returnUrl: `${origin}/dashboard/settings?success=true`,
			environment: process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode",
			type: "session",
		});

		// We need to call the handler with a mocked request or just use the SDK directly if available.
		// However, based on docs, the Checkout utility returns a Response.
		// Let's create the session payload:
		const payload = {
			product_cart: [
				{
					product_id: plan === "pro" ? "pdt_0NZH8jZJDtXkerKovWdDw" : "pdt_0NZH94BiE9oVPap4qFR15", // Real Dodo Payments IDs
					quantity: 1,
				},
			],
			customer: {
				email: dbUser.email,
				name: dbUser.displayName || "",
			},
			metadata: {
				userId: dbUser.id,
				plan: plan,
			},
		};

		// The @dodopayments/nextjs Checkout utility is meant to be exported as a route handler.
		// To use it programmatically inside an existing POST route, we can do:
		const checkoutRes = await handler(
			new NextRequest(req.url, {
				method: "POST",
				body: JSON.stringify(payload),
				headers: req.headers,
			})
		);

		const checkoutData = (await checkoutRes.json()) as { checkout_url: string };
		return NextResponse.json({ url: checkoutData.checkout_url });
	} catch (error) {
		console.error("Dodo Payments Error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
