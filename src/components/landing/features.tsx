const features = [
	{
		icon: "⚡",
		title: "Edge Processing",
		benefit: "Submissions handled globally in <50ms. No cold starts.",
	},
	{
		icon: "🤖",
		title: "AI Summaries",
		benefit: "Transform raw replies into structured insight on demand.",
	},
	{
		icon: "🛡️",
		title: "Spam Protection",
		benefit: "Bot detection and rate limiting baked in at the edge.",
	},
	{
		icon: "👥",
		title: "Team Workspaces",
		benefit: "Collaborate on forms and insights with your team.",
	},
	{
		icon: "💳",
		title: "Razorpay Billing",
		benefit: "India-friendly subscriptions with secure webhook upgrades.",
	},
	{
		icon: "🔗",
		title: "Webhook Automation",
		benefit: "Push submissions to Slack, Notion, or any external system.",
	},
];

export default function Features() {
	return (
		<section id="features" className="py-24 border-b border-black/10">
			<div className="mx-auto max-w-6xl px-6">
				<p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">
					Features
				</p>
				<h2 className="text-3xl font-black text-black mb-14">
					Everything you need.
					<br />
					<span className="text-gray-400">Nothing you don&apos;t.</span>
				</h2>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="bg-white p-8 hover:bg-gray-50 transition-colors"
						>
							<p className="text-2xl mb-4">{feature.icon}</p>
							<h3 className="text-base font-bold text-black mb-2">
								{feature.title}
							</h3>
							<p className="text-sm text-gray-600">{feature.benefit}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
