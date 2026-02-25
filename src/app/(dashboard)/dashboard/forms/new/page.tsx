"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Globe, Loader2, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "New Form",
};

export default function NewFormPage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleCreate(e: React.FormEvent) {
		e.preventDefault();
		if (!name.trim()) return;
		setLoading(true);
		setError(null);

		try {
			const res = await fetch("/api/forms/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: name.trim() }),
			});

			if (!res.ok) {
				const data = (await res.json()) as { error?: string };
				throw new Error(data.error ?? "Failed to create form");
			}

			router.push("/dashboard");
			router.refresh();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="p-6 md:p-10 max-w-2xl mx-auto w-full">
			<div className="flex items-center gap-4 mb-10">
				<Button 
					variant="ghost" 
					size="icon" 
					className="rounded-full h-9 w-9 shrink-0"
					onClick={() => router.back()}
				>
					<ChevronLeft className="w-5 h-5" />
				</Button>
				<div>
					<h1 className="text-2xl font-semibold tracking-tight text-foreground">Create New Form</h1>
					<p className="text-muted-foreground text-sm">
						Set up a new endpoint to start collecting submissions.
					</p>
				</div>
			</div>

			<Card className="bg-card/50 shadow-none border-border/60 overflow-hidden">
				<CardContent className="p-8">
					<form onSubmit={handleCreate} className="space-y-8">
						<div className="space-y-2.5">
							<label
								htmlFor="form-name"
								className="text-xs font-semibold text-foreground/70 uppercase tracking-widest ml-1"
							>
								Form Name
							</label>
							<input
								id="form-name"
								type="text"
								placeholder="e.g. Contact Us, Early Access, User Feedback"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								autoFocus
								className="w-full h-12 px-4 rounded-xl border border-border/60 bg-background/50 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
							/>
						</div>

						{name.trim() && (
							<div className="bg-primary/[0.03] border border-primary/10 rounded-2xl p-5 space-y-3">
								<div className="flex items-center gap-2">
									<Globe className="w-3.5 h-3.5 text-primary" />
									<p className="text-[10px] font-bold text-primary uppercase tracking-wider">
										Endpoint Preview
									</p>
								</div>
								<div className="bg-background/80 border border-border/40 rounded-lg px-3 py-2.5">
									<p className="text-[11px] font-mono text-muted-foreground break-all leading-relaxed">
										https://formguard.strivio.world/api/submit/
										<span className="text-foreground font-semibold bg-primary/10 px-1 rounded animate-pulse">
											[unique-id]
										</span>
									</p>
								</div>
								<p className="text-[10px] text-muted-foreground italic">
									* You can change the form name anytime later.
								</p>
							</div>
						)}

						{error && (
							<div className="p-4 bg-destructive/5 border border-destructive/10 rounded-xl">
								<p className="text-xs font-medium text-destructive">{error}</p>
							</div>
						)}

						<div className="flex items-center gap-3 pt-4 border-t border-border/40">
							<Button 
								type="submit" 
								size="lg"
								className="rounded-full px-8 h-11 font-semibold transition-all hover:shadow-lg hover:shadow-primary/20"
								disabled={loading || !name.trim()}
							>
								{loading ? (
									<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating…</>
								) : (
									<><Sparkles className="w-4 h-4 mr-2" /> Create Form</>
								)}
							</Button>
							<Button
								type="button"
								variant="ghost"
								size="lg"
								className="rounded-full px-6 h-11 font-medium text-muted-foreground hover:text-foreground"
								onClick={() => router.back()}
							>
								Cancel
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>

			<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="p-6 bg-muted/20 border border-border/40 rounded-2xl space-y-2">
					<h3 className="text-xs font-semibold text-foreground uppercase tracking-widest">Instant Setup</h3>
					<p className="text-xs text-muted-foreground leading-relaxed">
						Get a unique endpoint URL immediately after creation. No backend code required.
					</p>
				</div>
				<div className="p-6 bg-muted/20 border border-border/40 rounded-2xl space-y-2">
					<h3 className="text-xs font-semibold text-foreground uppercase tracking-widest">Spam Protection</h3>
					<p className="text-xs text-muted-foreground leading-relaxed">
						Every submission is automatically screened for spam using our advanced edge guards.
					</p>
				</div>
			</div>
		</div>
	);
}
