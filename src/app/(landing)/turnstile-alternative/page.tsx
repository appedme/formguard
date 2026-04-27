import Link from "next/link";
import { ShieldCheck, CheckCircle2, Zap, ArrowRight, Code2, Globe } from "lucide-react";
import Comparison from "@/components/landing/comparison";
import FinalCTA from "@/components/landing/final-cta";
import { stackServerApp } from "@/stack/server";

import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
	title: "The Best Cloudflare Turnstile Alternative",
	description: "Looking for a simpler Turnstile alternative? FormGuard offers invisible spam protection with easier integration and native form handling.",
});

export default async function TurnstileAlternative() {
	const user = await stackServerApp.getUser();

	return (
		<main>
			{/* SEO Hero */}
			<section className="py-32 border-b border-border bg-background overflow-hidden relative">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 blur-[120px] rounded-full opacity-50" />
				</div>
				
				<div className="mx-auto max-w-5xl px-6 text-center">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-8 border border-primary/20 uppercase tracking-widest">
						Simpler. Faster. Better.
					</div>
					<h1 className="text-5xl md:text-7xl font-black text-foreground mb-8 tracking-tight leading-[1.1]">
						The developer-first <br /> <span className="text-primary italic">Turnstile</span> alternative.
					</h1>
					<p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto font-medium">
						Cloudflare Turnstile is good. FormGuard is better. Why? Because we handle the entire form lifecycle—from protection to persistence to notifications.
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link
							href="/handler/sign-up"
							className="inline-flex items-center justify-center h-14 px-10 text-base font-bold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
						>
							Start Protecting Your Forms
							<ArrowRight className="w-4 h-4 ml-2" />
						</Link>
					</div>
				</div>
			</section>

			{/* Comparison Cards */}
			<section className="py-24 border-b border-border bg-card">
				<div className="mx-auto max-w-6xl px-6">
					<h2 className="text-3xl font-black text-foreground mb-16 text-center tracking-tight">Why developers are switching</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="p-10 bg-background border border-border rounded-3xl space-y-6">
							<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
								<Code2 className="w-6 h-6 text-primary" />
							</div>
							<h3 className="text-2xl font-bold">Simpler Integration</h3>
							<p className="text-muted-foreground font-medium leading-relaxed">
								Turnstile still requires client-side widgets and server-side secret verification. With FormGuard, it's a single endpoint. We handle the "heavy lifting" at the edge.
							</p>
						</div>
						<div className="p-10 bg-background border border-border rounded-3xl space-y-6">
							<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
								<Globe className="w-6 h-6 text-primary" />
							</div>
							<h3 className="text-2xl font-bold">Complete Lifecycle</h3>
							<p className="text-muted-foreground font-medium leading-relaxed">
								Turnstile only protects. FormGuard protects, stores, notifies via webhooks, and syncs to your favorite tools like Notion and Google Sheets automatically.
							</p>
						</div>
					</div>
				</div>
			</section>

			<Comparison />
			<FinalCTA user={user} />
		</main>
	);
}
