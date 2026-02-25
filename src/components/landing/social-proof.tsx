const badges = [
	"Next.js",
	"Cloudflare Workers",
	"StackAuth",
	"Razorpay",
	"AI Powered",
];

export default function SocialProof() {
	return (
		<section className="py-12 border-b border-black/10 bg-gray-50">
			<div className="mx-auto max-w-6xl px-6">
				<p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6 text-center">
					Designed for builders who hate backend overhead.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-3">
					{badges.map((badge) => (
						<span
							key={badge}
							className="inline-flex items-center px-4 py-1.5 border border-black/15 text-xs font-mono font-medium text-black bg-white"
						>
							{badge}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
