"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { PlanName } from "@/lib/plans";
import { PLAN_LIMITS } from "@/lib/plans";
import type { Insight } from "@/db/schema";
import Link from "next/link";

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
				const data = await res.json();
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
		<div className="p-8 max-w-4xl">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-2xl font-black text-foreground">AI Insights</h1>
					<p className="text-muted-foreground text-sm mt-1">
						Generate structured summaries from your form submissions.
					</p>
				</div>
				<Badge variant="secondary" className="font-mono">
					{totalInsights} insight{totalInsights !== 1 ? "s" : ""} generated
				</Badge>
			</div>

			{!canUseAI && (
				<Card className="border-border mb-8 bg-muted">
					<CardContent className="flex items-center justify-between py-6">
						<div>
							<p className="text-sm font-semibold text-foreground">
								AI Insights require a Pro or Growth plan
							</p>
							<p className="text-xs text-muted-foreground mt-1">
								Upgrade to unlock on-demand AI summaries for all your forms.
							</p>
						</div>
						<Button size="sm" asChild>
							<Link href="/dashboard/settings">Upgrade Plan</Link>
						</Button>
					</CardContent>
				</Card>
			)}

			{error && (
				<Card className="border-destructive bg-destructive/10 mb-6">
					<CardContent className="py-4">
						<p className="text-sm text-destructive">{error}</p>
					</CardContent>
				</Card>
			)}

			{forms.length === 0 ? (
				<Card className="border-border border-dashed">
					<CardContent className="flex flex-col items-center justify-center py-20 text-center">
						<p className="text-3xl mb-3">🤖</p>
						<h3 className="text-base font-bold text-foreground mb-2">No forms yet</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Create a form first, then generate insights from its submissions.
						</p>
						<Button size="sm" asChild>
							<Link href="/dashboard/forms/new">Create Form</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-8">
					{forms.map((form) => (
						<div key={form.id}>
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-3">
									<h2 className="text-lg font-bold text-foreground">{form.name}</h2>
									<Badge variant="secondary" className="font-mono text-xs">
										{form.submissions} submissions
									</Badge>
								</div>
								<Button
									size="sm"
									disabled={!canUseAI || generating === form.id || form.submissions === 0}
									onClick={() => handleGenerate(form.id)}
								>
									{generating === form.id
										? "Generating…"
										: form.submissions === 0
											? "No data yet"
											: "Generate Insight"}
								</Button>
							</div>

							{form.insights.length === 0 ? (
								<Card className="border-border border-dashed">
									<CardContent className="py-8 text-center">
										<p className="text-sm text-muted-foreground">
											No insights generated yet. Click &ldquo;Generate Insight&rdquo; to analyze submissions.
										</p>
									</CardContent>
								</Card>
							) : (
								<div className="space-y-3">
									{form.insights.map((insight) => (
										<Card key={insight.id} className="border-border">
											<CardHeader className="pb-2">
												<div className="flex items-center justify-between">
													<CardDescription className="text-xs font-mono">
														{new Date(insight.createdAt).toLocaleString()}
													</CardDescription>
												</div>
											</CardHeader>
											<CardContent>
												<pre className="bg-muted border border-border p-4 text-xs font-mono text-foreground whitespace-pre-wrap overflow-x-auto leading-relaxed">
													{insight.summary}
												</pre>
											</CardContent>
										</Card>
									))}
								</div>
							)}

							<Separator className="mt-8" />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
