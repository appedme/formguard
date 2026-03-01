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
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
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

				{/* Product Hunt Badge */}
				<div className="mb-10 flex">
					<a href="https://www.producthunt.com/products/formguard?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-formguard" target="_blank" rel="noopener noreferrer" className="dark:hidden block transition-transform hover:scale-105">
						<img alt="FormGuard - AI Form Backend for Builders | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1086617&amp;theme=light&amp;t=1772347025205" />
					</a>
					<a href="https://www.producthunt.com/products/formguard?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-formguard" target="_blank" rel="noopener noreferrer" className="hidden dark:block transition-transform hover:scale-105">
						<img alt="FormGuard - AI Form Backend for Builders | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1086617&amp;theme=neutral&amp;t=1772347025205" />
					</a>
				</div>

				{/* Micro-trust line */}
				<p className="text-xs font-mono text-muted-foreground mb-10">
					Works with plain HTML forms. No SDK required.
				</p>

				{/* Video Showcase */}
				<div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-muted/20 relative aspect-video mt-12 mb-10">
					<iframe 
						className="absolute top-0 left-0 w-full h-full"
						src="https://www.youtube.com/embed/u6Abofkznog?rel=0" 
						title="FormGuard Demo" 
						frameBorder="0" 
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
						referrerPolicy="strict-origin-when-cross-origin" 
						allowFullScreen
					></iframe>
				</div>

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
