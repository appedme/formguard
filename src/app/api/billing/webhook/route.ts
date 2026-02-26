import { Webhooks } from "@dodopayments/nextjs";
import { upgradePlan } from "@/db/actions/billing.actions";
import type { PlanName } from "@/lib/plans";

export const POST = Webhooks({
	webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET!,
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
