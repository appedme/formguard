import { Webhooks } from "@dodopayments/nextjs";
import { upgradePlan } from "@/db/actions/billing.actions";
import type { PlanName } from "@/lib/plans";

export const POST = Webhooks({
	webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET!,
	onPaymentSucceeded: async (payload) => {
		const data = payload.data as any;
		const metadata = data?.metadata;
		const userId = metadata?.userId;
		const plan = metadata?.plan as PlanName;

		if (userId && plan) {
			await upgradePlan(userId, plan);
			console.log(`User ${userId} upgraded to ${plan} via Dodo Payments`);
		}
	},
});

export const runtime = "edge";
