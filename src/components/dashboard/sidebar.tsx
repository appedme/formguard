"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/landing/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { 
	LayoutDashboard, 
	Inbox, 
	Sparkles, 
	BarChart3, 
	Settings, 
	LogOut,
	ShieldCheck
} from "lucide-react";

const nav = [
	{ label: "Forms", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Submissions", href: "/dashboard/submissions", icon: Inbox },
	{ label: "Insights", href: "/dashboard/insights", icon: Sparkles },
	{ label: "Usage", href: "/dashboard/usage", icon: BarChart3 },
	{ label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
	user: {
		displayName: string | null;
		primaryEmail: string | null;
	};
}

export function DashboardSidebar({ user }: SidebarProps) {
	const pathname = usePathname();

	return (
		<aside className="w-64 shrink-0 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col h-screen sticky top-0 transition-all duration-300">
			{/* Logo */}
			<div className="px-6 py-6 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2 group">
					<div className="bg-primary p-1.5 rounded-lg transition-transform group-hover:scale-105">
						<ShieldCheck className="w-5 h-5 text-primary-foreground" />
					</div>
					<span className="text-lg font-black tracking-tight text-foreground">
						Form<span className="text-muted-foreground font-medium">Guard</span>
					</span>
				</Link>
			</div>

			<Separator className="mx-6 w-auto opacity-50" />

			{/* Nav */}
			<nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
				<div className="space-y-1">
					<p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
						Main Menu
					</p>
					{nav.map((item) => {
						const Icon = item.icon;
						const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
									active
										? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
										: "text-muted-foreground hover:bg-accent hover:text-foreground"
								}`}
							>
								<Icon className={`w-4 h-4 ${active ? "animate-in fade-in zoom-in duration-300" : ""}`} />
								{item.label}
							</Link>
						);
					})}
				</div>

				<div className="space-y-1 pt-4">
					<p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
						Account
					</p>
					<Link
						href="/handler/sign-out"
						className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors group"
					>
						<LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
						Sign Out
					</Link>
				</div>
			</nav>

			{/* User info & Theme Toggle */}
			<div className="p-4 border-t border-border bg-muted/30">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-3 overflow-hidden">
						<div className="h-9 w-9 shrink-0 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-sm font-bold">
							{(user.displayName?.[0] ?? user.primaryEmail?.[0] ?? "?").toUpperCase()}
						</div>
						<div className="overflow-hidden">
							<p className="text-sm font-bold text-foreground truncate">
								{user.displayName ?? "User"}
							</p>
							<p className="text-[10px] text-muted-foreground truncate font-mono uppercase tracking-tighter">
								{user.primaryEmail}
							</p>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between gap-2 bg-background/50 rounded-lg p-1.5 border border-border/50">
					<span className="text-[10px] font-bold px-2 text-muted-foreground uppercase">Appearance</span>
					<ThemeToggle />
				</div>
			</div>
		</aside>
	);
}
