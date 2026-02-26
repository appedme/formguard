import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getSubmissionStats } from "@/db/actions/analytics.actions";
import { getUserSubmissions } from "@/db/actions/submission.actions";
import { AnalyticsClient } from "@/components/dashboard/analytics-client";
import { SubmissionsListClient } from "@/components/dashboard/submissions-list-client";
import { PLAN_LIMITS } from "@/lib/plans";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Submissions",
};

export default async function SubmissionsPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string; tab?: string }>;
}) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const { page: pageParam, tab: tabParam } = await searchParams;
	const page = parseInt(pageParam || "1");
	const activeTab = tabParam || "all";

	const [stats, submissionsData] = await Promise.all([
		getSubmissionStats(dbUser.id),
		getUserSubmissions(dbUser.id, page),
	]);

	const limits = PLAN_LIMITS[dbUser.plan];

	return (
		<div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
			<div>
				<h1 className="text-3xl font-black tracking-tight text-foreground">Submissions</h1>
				<p className="text-muted-foreground text-sm font-medium">
					Manage and analyze all submissions across your forms.
				</p>
			</div>

			<Tabs defaultValue={activeTab} className="w-full">
				<TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50 p-1 rounded-xl">
					<TabsTrigger value="all" className="rounded-lg font-bold text-xs">All Submissions</TabsTrigger>
					<TabsTrigger value="analytics" className="rounded-lg font-bold text-xs">Analytics</TabsTrigger>
				</TabsList>
				
				<TabsContent value="all" className="mt-6">
					<SubmissionsListClient 
						initialData={submissionsData}
						userId={dbUser.id}
					/>
				</TabsContent>

				<TabsContent value="analytics" className="mt-6">
					<AnalyticsClient
						stats={stats}
						plan={dbUser.plan}
						maxSubmissionsPerMonth={limits.maxSubmissionsPerMonth}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
