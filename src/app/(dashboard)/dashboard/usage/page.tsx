import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getUserForms } from "@/db/actions/form.actions";
import { getSubmissionStats } from "@/db/actions/analytics.actions";
import { getInsightCount } from "@/db/actions/insight.actions";
import { PLAN_LIMITS } from "@/lib/plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function UsagePage() {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const [userForms, stats, insightCount] = await Promise.all([
		getUserForms(dbUser.id),
		getSubmissionStats(dbUser.id),
		getInsightCount(dbUser.id),
	]);

	const limits = PLAN_LIMITS[dbUser.plan];

	const usageItems = [
		{
			label: "Forms",
			used: userForms.length,
			max: limits.maxForms,
		},
		{
			label: "Submissions (30 days)",
			used: stats.last30Days,
			max: limits.maxSubmissionsPerMonth,
		},
		{
			label: "AI Insights Generated",
			used: insightCount,
			max: limits.aiInsights ? "Unlimited" : "Upgrade required",
		},
	];

	return (
		<div className="p-8 max-w-3xl">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-2xl font-black text-foreground">Usage</h1>
					<p className="text-muted-foreground text-sm mt-1">
						Your current usage against plan limits.
					</p>
				</div>
				<Badge className="font-mono">
					{limits.label} Plan
				</Badge>
			</div>

			<div className="space-y-4">
				{usageItems.map((item) => {
					const max = typeof item.max === "number" ? item.max : null;
					const pct = max && max !== Infinity
						? Math.round((item.used / max) * 100)
						: null;
					const isOverLimit = pct !== null && pct >= 100;

					return (
						<Card key={item.label} className={`border-border ${isOverLimit ? "border-destructive" : ""}`}>
							<CardHeader className="pb-2">
								<div className="flex items-center justify-between">
									<CardTitle className="text-sm">{item.label}</CardTitle>
									<CardDescription className="font-mono text-xs">
										{item.used}
										{max !== null && max !== Infinity && ` / ${max}`}
										{max === Infinity && " / ∞"}
										{typeof item.max === "string" && ` — ${item.max}`}
									</CardDescription>
								</div>
							</CardHeader>
							{pct !== null && (
								<CardContent className="pt-0">
									<div className="w-full bg-muted border border-border h-3">
										<div
											className={`h-full transition-all ${
												pct > 90
													? "bg-destructive"
													: pct > 70
														? "bg-yellow-500"
														: "bg-primary"
											}`}
											style={{ width: `${Math.min(pct, 100)}%` }}
										/>
									</div>
								</CardContent>
							)}
						</Card>
					);
				})}
			</div>
		</div>
	);
}
