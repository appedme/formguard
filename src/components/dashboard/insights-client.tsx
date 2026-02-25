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
	ChevronRight,
	BrainCircuit
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
}

export function InsightsClient({ forms, plan }: InsightsClientProps) {
	const router = useRouter();
	const [generating, setGenerating] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const canUseAI = PLAN_LIMITS[plan].aiInsights;

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

	const totalInsights = forms.reduce((sum, f) => sum + f.insights.length, 0);

	return (
		<div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight text-foreground">AI Insights</h1>
					<p className="text-muted-foreground text-sm">
						Analyze your form submissions using advanced AI models.
					</p>
				</div>
				<Badge variant="outline" className="rounded-full px-3 py-1 font-medium bg-primary/5 text-primary border-primary/10">
					<Sparkles className="w-3 h-3 mr-1.5 fill-primary/20" />
					{totalInsights} Generated
				</Badge>
			</div>

			{!canUseAI && (
				<Card className="bg-primary/[0.03] border-primary/10 shadow-none mb-10 overflow-hidden">
					<CardContent className="flex flex-col md:flex-row items-center justify-between py-6 gap-6">
						<div className="flex items-center gap-4 text-center md:text-left">
							<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
								<Zap className="w-6 h-6 text-primary" />
							</div>
							<div>
								<p className="text-sm font-semibold text-foreground">
									Upgrade to unlock AI Insights
								</p>
								<p className="text-xs text-muted-foreground mt-0.5">
									Get structured summaries and automated analysis for all your forms.
								</p>
							</div>
						</div>
						<Button size="sm" asChild className="rounded-full px-6">
							<Link href="/dashboard/settings">View Pricing</Link>
						</Button>
					</CardContent>
				</Card>
			)}

			{error && (
				<div className="flex items-center gap-3 p-4 bg-destructive/5 border border-destructive/10 rounded-xl mb-8">
					<AlertCircle className="w-4 h-4 text-destructive" />
					<p className="text-xs font-medium text-destructive">{error}</p>
				</div>
			)}

			{forms.length === 0 ? (
				<Card className="border-dashed border-2 bg-transparent shadow-none">
					<CardContent className="flex flex-col items-center justify-center py-20 text-center">
						<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
							<BrainCircuit className="w-6 h-6 text-muted-foreground" />
						</div>
						<h3 className="text-sm font-medium text-foreground mb-1">No forms found</h3>
						<p className="text-muted-foreground text-xs mb-6 max-w-[240px]">
							You need at least one form with submissions to generate insights.
						</p>
						<Button asChild variant="outline" size="sm" className="rounded-full">
							<Link href="/dashboard/forms/new">Create a form</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-12">
					{forms.map((form) => (
						<div key={form.id} className="space-y-6">
							<div className="flex items-center justify-between border-b border-border/40 pb-4">
								<div className="flex items-center gap-4">
									<h2 className="text-base font-semibold text-foreground">{form.name}</h2>
									<Badge variant="secondary" className="bg-muted/50 text-[10px] h-5 font-mono px-2">
										{form.submissions} Submissions
									</Badge>
								</div>
								<Button
									variant="outline"
									size="sm"
									className="rounded-full h-8 px-4 text-xs font-medium bg-background hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all"
									disabled={!canUseAI || generating === form.id || form.submissions === 0}
									onClick={() => handleGenerate(form.id)}
								>
									{generating === form.id ? (
										<><Loader2 className="w-3 h-3 mr-2 animate-spin" /> Analyzing…</>
									) : (
										<><Sparkles className="w-3 h-3 mr-2" /> Generate Summary</>
									)}
								</Button>
							</div>

							{form.insights.length === 0 ? (
								<div className="bg-muted/20 border border-dashed border-border/60 rounded-2xl p-10 text-center">
									<Inbox className="w-10 h-10 text-muted-foreground/20 mx-auto mb-4" />
									<p className="text-xs font-medium text-foreground mb-1">No insights yet</p>
									<p className="text-[10px] text-muted-foreground">Click the button above to analyze this form&apos;s data.</p>
								</div>
							) : (
								<div className="grid grid-cols-1 gap-4">
									{form.insights.map((insight) => (
										<Card key={insight.id} className="bg-card/50 shadow-none border-border/60 group overflow-hidden">
											<CardContent className="p-0">
												<div className="bg-muted/30 border-b border-border/40 px-5 py-3 flex items-center justify-between">
													<p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
														Analysis Report • {new Date(insight.createdAt).toLocaleDateString()}
													</p>
													<ChevronRight className="w-3 h-3 text-muted-foreground/30" />
												</div>
												<div className="p-5">
													<div className="text-[11px] font-mono text-foreground leading-relaxed whitespace-pre-wrap">
														{insight.summary}
													</div>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
