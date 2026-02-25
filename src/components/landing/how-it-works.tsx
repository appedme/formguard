const steps = [
	{
		number: "01",
		title: "Create a Form",
		description:
			"Click &ldquo;Create Form&rdquo; in your dashboard. Name it, set it up, done.",
	},
	{
		number: "02",
		title: "Copy Your Endpoint",
		description:
			"Get a unique edge URL. Drop it as your HTML form&apos;s action. No server required.",
	},
	{
		number: "03",
		title: "Receive Clean Insights",
		description:
			"Submissions appear live. Click &ldquo;Generate Insight&rdquo; for an AI summary of everything.",
	},
];

export default function HowItWorks() {
	return (
		<section id="how-it-works" className="py-24 border-b border-black/10">
			<div className="mx-auto max-w-6xl px-6">
				<p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">
					How It Works
				</p>
				<h2 className="text-3xl font-black text-black mb-4">
					Up and running in minutes.
				</h2>
				<p className="text-gray-500 font-mono text-sm mb-14">
					No servers. No cron jobs. No headaches.
				</p>

				<div className="grid md:grid-cols-3 gap-8">
					{steps.map((step) => (
						<div
							key={step.number}
							className="border border-black/10 p-8 bg-white group hover:border-black transition-colors"
						>
							<p className="text-4xl font-black text-gray-100 font-mono mb-4 group-hover:text-gray-200 transition-colors">
								{step.number}
							</p>
							<h3 className="text-lg font-bold text-black mb-3">{step.title}</h3>
							<p
								className="text-sm text-gray-600 leading-relaxed"
								dangerouslySetInnerHTML={{ __html: step.description }}
							/>
						</div>
					))}
				</div>

				{/* Code snippet */}
				<div className="mt-12 border border-black/10 bg-gray-950 p-6 font-mono text-sm">
					<p className="text-gray-500 mb-2 text-xs">Your integration — one line:</p>
					<pre className="text-green-400 overflow-x-auto">{`<form action="https://formguard.strivio.world/api/submit/abc123" method="POST">`}</pre>
				</div>
			</div>
		</section>
	);
}
