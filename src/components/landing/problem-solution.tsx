import Link from "next/link";

const problems = [
	"reCAPTCHA kills your conversion rate.",
	"Traditional CAPTCHAs ruin user experience.",
	"Sophisticated bots bypass simple filters.",
	"Spam submissions waste your team's time.",
];

export default function ProblemSolution() {
	return (
		<section className="py-32 bg-background border-t border-border/50">
			<div className="mx-auto max-w-5xl px-6">
				<div className="grid md:grid-cols-2 gap-20 items-center">
					{/* Problem */}
					<div className="space-y-8">
						<h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter leading-[0.9]">
							The old way <br />
							<span className="text-muted-foreground italic">is broken.</span>
						</h2>
						<ul className="space-y-4">
							{problems.map((problem) => (
								<li key={problem} className="flex items-start gap-3">
									<span className="mt-1 text-red-500 font-bold text-sm">×</span>
									<span className="text-muted-foreground text-lg font-medium tracking-tight">{problem}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Solution */}
					<div className="space-y-8">
						<h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter leading-[0.9]">
							The modern <br />
							<span className="text-primary italic">alternative.</span>
						</h2>
						<p className="text-lg text-muted-foreground font-medium leading-relaxed">
							FormGuard provides invisible, AI-powered protection that stops bots without bothering your users. No more traffic lights to click. Just seamless submissions.
						</p>
						<Link
							href="/handler/sign-up"
							className="inline-flex items-center text-sm font-black uppercase tracking-widest text-primary hover:gap-3 transition-all"
						>
							Start Protecting Your Forms <span className="text-xl">→</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
