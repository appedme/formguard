import Link from "next/link";

export default function Hero() {
	return (
		<section className="py-24 border-b border-black/10">
			<div className="mx-auto max-w-6xl px-6">
				{/* Eyebrow */}
				<p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">
					Edge-Powered · AI-Native · Cloudflare Workers
				</p>

				{/* Headline */}
				<h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-black max-w-4xl mb-6">
					Stop building
					<br />
					form backends.
					<br />
					<span className="text-gray-400">Just drop an endpoint</span>
					<br />
					and ship.
				</h1>

				{/* Sub-headline */}
				<p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
					FormGuard captures submissions, blocks spam, and turns raw responses
					into AI insights — powered by Cloudflare edge infrastructure. Zero
					backend setup.
				</p>

				{/* CTAs */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
					<Link
						href="/handler/sign-up"
						data-cta="start-free-hero"
						className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold bg-black text-white hover:bg-gray-800 transition-colors"
					>
						Start Free — No Credit Card
					</Link>
					<Link
						href="#how-it-works"
						className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold border border-black text-black hover:bg-gray-50 transition-colors"
					>
						See How It Works →
					</Link>
				</div>

				{/* Deploy line */}
				<p className="text-sm text-gray-500 font-mono mb-8">
					⚡ Deploy in under 2 minutes.
				</p>

				{/* Trust line */}
				<p className="text-sm text-gray-500">
					Built for indie makers, YC founders, and fast-moving teams.
				</p>
			</div>
		</section>
	);
}
