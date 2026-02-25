import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getSubmissionStats } from "@/db/actions/analytics.actions";
import { AnalyticsClient } from "@/components/dashboard/analytics-client";
import { PLAN_LIMITS } from "@/lib/plans";

export default async function SubmissionsPage() {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const stats = await getSubmissionStats(dbUser.id);
	const limits = PLAN_LIMITS[dbUser.plan];

	return (
		<AnalyticsClient
			stats={stats}
			plan={dbUser.plan}
			maxSubmissionsPerMonth={limits.maxSubmissionsPerMonth}
		/>
	);
}
