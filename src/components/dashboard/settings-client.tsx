"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLAN_LIMITS, type PlanName } from "@/lib/plans";
import { Check, User, Shield, Zap, CreditCard, ChevronRight } from "lucide-react";

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
		<div className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-12">
			<header>
				<h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
				<p className="text-muted-foreground text-sm">
					Manage your account preferences and subscription plans.
				</p>
			</header>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
				{/* Sidebar-like section for info */}
				<div className="lg:col-span-1 space-y-10">
					<section className="space-y-4">
						<div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
							<User className="w-3.5 h-3.5" />
							Profile
						</div>
						<div className="space-y-5 bg-card/50 border border-border/60 rounded-2xl p-6 shadow-none">
							<div className="space-y-1">
								<p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Display Name</p>
								<p className="text-sm font-semibold text-foreground">{user.displayName ?? "Not set"}</p>
							</div>
							<div className="space-y-1">
								<p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Email Address</p>
								<p className="text-sm font-mono text-foreground/80 break-all">{user.email}</p>
							</div>
						</div>
					</section>

					<section className="space-y-4">
						<div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
							<Shield className="w-3.5 h-3.5" />
							Current Plan
						</div>
						<div className="bg-primary/[0.03] border border-primary/10 rounded-2xl p-6 relative overflow-hidden group shadow-none">
							<Zap className="absolute -right-2 -bottom-2 w-16 h-16 text-primary/5 transition-transform group-hover:scale-110" />
							<Badge className="mb-3 font-semibold uppercase tracking-tighter bg-primary/10 text-primary border-primary/10 shadow-none">
								{planLimits.label}
							</Badge>
							<p className="text-2xl font-bold text-foreground">
								{planLimits.price === 0 ? "Free Forever" : `$${planLimits.price}/mo`}
							</p>
							<p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-wider">Active Subscription</p>
						</div>
					</section>
				</div>

				{/* Main Content Area */}
				<div className="lg:col-span-2 space-y-10">
					<section className="space-y-6">
						<div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
							<CreditCard className="w-3.5 h-3.5" />
							Available Plans
						</div>

						<div className="grid grid-cols-1 gap-4">
							{allPlans.map(([name, plan]) => {
								const isCurrent = name === user.plan;
								return (
									<Card 
										key={name}
										className={`shadow-none transition-all duration-300 overflow-hidden ${
											isCurrent 
												? "border-primary/30 bg-primary/[0.02]" 
												: "border-border/60 bg-card/30 hover:border-border/80 hover:bg-card/50"
										}`}
									>
										<CardContent className="p-0">
											<div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
												<div className="space-y-3">
													<div className="flex items-center gap-2">
														<h3 className="text-base font-semibold tracking-tight">{plan.label}</h3>
														{isCurrent && (
															<Badge variant="outline" className="text-[9px] h-4 px-1.5 font-bold uppercase tracking-tighter bg-primary/10 text-primary border-primary/20 shadow-none">
																Current Plan
															</Badge>
														)}
													</div>
													<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
														<div className="flex items-center gap-2">
															<Check className="w-3 h-3 text-primary" />
															<span className="text-[11px] font-medium text-muted-foreground">
																{plan.maxForms === Infinity ? "Unlimited" : plan.maxForms} Forms
															</span>
														</div>
														<div className="flex items-center gap-2">
															<Check className="w-3 h-3 text-primary" />
															<span className="text-[11px] font-medium text-muted-foreground">
																{plan.maxSubmissionsPerMonth === Infinity ? "Unlimited" : plan.maxSubmissionsPerMonth.toLocaleString()} Sub/mo
															</span>
														</div>
														{plan.aiInsights && (
															<div className="flex items-center gap-2">
																<Check className="w-3 h-3 text-primary" />
																<span className="text-[11px] font-medium text-muted-foreground">
																	Advanced AI Insights
																</span>
															</div>
														)}
													</div>
												</div>

												<div className="flex items-center gap-6">
													<div className="text-right hidden sm:block">
														<p className="text-xl font-bold text-foreground">${plan.price}</p>
														<p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">monthly</p>
													</div>
													{!isCurrent ? (
														<Button
															size="sm"
															variant={name === "free" ? "outline" : "default"}
															className="rounded-full px-6 h-9 text-xs font-semibold min-w-[100px]"
															disabled={upgrading === name}
															onClick={() => handleUpgrade(name)}
														>
															{upgrading === name ? "..." : name === "free" ? "Downgrade" : "Upgrade"}
														</Button>
													) : (
														<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
															<Check className="w-5 h-5 text-primary" />
														</div>
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
