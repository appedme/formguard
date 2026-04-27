const steps = [
	{
		number: "01",
		title: "Connect",
		description: 'Paste your unique endpoint URL into your HTML form action. No SDK required.',
	},
	{
		number: "02",
		title: "Protect",
		description:
			"Activate invisible AI filtering with a single toggle. No more CAPTCHAs.",
	},
	{
		number: "03",
		title: "Ship",
		description:
			'Watch clean submissions roll in, synced automatically to your tools.',
	},
];

export default function HowItWorks() {
	return (
		<section id="how-it-works" className="py-32 bg-background border-t border-border/50">
			<div className="mx-auto max-w-5xl px-6">
				<div className="text-center mb-20">
					<h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-4">
						Integrated in <span className="text-primary italic">seconds.</span>
					</h2>
					<p className="text-muted-foreground font-medium text-lg">
						Standard HTML. Zero server-side code.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-16 mb-24">
					{steps.map((step) => (
						<div key={step.number} className="group">
							<p className="text-5xl font-black text-primary/10 mb-6 group-hover:text-primary/30 transition-colors">
								{step.number}
							</p>
							<h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
							<p className="text-muted-foreground leading-relaxed font-medium">
								{step.description}
							</p>
						</div>
					))}
				</div>

				{/* Sleeker Code snippet */}
				<div className="max-w-3xl mx-auto border border-border/50 bg-secondary/20 p-8 rounded-3xl">
					<div className="flex items-center gap-2 mb-6">
						<div className="w-2.5 h-2.5 rounded-full bg-border" />
						<div className="w-2.5 h-2.5 rounded-full bg-border" />
						<div className="w-2.5 h-2.5 rounded-full bg-border" />
					</div>
					<pre className="text-primary font-mono text-sm md:text-base overflow-x-auto">
						{`<form action="https://formguard.unstory.app/api/submit/ID" method="POST">
  <button type="submit">Send Message</button>
</form>`}
					</pre>
				</div>
			</div>
		</section>
	);
}
