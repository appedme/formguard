import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles, Terminal, Share2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Free Developer Tools | FormGuard",
	description: "A collection of free developer utilities to streamline your workflow. AI Prompt Generators, Form Testers, and more.",
	keywords: [
		"developer tools",
		"AI prompt generator",
		"form tester",
		"schema generator",
		"free utilities",
		"FormGuard",
		"JSON schema",
		"CURL tester",
	],
	openGraph: {
		title: "Free Developer Tools | FormGuard",
		description: "A collection of free developer utilities to streamline your workflow. AI Prompt Generators, Form Testers, and more.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Free Developer Tools | FormGuard",
		description: "A collection of free developer utilities to streamline your workflow. AI Prompt Generators, Form Testers, and more.",
	},
};

const tools = [
	{
		title: "AI Prompt Generator",
		description: "Convert any text into shareable, pre-filled links for ChatGPT, Claude, Gemini, and more.",
		href: "/tools/prompt-generator",
		icon: Sparkles,
		badge: "Popular",
		color: "text-blue-500",
		bgColor: "bg-blue-500/5",
	},
	{
		title: "Tailwind Form Generator",
		description: "Build beautiful, responsive HTML forms with Tailwind CSS. Copy perfectly styled code directly into your project.",
		href: "/tools/tailwind-form-generator",
		icon: Terminal,
		badge: "New",
		color: "text-purple-500",
		bgColor: "bg-purple-500/5",
	},
	{
		title: "Open Graph Previewer",
		description: "Generate SEO-optimized Open Graph meta tags and instantly preview how your links will look on social media.",
		href: "/tools/open-graph",
		icon: Share2,
		badge: "New",
		color: "text-green-500",
		bgColor: "bg-green-500/5",
	},
];

export default function ToolsPage() {
	return (
		<div className="bg-background min-h-screen">
			{/* Hero Section */}
			<section className="py-24 border-b border-border">
				<div className="mx-auto max-w-6xl px-6">
					<div className="max-w-3xl">
						<Badge variant="outline" className="mb-6 px-3 py-1 text-[10px] uppercase tracking-widest font-mono text-primary border-primary/20 bg-primary/5">
							Free Utilities
						</Badge>
						<h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6 leading-[1.1]">
							Free tools for
							<br />
							<span className="text-muted-foreground">modern builders.</span>
						</h1>
						<p className="text-lg text-muted-foreground leading-relaxed">
							Handy developer tools we built for ourselves, now free for everyone. No sign-up required, ever.
						</p>
					</div>
				</div>
			</section>

			{/* Tools Grid */}
			<section className="py-20">
				<div className="mx-auto max-w-6xl px-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{tools.map((tool) => (
							<Link key={tool.title} href={tool.href} className="group h-full">
								<Card className="h-full border-border/40 bg-card/50 hover:bg-accent/30 transition-all duration-300 shadow-none hover:shadow-xl hover:shadow-primary/5 rounded-2xl overflow-hidden flex flex-col">
									<CardContent className="p-8 flex-1 flex flex-col">
										<div className={`w-12 h-12 rounded-xl ${tool.bgColor} flex items-center justify-center mb-6 border border-border/10 group-hover:scale-110 transition-transform duration-300`}>
											<tool.icon className={`w-6 h-6 ${tool.color}`} />
										</div>
										<div className="flex items-center gap-3 mb-3">
											<h2 className="text-xl font-bold text-foreground">{tool.title}</h2>
											{tool.badge && (
												<Badge variant="secondary" className="text-[9px] h-4 px-1.5 uppercase tracking-tighter bg-muted/50 font-mono">
													{tool.badge}
												</Badge>
											)}
										</div>
										<p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
											{tool.description}
										</p>
										<div className="flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
											Try it now <ArrowRight className="w-3.5 h-3.5 ml-2" />
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 border-t border-border/50">
				<div className="mx-auto max-w-6xl px-6 text-center">
					<div className="bg-primary/5 rounded-3xl p-12 border border-primary/10">
						<h2 className="text-2xl font-bold text-foreground mb-4">Want to build something bigger?</h2>
						<p className="text-muted-foreground mb-8 max-w-md mx-auto">
							FormGuard is the engine behind these tools. Capture submissions, block spam, and get insights on your own terms.
						</p>
						<div className="flex items-center justify-center gap-4">
							<Link href="/handler/sign-up" className="inline-flex items-center justify-center h-11 px-8 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-full">
								Get Started for Free
							</Link>
							<Link href="/" className="inline-flex items-center justify-center h-11 px-8 text-sm font-bold border border-border text-foreground hover:bg-accent transition-all rounded-full">
								Learn More
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
