const faqs = [
	{
		q: "Do I need a backend?",
		a: "No. FormGuard is the backend. Just point your form's action attribute to your unique endpoint. That's it.",
	},
	{
		q: "Does it work with static sites?",
		a: "Yes — HTML forms, React, Vue, plain fetch calls — anything that can POST to a URL works perfectly.",
	},
	{
		q: "Is AI usage limited?",
		a: "AI insights are available on Pro and Growth plans and are generated on demand, so you control timing and cost.",
	},
	{
		q: "Can I use custom domains?",
		a: "Custom domain endpoints are on the roadmap and will be available soon for Growth plan users.",
	},
	{
		q: "Is my data private?",
		a: "Yes. Data is stored in isolated Cloudflare D1 buckets per workspace. We never share submission data.",
	},
];

export default function FAQ() {
	return (
		<section className="py-24 border-b border-black/10">
			<div className="mx-auto max-w-6xl px-6">
				<p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">
					FAQ
				</p>
				<h2 className="text-3xl font-black text-black mb-14">
					Common questions.
				</h2>

				<div className="space-y-px bg-black/5">
					{faqs.map((faq, i) => (
						<details
							key={i}
							className="group bg-white border-b border-black/10 last:border-b-0"
						>
							<summary className="flex items-center justify-between cursor-pointer px-8 py-6 text-base font-semibold text-black list-none hover:bg-gray-50 transition-colors">
								{faq.q}
								<span className="font-mono text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">
									+
								</span>
							</summary>
							<div className="px-8 pb-6">
								<p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
							</div>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
