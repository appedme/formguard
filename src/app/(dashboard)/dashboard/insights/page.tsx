import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getUserForms } from "@/db/actions/form.actions";
import { getFormInsights, getMonthlyInsightCount } from "@/db/actions/insight.actions";
import { InsightsClient } from "@/components/dashboard/insights-client";
import { PLAN_LIMITS } from "@/lib/plans";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Insights",
};

export default async function InsightsPage() {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const userForms = await getUserForms(dbUser.id);
	const monthlyUsed = await getMonthlyInsightCount(dbUser.id);
	const monthlyLimit = PLAN_LIMITS[dbUser.plan].aiInsightsPerMonth;

	// Get insights for all forms
	const formsWithInsights = await Promise.all(
		userForms.map(async (form) => {
			const formInsights = await getFormInsights(form.id);
			return {
				...form,
				insights: JSON.parse(JSON.stringify(formInsights)),
			};
		})
	);

	return (
		<InsightsClient
			forms={formsWithInsights}
			plan={dbUser.plan}
			monthlyUsed={monthlyUsed}
			monthlyLimit={monthlyLimit}
		/>
	);
}
