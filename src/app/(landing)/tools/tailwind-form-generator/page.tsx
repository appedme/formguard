import { FormGeneratorClient } from "@/components/tools/form-generator-client";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Free Tailwind HTML Form Generator | FormGuard",
	description: "Build beautiful, responsive HTML forms with Tailwind CSS in seconds. Copy and paste perfectly styled forms directly into your Next.js, React, or plain HTML projects.",
	keywords: "tailwind form generator, html form builder, free form builder, tailwind css forms, contact form generator",
};

export default function FormGeneratorPage() {
	return (
		<div className="bg-background min-h-screen flex flex-col">
			{/* Minimal Header */}
			<section className="pt-16 pb-8 border-b border-border/50 shrink-0">
				<div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
					<div>
						<Badge variant="outline" className="mb-4 px-3 py-1 text-[10px] uppercase tracking-widest font-mono text-primary border-primary/20 bg-primary/5">
							Developer Tools
						</Badge>
						<h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground mb-2">
							Tailwind Form Generator
						</h1>
						<p className="text-muted-foreground text-sm max-w-xl">
							Select the fields you need, visually preview the design, and copy the raw HTML/Tailwind code directly into your codebase.
						</p>
					</div>
					<div className="flex items-center gap-3">
						<div className="text-right hidden md:block mr-2">
							<p className="text-sm font-bold text-foreground">Powered by FormGuard</p>
							<p className="text-xs text-muted-foreground">The AI-Native form backend.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Studio Area (Takes remaining height) */}
			<section className="flex-1 bg-muted/20 relative">
				<FormGeneratorClient />
			</section>
		</div>
	);
}
