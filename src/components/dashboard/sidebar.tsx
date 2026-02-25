"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/landing/theme-toggle";
import { Separator } from "@/components/ui/separator";

const nav = [
	{ label: "Forms", href: "/dashboard", icon: "📋" },
	{ label: "Submissions", href: "/dashboard/submissions", icon: "📥" },
	{ label: "Insights", href: "/dashboard/insights", icon: "🤖" },
	{ label: "Usage", href: "/dashboard/usage", icon: "📊" },
	{ label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
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
		<aside className="w-60 shrink-0 border-r border-border bg-card flex flex-col h-screen sticky top-0">
			{/* Logo */}
			<div className="px-6 py-5 border-b border-border flex items-center justify-between">
				<Link href="/" className="text-base font-black text-foreground">
					Form<span className="font-normal text-muted-foreground">Guard</span>
				</Link>
				<ThemeToggle />
			</div>

			{/* Nav */}
			<nav className="flex-1 overflow-y-auto py-4">
				<div className="px-3 space-y-1">
					{nav.map((item) => {
						const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
									active
										? "bg-accent text-foreground"
										: "text-muted-foreground hover:bg-accent hover:text-foreground"
								}`}
							>
								<span>{item.icon}</span>
								{item.label}
							</Link>
						);
					})}
				</div>

				<Separator className="my-4 mx-3 w-auto" />

				<div className="px-3">
					<Link
						href="/handler/sign-out"
						className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
					>
						<span>↩</span>
						Sign Out
					</Link>
				</div>
			</nav>

			{/* User info */}
			<div className="px-4 py-4 border-t border-border">
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
						{(user.displayName?.[0] ?? user.primaryEmail?.[0] ?? "?").toUpperCase()}
					</div>
					<div className="overflow-hidden">
						<p className="text-xs font-semibold text-foreground truncate">
							{user.displayName ?? "User"}
						</p>
						<p className="text-xs text-muted-foreground truncate">
							{user.primaryEmail}
						</p>
					</div>
				</div>
			</div>
		</aside>
	);
}
