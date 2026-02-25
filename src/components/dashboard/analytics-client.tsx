"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PlanName } from "@/lib/plans";

interface AnalyticsClientProps {
	stats: {
		totalSubmissions: number;
		last7Days: number;
		last30Days: number;
		formsBreakdown: { formId: string; formName: string; count: number }[];
		dailyCounts: { date: string; count: number }[];
	};
	plan: PlanName;
	maxSubmissionsPerMonth: number;
}

export function AnalyticsClient({ stats, plan, maxSubmissionsPerMonth }: AnalyticsClientProps) {
	const maxDaily = Math.max(...stats.dailyCounts.map((d) => d.count), 1);
	const usagePercent =
		maxSubmissionsPerMonth === Infinity
			? 0
			: Math.round((stats.last30Days / maxSubmissionsPerMonth) * 100);

	return (
		<div className="p-8 max-w-4xl">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-2xl font-black text-foreground">Submissions</h1>
					<p className="text-muted-foreground text-sm mt-1">
						Overview of all incoming form submissions.
					</p>
				</div>
				<Badge variant="secondary" className="font-mono">
					{plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
				</Badge>
			</div>

			{/* Stats cards */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
				{[
					{ label: "Total", value: stats.totalSubmissions },
					{ label: "Last 7 Days", value: stats.last7Days },
					{ label: "Last 30 Days", value: stats.last30Days },
					{
						label: "Usage",
						value:
							maxSubmissionsPerMonth === Infinity
								? "∞"
								: `${usagePercent}%`,
					},
				].map((stat) => (
					<Card key={stat.label} className="border-border">
						<CardHeader className="pb-1">
							<CardDescription className="text-xs font-mono uppercase tracking-wider">
								{stat.label}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-black text-foreground">{stat.value}</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Usage bar (for capped plans) */}
			{maxSubmissionsPerMonth !== Infinity && (
				<Card className="border-border mb-8">
					<CardHeader>
						<CardTitle className="text-base">Monthly Usage</CardTitle>
						<CardDescription>
							{stats.last30Days.toLocaleString()} / {maxSubmissionsPerMonth.toLocaleString()} submissions this month
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="w-full bg-muted border border-border h-6 overflow-hidden">
							<div
								className={`h-full transition-all ${
									usagePercent > 90
										? "bg-destructive"
										: usagePercent > 70
											? "bg-yellow-500"
											: "bg-primary"
								}`}
								style={{ width: `${Math.min(usagePercent, 100)}%` }}
							/>
						</div>
						{usagePercent > 80 && (
							<p className="text-xs text-destructive font-mono mt-2">
								⚠ {usagePercent}% used — consider upgrading your plan
							</p>
						)}
					</CardContent>
				</Card>
			)}

			{/* 14-day bar chart */}
			<Card className="border-border mb-8">
				<CardHeader>
					<CardTitle className="text-base">Last 14 Days</CardTitle>
					<CardDescription>Daily submission volume</CardDescription>
				</CardHeader>
				<CardContent>
					{stats.totalSubmissions === 0 ? (
						<div className="text-center py-12">
							<p className="text-sm text-muted-foreground">No submission data yet.</p>
						</div>
					) : (
						<div className="flex items-end gap-1 h-32">
							{stats.dailyCounts.map((day) => {
								const height = maxDaily > 0 ? (day.count / maxDaily) * 100 : 0;
								return (
									<div key={day.date} className="flex-1 flex flex-col items-center gap-1">
										<span className="text-[10px] font-mono text-muted-foreground">
											{day.count > 0 ? day.count : ""}
										</span>
										<div
											className="w-full bg-primary transition-all rounded-sm min-h-[2px]"
											style={{ height: `${Math.max(height, 2)}%` }}
											title={`${day.date}: ${day.count} submissions`}
										/>
										<span className="text-[10px] font-mono text-muted-foreground">
											{day.date.slice(5)}
										</span>
									</div>
								);
							})}
						</div>
					)}
				</CardContent>
			</Card>

			{/* Per-form breakdown */}
			<Card className="border-border">
				<CardHeader>
					<CardTitle className="text-base">By Form</CardTitle>
					<CardDescription>Submission count per form</CardDescription>
				</CardHeader>
				<CardContent>
					{stats.formsBreakdown.length === 0 ? (
						<p className="text-sm text-muted-foreground py-4 text-center">
							No forms created yet.
						</p>
					) : (
						<div className="space-y-3">
							{stats.formsBreakdown.map((form) => {
								const pct = stats.totalSubmissions > 0
									? Math.round((form.count / stats.totalSubmissions) * 100)
									: 0;
								return (
									<div key={form.formId} className="space-y-1">
										<div className="flex items-center justify-between text-sm">
											<span className="font-medium text-foreground">{form.formName}</span>
											<span className="font-mono text-muted-foreground text-xs">
												{form.count} ({pct}%)
											</span>
										</div>
										<div className="w-full bg-muted border border-border h-2">
											<div
												className="h-full bg-primary"
												style={{ width: `${pct}%` }}
											/>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
