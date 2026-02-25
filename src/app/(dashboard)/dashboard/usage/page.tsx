import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getUserForms } from "@/db/actions/form.actions";
import { getSubmissionStats } from "@/db/actions/analytics.actions";
import { getInsightCount } from "@/db/actions/insight.actions";
import { PLAN_LIMITS } from "@/lib/plans";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Zap, ShieldCheck, PieChart, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Usage & Limits",
};

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
			label: "Active Forms",
			used: userForms.length,
			max: limits.maxForms,
			icon: Layers,
			description: "Total number of form endpoints created."
		},
		{
			label: "Monthly Submissions",
			used: stats.last30Days,
			max: limits.maxSubmissionsPerMonth,
			icon: PieChart,
			description: "Total submissions received in the last 30 days."
		},
		{
			label: "AI Insights",
			used: insightCount,
			max: limits.aiInsights ? Infinity : "N/A",
			icon: Zap,
			description: "Number of automated form analyses performed."
		},
	];

	return (
		<div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight text-foreground">Usage & Limits</h1>
					<p className="text-muted-foreground text-sm">
						Monitor your current resource consumption and plan boundaries.
					</p>
				</div>
				<Badge variant="outline" className="rounded-full px-3 py-1 font-medium bg-primary/5 text-primary border-primary/10">
					<ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
					{limits.label} Plan
				</Badge>
			</div>

			<div className="grid grid-cols-1 gap-6">
				{usageItems.map((item) => {
					const max = typeof item.max === "number" ? item.max : null;
					const pct = max && max !== Infinity
						? Math.round((item.used / max) * 100)
						: null;
					const isOverLimit = pct !== null && pct >= 100;
					const Icon = item.icon;

					return (
						<Card key={item.label} className={`shadow-none transition-all duration-300 ${isOverLimit ? "border-destructive/40 bg-destructive/[0.02]" : "border-border/60 bg-card/50"}`}>
							<CardContent className="p-6">
								<div className="flex items-start justify-between mb-6">
									<div className="flex items-center gap-4">
										<div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isOverLimit ? "bg-destructive/10 text-destructive" : "bg-primary/5 text-primary"}`}>
											<Icon className="w-5 h-5" />
										</div>
										<div>
											<h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
											<p className="text-[11px] text-muted-foreground">{item.description}</p>
										</div>
									</div>
									<div className="text-right">
										<p className="text-lg font-bold text-foreground">
											{item.used}
											<span className="text-muted-foreground font-normal text-xs ml-1">
												{max !== null && max !== Infinity && `/ ${max}`}
												{max === Infinity && "/ ∞"}
												{typeof item.max === "string" && `(${item.max})`}
											</span>
										</p>
										{pct !== null && (
											<p className={`text-[10px] font-bold uppercase tracking-wider ${pct > 90 ? "text-destructive" : "text-muted-foreground"}`}>
												{pct}% Consumed
											</p>
										)}
									</div>
								</div>

								{pct !== null && (
									<div className="space-y-2">
										<div className="w-full bg-muted/50 rounded-full h-1.5 overflow-hidden">
											<div
												className={`h-full transition-all duration-1000 ${
													pct > 90
														? "bg-destructive"
														: pct > 70
															? "bg-yellow-500"
															: "bg-primary"
												}`}
												style={{ width: `${Math.min(pct, 100)}%` }}
											/>
										</div>
										{isOverLimit && (
											<p className="text-[10px] text-destructive font-medium flex items-center gap-1.5">
												<BarChart3 className="w-3 h-3" />
												Resource limit reached. Upgrade to increase capacity.
											</p>
										)}
									</div>
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
