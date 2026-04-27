const steps = [
	{
		number: "01",
		title: "Connect Your Form",
		description: 'Copy your unique endpoint URL and paste it into your HTML form action. No SDK required.',
	},
	{
		number: "02",
		title: "Enable Protection",
		description:
			"Activate invisible AI spam filtering with a single toggle. No more CAPTCHA puzzles for your users.",
	},
	{
		number: "03",
		title: "Ship with Confidence",
		description:
			'Watch clean submissions roll into your dashboard, synced automatically to your favorite tools.',
	},
];

export default function HowItWorks() {
	return (
		<section id="how-it-works" className="py-24 border-b border-border bg-background">
			<div className="mx-auto max-w-6xl px-6">
				<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
					The Workflow
				</p>
				<h2 className="text-3xl font-black text-foreground mb-4 tracking-tight">
					Integrated in under 60 seconds.
				</h2>
				<p className="text-muted-foreground font-mono text-sm mb-14">
					Standard HTML. Zero server-side code.
				</p>

				<div className="grid md:grid-cols-3 gap-8">
					{steps.map((step) => (
						<div
							key={step.number}
							className="border border-border p-8 bg-card text-card-foreground hover:border-primary/20 transition-all group"
						>
							<p className="text-4xl font-black text-primary/10 font-mono mb-4 group-hover:text-primary/20 transition-colors">
								{step.number}
							</p>
							<h3 className="text-lg font-bold text-card-foreground mb-3">{step.title}</h3>
							<p className="text-sm text-muted-foreground leading-relaxed font-medium">
								{step.description}
							</p>
						</div>
					))}
				</div>

				{/* Code snippet */}
				<div className="mt-12 border border-border bg-secondary/30 p-8 rounded-2xl relative overflow-hidden group">
					<div className="absolute top-0 right-0 p-4">
						<div className="flex gap-1.5">
							<div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
							<div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
							<div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
						</div>
					</div>
					<p className="text-muted-foreground mb-4 text-xs font-mono font-bold uppercase tracking-widest">HTML Integration</p>
					<pre className="text-primary font-mono text-sm md:text-base overflow-x-auto">
						{`<form action="https://formguard.unstory.app/api/submit/YOUR_ID" method="POST">
  <!-- Your fields here -->
  <button type="submit">Send Message</button>
</form>`}
					</pre>
				</div>
			</div>
		</section>
	);
}
