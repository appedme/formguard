import { Webhooks } from "@dodopayments/nextjs";
import { upgradePlan } from "@/db/actions/billing.actions";
import type { PlanName } from "@/lib/plans";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
	const isLive = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode";
	const webhookKey = 
		(isLive 
			? process.env.DODO_PAYMENTS_WEBHOOK_SECRET_LIVE 
			: process.env.DODO_PAYMENTS_WEBHOOK_SECRET) || "setup_required";

	const handler = Webhooks({
		webhookKey,
		onPaymentSucceeded: async (payload) => {
			// Dodo Payments metadata is available directly on the payload or data object depending on version
			// Based on standard webhook patterns for Dodo, it's often in payload.metadata
			const metadata = (payload as any).metadata || (payload.data as any).metadata;
			const userId = metadata?.userId as string | undefined;
			const plan = metadata?.plan as PlanName | undefined;

			if (userId && plan) {
				await upgradePlan(userId, plan);
				console.log(`User ${userId} upgraded to ${plan} via Dodo Payments`);
			}
		},
	});

	return handler(request);
};
