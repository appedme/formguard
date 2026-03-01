"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

interface MobileNavProps {
	hasUser?: boolean;
}

export function MobileNav({ hasUser }: MobileNavProps) {
	const [open, setOpen] = useState(false);

	const onNavigate = () => setOpen(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" className="px-2 md:hidden" aria-label="Open menu">
					<Menu className="h-6 w-6" />
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="w-[300px] sm:w-[400px]">
				<SheetHeader className="text-left mb-6">
					<SheetTitle>
						<Link href="/" onClick={onNavigate} className="text-lg font-black tracking-tight text-foreground">
							Form<span className="font-normal text-muted-foreground">Guard</span>
						</Link>
					</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col gap-4">
					<Link href="/features" onClick={onNavigate} className="text-base text-foreground font-medium hover:text-primary transition-colors">
						Features
					</Link>
					<Link href="/pricing" onClick={onNavigate} className="text-base text-foreground font-medium hover:text-primary transition-colors">
						Pricing
					</Link>
					<Link href="/blog" onClick={onNavigate} className="text-base text-foreground font-medium hover:text-primary transition-colors">
						Blog
					</Link>
					<Link href="/tools" onClick={onNavigate} className="text-base text-foreground font-medium hover:text-primary transition-colors">
						Tools
					</Link>
					<Link href="/docs" onClick={onNavigate} className="text-base text-foreground font-medium hover:text-primary transition-colors">
						Docs
					</Link>
					<div className="h-px bg-border my-2" />
					{!hasUser ? (
						<div className="flex flex-col gap-3">
							<Link
								href="/handler/sign-in"
								onClick={onNavigate}
								className="text-base text-foreground font-medium hover:text-primary transition-colors"
							>
								Login
							</Link>
							<Link
								href="/handler/sign-up"
								onClick={onNavigate}
								className="inline-flex items-center justify-center h-10 px-4 text-sm font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
							>
								Start Free
							</Link>
						</div>
					) : (
						<Link
							href="/dashboard"
							onClick={onNavigate}
							className="inline-flex items-center justify-center h-10 px-4 text-sm font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
						>
							Dashboard
						</Link>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
