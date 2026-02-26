"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/landing/theme-toggle";
import { 
	LayoutDashboard, 
	Inbox, 
	Sparkles, 
	BarChart3, 
	Settings, 
	LogOut,
	ShieldCheck,
	Menu,
	Bot
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const nav = [
	{ label: "Forms", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Submissions", href: "/dashboard/submissions", icon: Inbox },
	{ label: "Insights", href: "/dashboard/insights", icon: Sparkles },
	{ label: "MCP", href: "/dashboard/mcp", icon: Bot },
	{ label: "Usage", href: "/dashboard/usage", icon: BarChart3 },
	{ label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
	user: {
		displayName: string | null;
		primaryEmail: string | null;
		plan: "free" | "pro" | "growth";
	};
}

function SidebarContent({ user, onNavigate }: SidebarProps & { onNavigate?: () => void }) {
	const pathname = usePathname();

	return (
		<div className="flex flex-col h-full">
			{/* Logo */}
			<div className="px-6 h-16 flex items-center shrink-0">
				<Link href="/" className="flex items-center gap-2.5 group" onClick={onNavigate}>
					<div className="bg-foreground p-1 rounded-md transition-transform group-hover:scale-105">
						<ShieldCheck className="w-4 h-4 text-background" />
					</div>
					<span className="text-base font-bold tracking-tight text-foreground">
						FormGuard
					</span>
				</Link>
			</div>

			{/* Nav */}
			<nav className="flex-1 overflow-y-auto py-4 px-3 space-y-8">
				<div className="space-y-1">
					<p className="px-3 mb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
						Overview
					</p>
					{nav.map((item) => {
						const Icon = item.icon;
						const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
						return (
							<Link
								key={item.href}
								href={item.href}
								onClick={onNavigate}
								className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
									active
										? "bg-accent text-accent-foreground font-medium"
										: "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
								}`}
							>
								<div className="flex items-center gap-3">
									<Icon className="w-4 h-4" />
									{item.label}
								</div>
								{active && <div className="w-1 h-1 rounded-full bg-primary" />}
							</Link>
						);
					})}
				</div>

				<div className="space-y-1">
					<p className="px-3 mb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
						Account
					</p>
					<Link
						href="/handler/sign-out"
						className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors group"
					>
						<LogOut className="w-4 h-4" />
						Sign Out
					</Link>
				</div>
			</nav>

			{/* Bottom Section */}
			<div className="p-4 border-t border-border shrink-0">
				<div className="flex items-center gap-3 mb-4 px-2">
					<div className="h-8 w-8 shrink-0 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground border border-border">
						{(user.displayName?.[0] ?? user.primaryEmail?.[0] ?? "?").toUpperCase()}
					</div>
					<div className="min-w-0 flex-1">
						<p className="text-xs font-semibold text-foreground truncate">
							{user.displayName ?? "User"}
						</p>
						<p className="text-[10px] text-muted-foreground truncate">
							{user.primaryEmail}
						</p>
					</div>
					<Badge 
						variant="outline" 
						className={`text-[9px] px-1.5 py-0 h-4 font-mono uppercase tracking-tighter ${
							user.plan === "pro" 
								? "bg-purple-500/10 text-purple-600 border-purple-500/20" 
								: user.plan === "growth" 
								? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
								: "bg-muted text-muted-foreground border-border"
						}`}
					>
						{user.plan}
					</Badge>
				</div>
				<div className="flex items-center justify-between px-2 py-2 bg-muted/40 rounded-lg border border-border/50">
					<span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Theme</span>
					<ThemeToggle />
				</div>
			</div>
		</div>
	);
}

export function DashboardSidebar({ user }: SidebarProps) {
	return (
		<aside className="hidden md:flex w-64 shrink-0 border-r border-border bg-background flex-col h-screen sticky top-0">
			<SidebarContent user={user} />
		</aside>
	);
}

export function MobileSidebar({ user }: SidebarProps) {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden shrink-0">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="p-0 w-72">
				<SheetTitle className="sr-only">FormGuard</SheetTitle>
				<SidebarContent user={user} onNavigate={() => setOpen(false)} />
			</SheetContent>
		</Sheet>
	);
}
