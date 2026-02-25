"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
	BarChart3, 
	Inbox, 
	TrendingUp, 
	Zap, 
	AlertCircle,
	Calendar
} from "lucide-react";
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
		<div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight text-foreground">Analytics</h1>
					<p className="text-muted-foreground text-sm">
						Detailed overview of your form performance and usage.
					</p>
				</div>
				<Badge variant="outline" className="rounded-full px-3 py-1 font-medium bg-primary/5 text-primary border-primary/10">
					<Zap className="w-3 h-3 mr-1.5 fill-primary" />
					{plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
				</Badge>
			</div>

			{/* Stats cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
				{[
					{ label: "Total Submissions", value: stats.totalSubmissions, icon: Inbox },
					{ label: "Last 7 Days", value: stats.last7Days, icon: Calendar },
					{ label: "Last 30 Days", value: stats.last30Days, icon: TrendingUp },
					{
						label: "Monthly Usage",
						value:
							maxSubmissionsPerMonth === Infinity
								? "Unlimited"
								: `${usagePercent}%`,
						icon: BarChart3
					},
				].map((stat) => (
					<Card key={stat.label} className="bg-card/50 shadow-none border-border/60">
						<CardContent className="p-5">
							<div className="flex items-center justify-between mb-2">
								<p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
									{stat.label}
								</p>
								<stat.icon className="w-3.5 h-3.5 text-muted-foreground/40" />
							</div>
							<p className="text-xl font-semibold text-foreground">{stat.value}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
				{/* Chart Section */}
				<Card className="lg:col-span-2 bg-card/50 shadow-none border-border/60">
					<CardContent className="p-6">
						<div className="flex items-center justify-between mb-8">
							<h3 className="text-sm font-semibold text-foreground">Activity (Last 14 Days)</h3>
						</div>
						
						{stats.totalSubmissions === 0 ? (
							<div className="flex flex-col items-center justify-center py-20 text-center">
								<BarChart3 className="w-10 h-10 text-muted-foreground/20 mb-3" />
								<p className="text-xs text-muted-foreground">No submission data recorded yet.</p>
							</div>
						) : (
							<div className="flex items-end justify-between gap-2 h-48 px-2">
								{stats.dailyCounts.map((day) => {
									const height = maxDaily > 0 ? (day.count / maxDaily) * 100 : 0;
									return (
										<div key={day.date} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
											<div className="relative w-full flex flex-col items-center justify-end h-[calc(100%-24px)]">
												<div
													className="w-full max-w-[32px] bg-primary/20 group-hover:bg-primary/40 transition-all rounded-t-sm min-h-[4px]"
													style={{ height: `${Math.max(height, 2)}%` }}
												/>
												{day.count > 0 && (
													<div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] font-bold py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
														{day.count}
													</div>
												)}
											</div>
											<span className="text-[9px] font-medium text-muted-foreground uppercase tracking-tighter">
												{day.date.slice(8)}/{day.date.slice(5, 7)}
											</span>
										</div>
									);
								})}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Usage Section */}
				<div className="space-y-6">
					{maxSubmissionsPerMonth !== Infinity && (
						<Card className="bg-card/50 shadow-none border-border/60 overflow-hidden">
							<CardContent className="p-6">
								<h3 className="text-sm font-semibold text-foreground mb-4">Plan Usage</h3>
								<div className="space-y-4">
									<div className="flex items-end justify-between">
										<p className="text-2xl font-bold text-foreground">
											{usagePercent}%
										</p>
										<p className="text-[10px] text-muted-foreground font-medium mb-1 uppercase tracking-wider">
											{stats.last30Days.toLocaleString()} / {maxSubmissionsPerMonth.toLocaleString()}
										</p>
									</div>
									<div className="w-full bg-muted/50 rounded-full h-1.5 overflow-hidden">
										<div
											className={`h-full transition-all duration-1000 ${
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
										<div className="flex items-center gap-2 p-3 bg-destructive/5 rounded-lg border border-destructive/10">
											<AlertCircle className="w-3.5 h-3.5 text-destructive" />
											<p className="text-[10px] text-destructive font-medium">
												Approaching plan limit. Upgrade to avoid service interruption.
											</p>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					)}

					<Card className="bg-card/50 shadow-none border-border/60">
						<CardContent className="p-6">
							<h3 className="text-sm font-semibold text-foreground mb-6">By Form</h3>
							{stats.formsBreakdown.length === 0 ? (
								<p className="text-xs text-muted-foreground py-4 text-center italic">
									No forms found.
								</p>
							) : (
								<div className="space-y-5">
									{stats.formsBreakdown.map((form) => {
										const pct = stats.totalSubmissions > 0
											? Math.round((form.count / stats.totalSubmissions) * 100)
											: 0;
										return (
											<div key={form.formId} className="space-y-2">
												<div className="flex items-center justify-between">
													<span className="text-xs font-medium text-foreground truncate max-w-[120px]">{form.formName}</span>
													<span className="text-[10px] font-mono text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
														{form.count} ({pct}%)
													</span>
												</div>
												<div className="w-full bg-muted/50 rounded-full h-1 overflow-hidden">
													<div
														className="h-full bg-primary/60 transition-all duration-1000"
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
			</div>
		</div>
	);
}
