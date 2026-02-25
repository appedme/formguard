"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PLAN_LIMITS, type PlanName } from "@/lib/plans";
import { Check, User, Shield, Zap, CreditCard } from "lucide-react";

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
		<div className="p-8 max-w-5xl mx-auto space-y-12">
			<header className="space-y-1">
				<h1 className="text-3xl font-black tracking-tight text-foreground">Settings</h1>
				<p className="text-muted-foreground text-sm font-medium">
					Manage your account preferences and subscription plans.
				</p>
			</header>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
				{/* Sidebar-like section for info */}
				<div className="lg:col-span-1 space-y-8">
					<section className="space-y-4">
						<div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground/80">
							<User className="w-4 h-4" />
							Profile
						</div>
						<div className="space-y-4 bg-card/50 border border-border/50 rounded-xl p-6 backdrop-blur-sm">
							<div>
								<p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Display Name</p>
								<p className="text-sm font-semibold">{user.displayName ?? "Not set"}</p>
							</div>
							<div>
								<p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Email Address</p>
								<p className="text-sm font-mono">{user.email}</p>
							</div>
						</div>
					</section>

					<section className="space-y-4">
						<div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground/80">
							<Shield className="w-4 h-4" />
							Current Plan
						</div>
						<div className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative overflow-hidden group">
							<Zap className="absolute -right-4 -top-4 w-24 h-24 text-primary/5 transition-transform group-hover:scale-110" />
							<Badge className="mb-2 font-mono uppercase tracking-widest">{planLimits.label}</Badge>
							<p className="text-2xl font-black text-foreground mb-1">
								{planLimits.price === 0 ? "Free" : `$${planLimits.price}/mo`}
							</p>
							<p className="text-xs text-muted-foreground font-medium italic">Active since registration</p>
						</div>
					</section>
				</div>

				{/* Main Content Area */}
				<div className="lg:col-span-2 space-y-12">
					<section className="space-y-6">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground/80">
								<CreditCard className="w-4 h-4" />
								Available Plans
							</div>
						</div>

						<div className="grid sm:grid-cols-1 gap-4">
							{allPlans.map(([name, plan]) => {
								const isCurrent = name === user.plan;
								return (
									<div
										key={name}
										className={`relative p-6 rounded-2xl border transition-all duration-300 ${
											isCurrent 
												? "border-primary bg-primary/[0.02] shadow-sm" 
												: "border-border/60 bg-card/30 hover:border-border hover:bg-card/50"
										}`}
									>
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
											<div className="space-y-2">
												<div className="flex items-center gap-2">
													<h3 className="text-lg font-black tracking-tight">{plan.label}</h3>
													{isCurrent && <Badge variant="secondary" className="text-[10px] h-5">Current</Badge>}
												</div>
												<div className="flex flex-wrap gap-x-4 gap-y-1">
													<span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
														<Check className="w-3 h-3 text-primary" />
														{plan.maxForms === Infinity ? "Unlimited" : plan.maxForms} forms
													</span>
													<span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
														<Check className="w-3 h-3 text-primary" />
														{plan.maxSubmissionsPerMonth === Infinity ? "Unlimited" : plan.maxSubmissionsPerMonth.toLocaleString()} sub/mo
													</span>
													{plan.aiInsights && (
														<span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
															<Check className="w-3 h-3 text-primary" />
															AI Insights
														</span>
													)}
												</div>
											</div>

											<div className="flex items-center gap-4">
												<div className="text-right hidden md:block">
													<p className="text-xl font-black">${plan.price}</p>
													<p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Per Month</p>
												</div>
												{!isCurrent && (
													<Button
														size="lg"
														variant={name === "free" ? "outline" : "default"}
														className={`font-bold min-w-[120px] transition-all duration-300 ${name !== "free" ? "shadow-lg shadow-primary/20 hover:scale-[1.02]" : ""}`}
														disabled={upgrading === name}
														onClick={() => handleUpgrade(name)}
													>
														{upgrading === name ? "..." : name === "free" ? "Downgrade" : "Upgrade"}
													</Button>
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
