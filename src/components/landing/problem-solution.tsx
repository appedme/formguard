import Link from "next/link";

const problems = [
	"reCAPTCHA kills your conversion rate.",
	"Traditional CAPTCHAs ruin user experience.",
	"Sophisticated bots bypass simple filters.",
	"Spam submissions waste your team's time.",
];

export default function ProblemSolution() {
	return (
		<section className="py-24 border-b border-border bg-background">
			<div className="mx-auto max-w-6xl px-6">
				<div className="grid md:grid-cols-2 gap-16 items-start">
					{/* Problem */}
					<div>
						<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
							The Friction
						</p>
						<h2 className="text-3xl font-black text-foreground mb-8 tracking-tight">
							Standard protection
							<br />
							<span className="text-muted-foreground">is broken.</span>
						</h2>
						<ul className="space-y-4">
							{problems.map((problem) => (
								<li key={problem} className="flex items-start gap-3">
									<span className="mt-1 text-red-500 font-mono text-sm font-bold">✗</span>
									<span className="text-muted-foreground text-base font-medium">{problem}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Solution */}
					<div className="lg:border-l border-border lg:pl-16">
						<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
							The Alternative
						</p>
						<h2 className="text-3xl font-black text-foreground mb-8 tracking-tight">
							Invisible.
							<br />
							Developer-friendly.
							<br />
							<span className="text-muted-foreground">High conversion.</span>
						</h2>
						<p className="text-muted-foreground mb-8 leading-relaxed text-sm font-medium">
							FormGuard provides invisible, AI-powered protection that stops bots without bothering your users. No more traffic lights to click, no more blurry text to solve. Just seamless submissions.
						</p>
						<Link
							href="/handler/sign-up"
							data-cta="start-free-problem"
							className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-lg"
						>
							Start Protecting Your Forms →
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
