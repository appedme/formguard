import Link from "next/link";

const bullets = [
	"Auto summary of all submissions",
	"Detect repeated feature requests instantly",
	"Sentiment analysis across responses",
	"Weekly insight reports delivered",
];

const mockOutput = `> FormGuard AI Insight — Contact Form (March 2024)
>
> Summary: 47 submissions analyzed.
> Top theme: "Pricing transparency" (18 mentions)
> Sentiment: Mostly positive (74%)
> Action items:
>   ✦ Add pricing FAQ to landing page
>   ✦ Follow up with enterprise inquiries (×6)
>   ✦ Bug: Login flow reported broken on Safari
>
> Generated in 1.3s · Powered by edge AI`;

export default function AiSection() {
	return (
		// This section is intentionally always dark — terminal/code aesthetic
		// Uses explicit .dark wrapper so shadcn vars flip to dark values
		<div className="dark">
			<section className="py-24 border-b border-border bg-background">
				<div className="mx-auto max-w-6xl px-6">
					<div className="grid md:grid-cols-2 gap-16 items-start">
						{/* Left */}
						<div>
							<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
								AI Insight Engine
							</p>
							<h2 className="text-3xl font-semibold text-foreground mb-4 leading-tight">
								Your submissions don&apos;t just
								<br />
								collect data.
								<br />
								<span className="text-muted-foreground">They explain it.</span>
							</h2>
							<p className="text-muted-foreground mb-8 leading-relaxed text-sm">
								Built for founders who read every submission. FormGuard batches your submissions and runs them through an logic-gate AI — returning a structured, actionable summary.
							</p>
							<ul className="space-y-3 mb-10">
								{bullets.map((b) => (
									<li key={b} className="flex items-center gap-3 text-sm text-foreground">
										<span className="text-green-400 font-mono">✓</span>
										{b}
									</li>
								))}
							</ul>
							<Link
								href="/handler/sign-up"
								data-cta="start-free-ai"
								className="inline-flex items-center justify-center h-11 px-6 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
							>
								Try AI Insights Free →
							</Link>
						</div>

						{/* Right — always-dark terminal preview */}
						<div className="border border-border bg-black/50 p-8 md:p-12">
							<div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
								<div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
								<div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
								<div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
								<span className="ml-2 text-xs font-mono text-muted-foreground">
									formguard — infrastructure_analysis.log
								</span>
							</div>
							<pre className="font-mono text-xs text-green-400/90 whitespace-pre-wrap leading-relaxed overflow-x-auto">
								{mockOutput}
							</pre>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
