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
	Settings,
	Puzzle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormNavProps {
	formId: string;
	isPublic: boolean;
	submissionCount?: number;
}

	export function FormDashboardNav({ formId, isPublic, submissionCount }: FormNavProps) {
	const pathname = usePathname();

	const tabs = [
		{ label: "Integrate", href: `/dashboard/forms/${formId}`, icon: Terminal, exact: true },
		{ label: "Public Page", href: `/dashboard/forms/${formId}/public`, icon: Globe, highlight: isPublic },
		{ label: "Submissions", href: `/dashboard/forms/${formId}/submissions`, icon: Inbox, badge: submissionCount },
		{ label: "Playground", href: `/dashboard/forms/${formId}/playground`, icon: Play },
		{ label: "Analytics", href: `/dashboard/forms/${formId}/analytics`, icon: BarChart3 },
		{ label: "AI Insights", href: `/dashboard/forms/${formId}/insights`, icon: Sparkles },
		{ label: "Integrations", href: `/dashboard/forms/${formId}/integrations`, icon: Puzzle },
		{ label: "Settings", href: `/dashboard/forms/${formId}/settings`, icon: Settings },
	];

	return (
		<nav className="flex items-center gap-6 overflow-x-auto pb-0 scrollbar-hide border-b border-border mb-6 md:mb-8 sticky top-0 bg-background/80 backdrop-blur-md z-10 -mx-6 md:-mx-10 px-6 md:px-10">
			{tabs.map((tab) => {
				const Icon = tab.icon;
				const active = tab.exact 
					? pathname === tab.href 
					: pathname.startsWith(tab.href);
				
				return (
					<Link 
						key={tab.href} 
						href={tab.href}
						className={`relative flex items-center py-4 text-sm font-medium transition-colors whitespace-nowrap ${
							active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
						}`}
					>
						<Icon className={`w-4 h-4 mr-2 ${active ? 'text-foreground' : 'text-muted-foreground/70'}`} />
						{tab.label}
						{tab.badge !== undefined && tab.badge > 0 && (
							<span className={`ml-2 px-1.5 py-0.5 rounded-md text-[9px] font-mono leading-none ${active ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
								{tab.badge}
							</span>
						)}
						{tab.highlight && active && (
							<div className="ml-2 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
						)}
						{active && (
							<div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary rounded-t-full" />
						)}
					</Link>
				);
			})}
		</nav>
	);
}
