"use client";

import Link from "next/link";

const plans = [
	{
		name: "Starter",
		price: "$0",
		period: "",
		description: "Perfect for personal projects and small blogs.",
		features: [
			"500 submissions / mo",
			"3 active forms",
			"Standard spam protection",
			"Webhooks enabled",
		],
		cta: "Start for Free",
		href: "/handler/sign-up",
		highlighted: false,
		badge: null,
		ctaAttr: "start-free-pricing",
	},
	{
		name: "Pro",
		price: "$19",
		period: "/mo",
		description: "Everything you need for a growing SaaS.",
		features: [
			"25,000 submissions / mo",
			"25 active forms",
			"AI-powered spam engine",
			"Custom redirect URLs",
			"Priority support",
		],
		cta: "Get Started with Pro",
		href: "/handler/sign-up",
		highlighted: true,
		badge: "Most Popular",
		ctaAttr: "upgrade-pro",
	},
	{
		name: "Business",
		price: "$49",
		period: "/mo",
		description: "Advanced controls for high-traffic apps.",
		features: [
			"Unlimited submissions",
			"Unlimited active forms",
			"Advanced rate limiting",
			"Team collaboration",
			"White-labeled endpoints",
		],
		cta: "Go Business",
		href: "/handler/sign-up",
		highlighted: false,
		badge: null,
		ctaAttr: "go-growth",
	},
];

export default function Pricing() {
	return (
		<section id="pricing" className="py-24 border-b border-border bg-background">
			<div className="mx-auto max-w-6xl px-6">
				<div className="text-center mb-16">
					<p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4 font-bold">
						Pricing
					</p>
					<h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
						Transparent pricing for <br /> developers of all sizes.
					</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
						No hidden fees. No credit card required to start. Cancel anytime.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`relative p-8 flex flex-col rounded-2xl border transition-all ${
								plan.highlighted
									? "border-primary bg-primary/5 shadow-2xl shadow-primary/10 scale-105 z-10"
									: "border-border bg-card hover:border-primary/20 shadow-sm"
							}`}
						>
							{/* Badge */}
							{plan.badge && (
								<span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
									{plan.badge}
								</span>
							)}

							<div className="mb-8">
								<p className="text-sm font-bold text-foreground mb-4">
									{plan.name}
								</p>
								<div className="flex items-baseline gap-1 mb-4">
									<span className="text-5xl font-black tracking-tight">{plan.price}</span>
									<span className="text-sm font-bold text-muted-foreground">
										{plan.period}
									</span>
								</div>
								<p className="text-sm text-muted-foreground leading-relaxed font-medium">
									{plan.description}
								</p>
							</div>

							<ul className="space-y-4 mb-10 grow">
								{plan.features.map((f) => (
									<li key={f} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
										<div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
											<span className="text-primary text-[10px] font-black">✓</span>
										</div>
										{f}
									</li>
								))}
							</ul>

							<Link
								href={plan.href}
								data-cta={plan.ctaAttr}
								className={`w-full inline-flex items-center justify-center h-12 text-sm font-bold rounded-xl transition-all ${
									plan.highlighted
										? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
										: "bg-secondary text-foreground hover:bg-secondary/80"
								}`}
							>
								{plan.cta}
							</Link>
						</div>
					))}
				</div>

				<div className="mt-16 pt-8 border-t border-border flex flex-wrap justify-center gap-x-12 gap-y-6">
					<div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">
						<span className="text-emerald-500">✓</span> Secure Stripe Billing
					</div>
					<div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">
						<span className="text-emerald-500">✓</span> Cancel Anytime
					</div>
					<div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">
						<span className="text-emerald-500">✓</span> 14-Day Money Back
					</div>
				</div>
			</div>
		</section>
	);
}
