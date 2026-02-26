"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PlanName } from "@/lib/plans";
import { PLAN_LIMITS } from "@/lib/plans";
import type { Insight } from "@/db/schema";
import Link from "next/link";
import {
	Sparkles,
	Zap,
	AlertCircle,
	Loader2,
	Inbox,
	BrainCircuit,
	Trash2,
	Clock,
	Gauge,
	ArrowUpRight,
} from "lucide-react";

interface FormWithInsights {
	id: string;
	name: string;
	endpointId: string;
	submissions: number;
	insights: Insight[];
}

interface InsightsClientProps {
	forms: FormWithInsights[];
	plan: PlanName;
	monthlyUsed: number;
	monthlyLimit: number;
}

export function InsightsClient({ forms, plan, monthlyUsed, monthlyLimit }: InsightsClientProps) {
	const router = useRouter();
	const [generating, setGenerating] = useState<string | null>(null);
	const [deleting, setDeleting] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

	const canUseAI = PLAN_LIMITS[plan].aiInsights;
	const isUnlimited = monthlyLimit === Infinity;
	const usagePercent = isUnlimited ? 0 : Math.min((monthlyUsed / monthlyLimit) * 100, 100);
	const isAtLimit = !isUnlimited && monthlyUsed >= monthlyLimit;
	const totalInsights = forms.reduce((sum, f) => sum + f.insights.length, 0);

	async function handleGenerate(formId: string) {
		setGenerating(formId);
		setError(null);
		try {
			const res = await fetch(`/api/forms/${formId}/insight`, {
				method: "POST",
			});
			if (!res.ok) {
				const data = (await res.json()) as { error?: string };
				throw new Error(data.error ?? "Failed to generate insight");
			}
			router.refresh();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setGenerating(null);
		}
	}

	async function handleDelete(insightId: string, formId: string) {
		if (!confirm("Delete this insight? This cannot be undone.")) return;
		setDeleting(insightId);
		setError(null);
		try {
			const res = await fetch(`/api/forms/${formId}/insight`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ insightId }),
			});
			if (!res.ok) {
				const data = (await res.json()) as { error?: string };
				throw new Error(data.error ?? "Failed to delete insight");
			}
			router.refresh();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setDeleting(null);
		}
	}

	return (
		<div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
			{/* Header */}
			<div className="flex flex-col gap-6 mb-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div>
						<h1 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
							<BrainCircuit className="w-6 h-6 text-primary" />
							AI Insights
						</h1>
						<p className="text-muted-foreground text-sm mt-1">
							Powered by Cloudflare Workers AI — instant form analysis.
						</p>
					</div>
					<div className="flex items-center gap-3">
						<Badge variant="outline" className="rounded-full px-3 py-1 font-medium bg-primary/5 text-primary border-primary/10">
							<Sparkles className="w-3 h-3 mr-1.5 fill-primary/20" />
							{totalInsights} Total
						</Badge>
						<Badge variant="outline" className="rounded-full px-3 py-1 font-medium bg-muted/50 text-muted-foreground border-border">
							{PLAN_LIMITS[plan].label}
						</Badge>
					</div>
				</div>

				{/* Usage Meter — only for paid plans */}
				{canUseAI && (
					<Card className="shadow-none border-border/60">
						<CardContent className="py-4 px-5">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-2 text-sm font-medium text-foreground">
									<Gauge className="w-4 h-4 text-muted-foreground" />
									Monthly Usage
								</div>
								<span className="text-xs font-mono text-muted-foreground">
									{isUnlimited ? (
										<>{monthlyUsed} / ∞</>
									) : (
										<>{monthlyUsed} / {monthlyLimit}</>
									)}
								</span>
							</div>
							<div className="w-full h-2 bg-muted rounded-full overflow-hidden">
								<div
									className={`h-full rounded-full transition-all duration-500 ${
										isAtLimit
											? "bg-destructive"
											: usagePercent > 75
												? "bg-amber-500"
												: "bg-primary"
									}`}
									style={{ width: isUnlimited ? "4%" : `${Math.max(usagePercent, 2)}%` }}
								/>
							</div>
							<div className="flex items-center justify-between mt-2">
								<p className="text-[10px] text-muted-foreground flex items-center gap-1">
									<Clock className="w-3 h-3" />
									Resets on the 1st of each month
								</p>
								{isAtLimit && plan === "pro" && (
									<Button variant="link" size="sm" className="h-auto p-0 text-[10px] text-primary" asChild>
										<Link href="/dashboard/settings">
											Upgrade to Growth for unlimited
											<ArrowUpRight className="w-3 h-3 ml-0.5" />
										</Link>
									</Button>
								)}
							</div>
						</CardContent>
					</Card>
				)}
			</div>

			{/* Free Plan Upgrade CTA */}
			{!canUseAI && (
				<Card className="bg-gradient-to-br from-primary/[0.04] to-primary/[0.08] border-primary/10 shadow-none mb-8 overflow-hidden">
					<CardContent className="flex flex-col md:flex-row items-center justify-between py-8 px-6 gap-6">
						<div className="flex items-center gap-5 text-center md:text-left">
							<div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
								<Zap className="w-7 h-7 text-primary" />
							</div>
							<div>
								<p className="text-sm font-semibold text-foreground">
									Unlock AI-Powered Insights
								</p>
								<p className="text-xs text-muted-foreground mt-1 max-w-sm">
									Get structured summaries, detect content themes, and receive action items — all generated automatically from your submissions.
								</p>
								<div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
									<span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Pro: 25/mo</span>
									<span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Growth: Unlimited</span>
								</div>
							</div>
						</div>
						<Button size="sm" asChild className="rounded-full px-6 shrink-0">
							<Link href="/dashboard/settings">Upgrade Now</Link>
						</Button>
					</CardContent>
				</Card>
			)}

			{/* Error */}
			{error && (
				<div className="flex items-center gap-3 p-4 bg-destructive/5 border border-destructive/10 rounded-xl mb-6">
					<AlertCircle className="w-4 h-4 text-destructive shrink-0" />
					<p className="text-xs font-medium text-destructive">{error}</p>
				</div>
			)}

			{/* Empty State */}
			{forms.length === 0 ? (
				<Card className="border-dashed border-2 bg-transparent shadow-none">
					<CardContent className="flex flex-col items-center justify-center py-20 text-center">
						<div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-5">
							<BrainCircuit className="w-7 h-7 text-muted-foreground" />
						</div>
						<h3 className="text-sm font-medium text-foreground mb-1">No forms found</h3>
						<p className="text-muted-foreground text-xs mb-6 max-w-[280px]">
							Create a form and collect submissions to start generating AI insights.
						</p>
						<Button asChild variant="outline" size="sm" className="rounded-full">
							<Link href="/dashboard/forms/new">Create a form</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-10">
					{forms.map((form) => (
						<div key={form.id} className="space-y-4">
							{/* Form Header */}
							<div className="flex items-center justify-between pb-3 border-b border-border/40">
								<div className="flex items-center gap-3 min-w-0">
									<h2 className="text-base font-semibold text-foreground truncate">{form.name}</h2>
									<Badge variant="secondary" className="bg-muted/50 text-[10px] h-5 font-mono px-2 shrink-0">
										{form.submissions} submissions
									</Badge>
								</div>
								<Button
									variant="outline"
									size="sm"
									className="rounded-full h-8 px-4 text-xs font-medium bg-background hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all shrink-0"
									disabled={!canUseAI || generating === form.id || form.submissions === 0 || isAtLimit}
									onClick={() => handleGenerate(form.id)}
								>
									{generating === form.id ? (
										<><Loader2 className="w-3 h-3 mr-2 animate-spin" /> Analyzing…</>
									) : isAtLimit ? (
										<><Gauge className="w-3 h-3 mr-2" /> Limit Reached</>
									) : (
										<><Sparkles className="w-3 h-3 mr-2" /> Generate</>
									)}
								</Button>
							</div>

							{/* Insights List */}
							{form.insights.length === 0 ? (
								<div className="bg-muted/20 border border-dashed border-border/60 rounded-2xl p-10 text-center">
									<Inbox className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
									<p className="text-xs font-medium text-foreground mb-1">No insights yet</p>
									<p className="text-[10px] text-muted-foreground">
										{canUseAI
											? "Click Generate to analyze this form's data."
											: "Upgrade your plan to unlock AI insights."}
									</p>
								</div>
							) : (
								<div className="grid grid-cols-1 gap-3">
									{form.insights.map((insight) => {
										const isExpanded = expandedInsight === insight.id;
										const summaryLines = insight.summary.split("\n");
										const preview = summaryLines.slice(0, 3).join("\n");
										const hasMore = summaryLines.length > 3;

										return (
											<Card
												key={insight.id}
												className="bg-card/50 shadow-none border-border/60 group overflow-hidden hover:border-border transition-colors"
											>
												<CardContent className="p-0">
													{/* Card Header */}
													<div className="bg-muted/30 border-b border-border/40 px-5 py-2.5 flex items-center justify-between">
														<div className="flex items-center gap-3">
															<div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
																<Sparkles className="w-2.5 h-2.5 text-primary" />
															</div>
															<p className="text-[10px] font-medium text-muted-foreground tracking-wide">
																{new Date(insight.createdAt).toLocaleDateString("en-US", {
																	month: "short",
																	day: "numeric",
																	year: "numeric",
																	hour: "2-digit",
																	minute: "2-digit",
																})}
															</p>
														</div>
														<Button
															variant="ghost"
															size="sm"
															className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
															onClick={() => handleDelete(insight.id, form.id)}
															disabled={deleting === insight.id}
															title="Delete insight"
														>
															{deleting === insight.id ? (
																<Loader2 className="w-3 h-3 animate-spin" />
															) : (
																<Trash2 className="w-3 h-3" />
															)}
														</Button>
													</div>

													{/* Card Body */}
													<div className="p-5">
														<div className="text-[11px] font-mono text-foreground leading-relaxed whitespace-pre-wrap">
															{isExpanded || !hasMore ? insight.summary : preview}
														</div>
														{hasMore && (
															<button
																onClick={() => setExpandedInsight(isExpanded ? null : insight.id)}
																className="mt-3 text-[10px] font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
															>
																{isExpanded ? "Show less" : `Show more (${summaryLines.length} lines)`}
															</button>
														)}
													</div>
												</CardContent>
											</Card>
										);
									})}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
