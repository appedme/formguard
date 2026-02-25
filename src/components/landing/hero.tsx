import Link from "next/link";

export default function Hero() {
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
					<br />
					<span className="text-muted-foreground">Just drop an endpoint</span>
					<br />
					and ship.
				</h1>

				{/* Sub-headline */}
				<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
					FormGuard captures submissions, blocks spam, and turns raw responses
					into AI insights — powered by Cloudflare edge infrastructure. Zero
					backend setup.
				</p>

				{/* CTAs */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
					<Link
						href="/handler/sign-up"
						data-cta="start-free-hero"
						className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
					>
						Start Free — No Credit Card
					</Link>
					<Link
						href="#how-it-works"
						className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold border border-border text-foreground hover:bg-accent transition-colors"
					>
						See How It Works →
					</Link>
				</div>

				{/* Deploy line */}
				<p className="text-sm text-muted-foreground font-mono mb-8">
					⚡ Deploy in under 2 minutes.
				</p>

				{/* Trust line */}
				<p className="text-sm text-muted-foreground">
					Built for indie makers, YC founders, and fast-moving teams.
				</p>
			</div>
		</section>
	);
}
