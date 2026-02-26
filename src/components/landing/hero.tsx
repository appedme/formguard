import Link from "next/link";
import { User } from "@stackframe/stack";

interface HeroProps {
	user?: User | null;
}

export default function Hero({ user }: HeroProps) {
	return (
		<section className="py-24 border-b border-border bg-background">
			<div className="mx-auto max-w-6xl px-6">
				{/* Eyebrow */}
				<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
					Edge-Powered · AI-Native · Cloudflare Workers
				</p>

				{/* Headline */}
				<h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-foreground max-w-4xl mb-6">
					Stop building
					<br />
					form backends.
				</h1>

				{/* Sub-headline */}
				<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
					Edge-native form infrastructure built on Cloudflare. FormGuard captures submissions, blocks spam, and turns raw responses into AI insights.
				</p>

				{/* CTAs */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
					{user ? (
						<Link
							href="/dashboard"
							className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
							aria-label="Go to Dashboard"
						>
							Go to Dashboard
						</Link>
					) : (
						<Link
							href="/handler/sign-up"
							data-cta="start-free-hero"
							className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
							aria-label="Start your free trial today"
						>
							Start Free — No Credit Card
						</Link>
					)}
					<Link
						href="#how-it-works"
						className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold border border-border text-foreground hover:bg-accent transition-colors"
						aria-label="Learn how FormGuard works"
					>
						See How It Works →
					</Link>
				</div>

				{/* Micro-trust line */}
				<p className="text-xs font-mono text-muted-foreground mb-10">
					Works with plain HTML forms. No SDK required.
				</p>

				{/* Credibility strip */}
				<div className="pt-8 border-t border-border/50">
					<p className="text-sm text-muted-foreground font-mono">
						Built on Cloudflare’s global edge network.
					</p>
				</div>
			</div>
		</section>
	);
}
