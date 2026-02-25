"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewFormPage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleCreate(e: React.FormEvent) {
		e.preventDefault();
		if (!name.trim()) return;
		setLoading(true);
		// TODO Phase 3: call server action to create form in DB
		// For now, simulate and redirect
		await new Promise((r) => setTimeout(r, 500));
		setLoading(false);
		router.push("/dashboard");
	}

	return (
		<div className="p-8 max-w-xl">
			<div className="mb-8">
				<h1 className="text-2xl font-black text-foreground">Create a Form</h1>
				<p className="text-muted-foreground text-sm mt-1">
					You&apos;ll get a unique edge endpoint instantly.
				</p>
			</div>

			<Card className="border-border">
				<CardHeader>
					<CardTitle className="text-base">Form Details</CardTitle>
					<CardDescription>Give your form a clear name.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleCreate} className="space-y-6">
						<div>
							<label
								htmlFor="form-name"
								className="block text-sm font-semibold text-foreground mb-2"
							>
								Form Name
							</label>
							<input
								id="form-name"
								type="text"
								placeholder="e.g. Contact Form, Feedback, Waitlist"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="w-full h-10 px-3 border border-border bg-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-ring transition-colors"
							/>
						</div>

						{name.trim() && (
							<div className="bg-muted border border-border p-4">
								<p className="text-xs font-mono text-muted-foreground mb-1">
									Your endpoint will be:
								</p>
								<p className="text-xs font-mono text-foreground break-all">
									https://api.formguard.strivio.world/api/submit/
									<span className="text-green-600 dark:text-green-400">
										[generated-id]
									</span>
								</p>
							</div>
						)}

						<div className="flex gap-3">
							<Button type="submit" disabled={loading || !name.trim()}>
								{loading ? "Creating…" : "Create Form"}
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={() => router.back()}
							>
								Cancel
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
