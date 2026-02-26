import Link from "next/link";

const problems = [
	"Stop writing backend handlers.",
	"Stop cleaning spam manually.",
	"Stop guessing what users want.",
];

export default function ProblemSolution() {
	return (
		<section className="py-24 border-b border-border bg-background">
			<div className="mx-auto max-w-6xl px-6">
				<div className="grid md:grid-cols-2 gap-16 items-start">
					{/* Problem */}
					<div>
						<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
							The Problem
						</p>
						<h2 className="text-3xl font-semibold text-foreground mb-8">
							Form backends are a
							<br />
							<span className="text-muted-foreground">waste of your time.</span>
						</h2>
						<ul className="space-y-4">
							{problems.map((problem) => (
								<li key={problem} className="flex items-start gap-3">
									<span className="mt-1 text-foreground font-mono text-sm">✗</span>
									<span className="text-muted-foreground text-base">{problem}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Solution */}
					<div className="border-l border-border md:pl-16">
						<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
							The Solution
						</p>
						<h2 className="text-3xl font-semibold text-foreground mb-8">
							One endpoint.
							<br />
							Edge processing.
							<br />
							<span className="text-muted-foreground">Instant insights.</span>
						</h2>
						<p className="text-muted-foreground mb-8 leading-relaxed text-sm">
							FormGuard provides the infrastructure to capture, filter, and analyze submissions at the edge. No SDK, no complex backend handlers, just one endpoint.
						</p>
						<Link
							href="/handler/sign-up"
							data-cta="start-free-problem"
							className="inline-flex items-center justify-center h-11 px-6 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
						>
							Deploy Form Infrastructure →
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
