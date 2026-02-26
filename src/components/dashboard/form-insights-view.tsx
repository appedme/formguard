"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, BrainCircuit, Inbox, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Insight } from "@/db/schema";

interface FormInsightsViewProps {
	form: {
		id: string;
		submissions: number;
		insights: Insight[];
	};
}

export function FormInsightsView({ form }: FormInsightsViewProps) {
	const router = useRouter();
	const [generating, setGenerating] = useState(false);
	const [deleting, setDeleting] = useState<string | null>(null);

	async function handleGenerate() {
		setGenerating(true);
		try {
			const res = await fetch(`/api/forms/${form.id}/insight`, { method: "POST" });
			if (res.ok) {
				toast.success("AI Insight generated!");
				router.refresh();
			} else {
				const data = await res.json() as { error?: string };
				toast.error(data.error || "Failed to generate");
			}
		} catch {
			toast.error("An error occurred");
		} finally {
			setGenerating(false);
		}
	}

	async function handleDelete(insightId: string) {
		if (!confirm("Delete this insight?")) return;
		setDeleting(insightId);
		try {
			const res = await fetch(`/api/forms/${form.id}/insight`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ insightId }),
			});
			if (res.ok) {
				toast.success("Insight removed");
				router.refresh();
			}
		} finally {
			setDeleting(null);
		}
	}

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/40">
				<div className="flex items-center gap-4">
					<div className="p-3 bg-primary/10 rounded-2xl">
						<BrainCircuit className="w-5 h-5 text-primary" />
					</div>
					<div>
						<h2 className="text-xl font-black tracking-tighter">AI Analysis</h2>
						<p className="text-xs text-muted-foreground font-medium">Get structured summaries and action items from your data.</p>
					</div>
				</div>
				<Button
					size="lg"
					className="h-12 px-6 rounded-xl font-black uppercase tracking-widest gap-2"
					disabled={generating || form.submissions === 0}
					onClick={handleGenerate}
				>
					{generating ? (
						<><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Analyzing...</>
					) : (
						<><Sparkles className="w-4 h-4 mr-1" /> Generate New Insight</>
					)}
				</Button>
			</div>

			{form.insights.length === 0 ? (
				<div className="bg-muted/20 border-2 border-dashed border-border/40 rounded-3xl p-16 text-center">
					<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
						<Inbox className="w-8 h-8 text-muted-foreground/30" />
					</div>
					<h3 className="text-sm font-black uppercase tracking-widest text-foreground">No insights yet</h3>
					<p className="text-xs text-muted-foreground mt-2 max-w-xs mx-auto">
						{form.submissions === 0 
							? "Wait for some submissions before generating AI analysis." 
							: "Click the generate button above to analyze your current submissions."}
					</p>
				</div>
			) : (
				<div className="space-y-6">
					{form.insights.map((insight) => (
						<Card key={insight.id} className="border-border/60 shadow-none rounded-3xl overflow-hidden bg-card/30 group">
							<CardContent className="p-0">
								<div className="bg-muted/40 px-6 py-3 border-b border-border/40 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Clock className="w-3.5 h-3.5 text-muted-foreground" />
										<span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
											Generated {new Date(insight.createdAt).toLocaleString()}
										</span>
									</div>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
										disabled={deleting === insight.id}
										onClick={() => handleDelete(insight.id)}
									>
										{deleting === insight.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
									</Button>
								</div>
								<div className="p-8">
									<div className="text-sm font-medium leading-relaxed text-foreground/90 whitespace-pre-wrap font-mono">
										{insight.summary}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
