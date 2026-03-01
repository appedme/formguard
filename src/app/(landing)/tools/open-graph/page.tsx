import { MetaTagClient } from "@/components/tools/meta-tag-client";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Free Open Graph Meta Tag Generator & Preview | FormGuard",
	description: "Generate SEO-optimized Open Graph meta tags and instantly preview how your links will look when shared on Twitter/X, LinkedIn, Facebook, and Slack.",
	keywords: "open graph generator, meta tag generator, seo meta tags, twitter card preview, facebook link preview, linkedin post preview",
};

export default function OpenGraphPage() {
	return (
		<div className="bg-background min-h-screen flex flex-col">
			{/* Minimal Header */}
			<section className="pt-16 pb-8 border-b border-border/50 shrink-0 bg-background">
				<div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
					<div>
						<Badge variant="outline" className="mb-4 px-3 py-1 text-[10px] uppercase tracking-widest font-mono text-primary border-primary/20 bg-primary/5">
							SEO Utilities
						</Badge>
						<h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground mb-2">
							Open Graph Previewer
						</h1>
						<p className="text-muted-foreground text-sm max-w-xl">
							Type your title, description, and image URL to instantly generate and copy the perfect HTML &lt;meta&gt; tags for social sharing.
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
				<MetaTagClient />
			</section>
		</div>
	);
}
