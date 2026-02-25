const features = [
	{ icon: "⚡", title: "Edge Processing", benefit: "Submissions handled globally in <50ms. No cold starts." },
	{ icon: "🤖", title: "AI Summaries", benefit: "Transform raw replies into structured insight on demand." },
	{ icon: "🛡️", title: "Spam Protection", benefit: "Bot detection and rate limiting baked in at the edge." },
	{ icon: "👥", title: "Team Workspaces", benefit: "Collaborate on forms and insights with your team." },
	{ icon: "💳", title: "Razorpay Billing", benefit: "India-friendly subscriptions with secure webhook upgrades." },
	{ icon: "🔗", title: "Webhook Automation", benefit: "Push submissions to Slack, Notion, or any external system." },
];

export default function Features() {
	return (
		<section id="features" className="py-24 border-b border-border bg-background">
			<div className="mx-auto max-w-6xl px-6">
				<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
					Features
				</p>
				<h2 className="text-3xl font-black text-foreground mb-14">
					Everything you need.
					<br />
					<span className="text-muted-foreground">Nothing you don&apos;t.</span>
				</h2>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="bg-card text-card-foreground p-8 hover:bg-accent transition-colors"
						>
							<p className="text-2xl mb-4">{feature.icon}</p>
							<h3 className="text-base font-bold text-card-foreground mb-2">{feature.title}</h3>
							<p className="text-sm text-muted-foreground">{feature.benefit}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
