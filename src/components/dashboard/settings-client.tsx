"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PLAN_LIMITS, type PlanName } from "@/lib/plans";

interface SettingsClientProps {
	user: {
		id: string;
		email: string;
		displayName: string | null;
		plan: PlanName;
	};
	planLimits: (typeof PLAN_LIMITS)[PlanName];
}

const allPlans = Object.entries(PLAN_LIMITS) as [PlanName, (typeof PLAN_LIMITS)[PlanName]][];

export function SettingsClient({ user, planLimits }: SettingsClientProps) {
	const router = useRouter();
	const [upgrading, setUpgrading] = useState<PlanName | null>(null);

	async function handleUpgrade(plan: PlanName) {
		if (plan === user.plan) return;
		setUpgrading(plan);
		try {
			const res = await fetch("/api/billing/upgrade", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ plan }),
			});
			const data = (await res.json()) as { url?: string };
			if (res.ok && data.url) {
				window.location.href = data.url;
			}
		} catch {
			// handle error
		} finally {
			setUpgrading(null);
		}
	}

	return (
		<div className="p-8 max-w-3xl">
			<h1 className="text-2xl font-black text-foreground mb-2">Settings</h1>
			<p className="text-muted-foreground text-sm mb-8">
				Manage your account and billing.
			</p>

			{/* Account Info */}
			<Card className="border-border mb-8">
				<CardHeader>
					<CardTitle className="text-base">Account</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground">Email</span>
						<span className="text-sm font-mono text-foreground">{user.email}</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground">Name</span>
						<span className="text-sm text-foreground">{user.displayName ?? "—"}</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground">Current Plan</span>
						<Badge className="font-mono">{planLimits.label}</Badge>
					</div>
				</CardContent>
			</Card>

			<Separator className="mb-8" />

			{/* Plan Limits */}
			<Card className="border-border mb-8">
				<CardHeader>
					<CardTitle className="text-base">Your Limits</CardTitle>
					<CardDescription>Based on your {planLimits.label} plan.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Max Forms</span>
						<span className="font-mono text-foreground">
							{planLimits.maxForms === Infinity ? "Unlimited" : planLimits.maxForms}
						</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Submissions / month</span>
						<span className="font-mono text-foreground">
							{planLimits.maxSubmissionsPerMonth === Infinity ? "Unlimited" : planLimits.maxSubmissionsPerMonth.toLocaleString()}
						</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">AI Insights</span>
						<span className={`font-mono ${planLimits.aiInsights ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
							{planLimits.aiInsights ? "Enabled" : "—"}
						</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Webhooks</span>
						<span className={`font-mono ${planLimits.webhooks ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
							{planLimits.webhooks ? "Enabled" : "—"}
						</span>
					</div>
				</CardContent>
			</Card>

			<Separator className="mb-8" />

			{/* Upgrade Plans */}
			<h2 className="text-lg font-black text-foreground mb-4">Plans</h2>
			<div className="grid md:grid-cols-3 gap-4">
				{allPlans.map(([name, plan]) => {
					const isCurrent = name === user.plan;
					return (
						<Card
							key={name}
							className={`border-border ${isCurrent ? "ring-2 ring-primary" : ""}`}
						>
							<CardHeader>
								<CardTitle className="text-base flex items-center justify-between">
									{plan.label}
									{isCurrent && <Badge variant="secondary" className="text-xs">Current</Badge>}
								</CardTitle>
								<CardDescription>
									{plan.price === 0 ? "Free forever" : `$${plan.price}/month`}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="space-y-1.5 text-xs text-muted-foreground mb-4">
									<li>
										{plan.maxForms === Infinity ? "Unlimited" : plan.maxForms} form{plan.maxForms !== 1 ? "s" : ""}
									</li>
									<li>
										{plan.maxSubmissionsPerMonth === Infinity
											? "Unlimited"
											: plan.maxSubmissionsPerMonth.toLocaleString()}{" "}
										submissions/mo
									</li>
									{plan.aiInsights && <li>AI Insights</li>}
									{plan.webhooks && <li>Webhooks</li>}
									{plan.teamWorkspace && <li>Team Workspace</li>}
								</ul>
								{!isCurrent && (
									<Button
										size="sm"
										className="w-full"
										disabled={upgrading === name}
										onClick={() => handleUpgrade(name)}
									>
										{upgrading === name
											? "Upgrading…"
											: name === "free"
												? "Downgrade"
												: "Upgrade"}
									</Button>
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
