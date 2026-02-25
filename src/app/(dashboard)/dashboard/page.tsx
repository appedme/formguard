import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getUserForms } from "@/db/actions/form.actions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, ChevronRight, Inbox, LayoutDashboard, Zap, Share2, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Overview",
};

export default async function DashboardPage() {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const userForms = await getUserForms(dbUser.id);
	const totalSubmissions = userForms.reduce((sum, f) => sum + f.submissions, 0);

	return (
		<div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight text-foreground">Overview</h1>
					<p className="text-muted-foreground text-sm">
						Manage your forms and view recent activity.
					</p>
				</div>
				<Button asChild size="sm" className="rounded-full px-4">
					<Link href="/dashboard/forms/new">
						<Plus className="w-4 h-4 mr-2" />
						New Form
					</Link>
				</Button>
			</div>

			{/* Stats row */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
				{[
					{ label: "Total Forms", value: userForms.length, icon: LayoutDashboard },
					{ label: "Submissions", value: totalSubmissions, icon: Inbox },
					{ label: "Current Plan", value: dbUser.plan.charAt(0).toUpperCase() + dbUser.plan.slice(1), icon: Zap },
					{ label: "Insights Used", value: "0", icon: Zap },
				].map((stat) => (
					<Card key={stat.label} className="bg-card/50 shadow-none border-border/60">
						<CardContent className="p-5">
							<div className="flex items-center justify-between mb-2">
								<p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
									{stat.label}
								</p>
								<stat.icon className="w-3.5 h-3.5 text-muted-foreground/50" />
							</div>
							<p className="text-xl font-semibold text-foreground">{stat.value}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
				{/* Forms Section */}
				<div className="lg:col-span-2 space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-sm font-medium text-foreground">Recent Forms</h2>
						{userForms.length > 0 && (
							<p className="text-xs text-muted-foreground">{userForms.length} total</p>
						)}
					</div>

					{userForms.length === 0 ? (
						<Card className="border-dashed border-2 bg-transparent shadow-none">
							<CardContent className="flex flex-col items-center justify-center py-20 text-center">
								<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
									<Plus className="w-6 h-6 text-muted-foreground" />
								</div>
								<h3 className="text-sm font-medium text-foreground mb-1">No forms yet</h3>
								<p className="text-muted-foreground text-xs mb-6 max-w-[240px]">
									Create your first form to start collecting submissions instantly.
								</p>
								<Button asChild variant="outline" size="sm" className="rounded-full">
									<Link href="/dashboard/forms/new">Create your first form</Link>
								</Button>
							</CardContent>
						</Card>
					) : (
						<div className="grid grid-cols-1 gap-3">
							{userForms.map((form) => (
								<Link
									key={form.id}
									href={`/dashboard/forms/${form.id}`}
									className="group"
								>
									<Card className="bg-card/50 hover:bg-accent/30 transition-all duration-200 border-border/60 shadow-none">
										<CardContent className="flex items-center justify-between p-4 sm:p-5">
											<div className="flex items-center gap-4">
												<div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 text-primary">
													<LayoutDashboard className="w-5 h-5" />
												</div>
												<div>
													<div className="flex items-center gap-2 mb-0.5">
														<h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
															{form.name}
														</h3>
														<Badge variant="outline" className="text-[9px] h-4 px-1.5 font-mono uppercase tracking-tighter bg-background/50">
															{form.endpointId}
														</Badge>
													</div>
													<p className="text-[11px] font-mono text-muted-foreground/70 truncate max-w-[200px] sm:max-w-md">
														/api/submit/{form.endpointId}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-6">
												<div className="text-right hidden sm:block">
													<p className="text-sm font-semibold text-foreground">
														{form.submissions}
													</p>
													<p className="text-[10px] text-muted-foreground uppercase tracking-wider">submissions</p>
												</div>
												<ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
											</div>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					)}
				</div>

				{/* Sidebar/Integrations Preview */}
				<div className="space-y-6">
					<h2 className="text-sm font-medium text-foreground">Upcoming Features</h2>
					<Card className="bg-primary/[0.03] border-primary/10 shadow-none overflow-hidden relative">
						<CardContent className="p-6">
							<Sparkles className="absolute -right-2 -top-2 w-16 h-16 text-primary/5" />
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
									<Share2 className="w-5 h-5 text-primary" />
								</div>
								<div>
									<h3 className="text-sm font-semibold text-foreground">Connected Apps</h3>
									<Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[9px] h-4 px-1.5">COMING SOON</Badge>
								</div>
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed mb-6">
								Automatically sync your form submissions to Notion, Google Sheets, Slack, and 100+ other apps.
							</p>
							<div className="space-y-2">
								<div className="flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border/40 text-[10px] font-medium text-muted-foreground">
									<span>Notion Database</span>
									<span className="text-[9px] opacity-50 uppercase tracking-tighter">In Development</span>
								</div>
								<div className="flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border/40 text-[10px] font-medium text-muted-foreground">
									<span>Google Sheets</span>
									<span className="text-[9px] opacity-50 uppercase tracking-tighter">In Development</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-muted/30 border-border/60 shadow-none">
						<CardContent className="p-6">
							<h3 className="text-sm font-semibold text-foreground mb-2">Need a feature?</h3>
							<p className="text-xs text-muted-foreground leading-relaxed mb-4">
								We building FormGuard for you. Let us know what integrations you need next.
							</p>
							<Button variant="outline" size="sm" className="w-full rounded-full text-xs">
								Request Integration
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
