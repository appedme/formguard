"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
	Terminal, 
	Inbox, 
	Sparkles, 
	BarChart3, 
	Globe, 
	Play, 
	Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormNavProps {
	formId: string;
	isPublic: boolean;
}

export function FormDashboardNav({ formId, isPublic }: FormNavProps) {
	const pathname = usePathname();

	const tabs = [
		{ label: "Integrate", href: `/dashboard/forms/${formId}`, icon: Terminal, exact: true },
		{ label: "Submissions", href: `/dashboard/forms/${formId}/submissions`, icon: Inbox },
		{ label: "Analytics", href: `/dashboard/forms/${formId}/analytics`, icon: BarChart3 },
		{ label: "AI Insights", href: `/dashboard/forms/${formId}/insights`, icon: Sparkles },
		{ label: "Public Page", href: `/dashboard/forms/${formId}/public`, icon: Globe, highlight: isPublic },
		{ label: "Playground", href: `/dashboard/forms/${formId}/playground`, icon: Play },
		{ label: "Settings", href: `/dashboard/forms/${formId}/settings`, icon: Settings },
	];

	return (
		<nav className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide py-3 md:py-4 border-b border-border/40 mb-6 md:mb-8 sticky top-0 bg-background/80 backdrop-blur-md z-10 -mx-6 md:-mx-10 px-6 md:px-10">
			{tabs.map((tab) => {
				const Icon = tab.icon;
				const active = tab.exact 
					? pathname === tab.href 
					: pathname.startsWith(tab.href);
				
				return (
					<Link key={tab.href} href={tab.href}>
						<Button
							variant={active ? "default" : "ghost"}
							size="sm"
							className={`rounded-xl h-9 px-4 text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
								!active && 'text-muted-foreground hover:bg-muted/50'
							} ${tab.highlight && !active ? 'bg-primary/5 text-primary border border-primary/10' : ''}`}
						>
							<Icon className="w-3.5 h-3.5 mr-2" />
							{tab.label}
							{tab.highlight && active && (
								<div className="ml-2 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
							)}
						</Button>
					</Link>
				);
			})}
		</nav>
	);
}
