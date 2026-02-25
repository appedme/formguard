import Link from "next/link";

export default function FinalCTA() {
	return (
		<section className="py-32 border-b border-black/10 bg-black">
			<div className="mx-auto max-w-6xl px-6 text-center">
				<p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-8">
					Stop waiting. Start shipping.
				</p>
				<h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
					Ship forms faster
					<br />
					than your competitors.
				</h2>
				<p className="text-gray-500 text-base mb-12 font-mono">
					No credit card required.
				</p>
				<Link
					href="/handler/sign-up"
					data-cta="start-free-final"
					className="inline-flex items-center justify-center h-14 px-10 text-base font-semibold bg-white text-black hover:bg-gray-100 transition-colors"
				>
					Start Free — Deploy in Minutes
				</Link>
			</div>
		</section>
	);
}
