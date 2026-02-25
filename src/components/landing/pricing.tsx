"use client";

import Link from "next/link";

const plans = [
	{
		name: "Free",
		price: "$0",
		period: "",
		description: "Perfect for trying it out.",
		features: ["100 submissions / month", "Basic dashboard", "1 form"],
		cta: "Start Free",
		href: "/handler/sign-up",
		highlighted: false,
		badge: null,
		ctaAttr: "start-free-pricing",
	},
	{
		name: "Pro",
		price: "$9",
		period: "/month",
		description: "For makers and indie devs.",
		features: [
			"5,000 submissions / month",
			"AI summaries",
			"Spam filtering",
			"Export tools",
			"10 forms",
		],
		cta: "Upgrade to Pro",
		href: "/handler/sign-up",
		highlighted: true,
		badge: "MOST POPULAR",
		ctaAttr: "upgrade-pro",
	},
	{
		name: "Growth",
		price: "$29",
		period: "/month",
		description: "For teams shipping fast.",
		features: [
			"Unlimited submissions",
			"Weekly insight reports",
			"Team workspace",
			"Priority edge processing",
			"Custom webhook automation",
		],
		cta: "Go Growth",
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
				<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
					Pricing
				</p>
				<h2 className="text-3xl font-black text-foreground mb-4">
					Pay for what you need.
					<br />
					<span className="text-muted-foreground">Cancel anytime.</span>
				</h2>
				<p className="text-sm text-muted-foreground font-mono mb-14">
					Secure billing · No hidden fees
				</p>

				<div className="grid md:grid-cols-3 gap-6">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`relative border p-8 flex flex-col ${
								plan.highlighted
									? "border-foreground bg-primary text-primary-foreground"
									: "border-border bg-card text-card-foreground"
							}`}
						>
							{/* Badge */}
							{plan.badge && (
								<span className="absolute -top-3 left-8 bg-background text-foreground text-xs font-mono font-bold px-3 py-1 border border-border">
									{plan.badge}
								</span>
							)}

							<div className="mb-8">
								<p className={`text-xs font-mono uppercase tracking-widest mb-3 ${plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
									{plan.name}
								</p>
								<div className="flex items-baseline gap-1 mb-2">
									<span className="text-4xl font-black">{plan.price}</span>
									<span className={`text-sm font-mono ${plan.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
										{plan.period}
									</span>
								</div>
								<p className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
									{plan.description}
								</p>
							</div>

							<ul className="space-y-3 mb-10 flex-grow">
								{plan.features.map((f) => (
									<li key={f} className="flex items-center gap-3 text-sm">
										<span className={`font-mono ${plan.highlighted ? "text-green-300" : "text-foreground"}`}>
											✓
										</span>
										{f}
									</li>
								))}
							</ul>

							<Link
								href={plan.href}
								data-cta={plan.ctaAttr}
								className={`w-full inline-flex items-center justify-center h-11 text-sm font-semibold transition-colors ${
									plan.highlighted
										? "bg-background text-foreground hover:bg-accent"
										: "bg-primary text-primary-foreground hover:bg-primary/90"
								}`}
							>
								{plan.cta}
							</Link>
						</div>
					))}
				</div>

				<p className="text-center text-xs text-muted-foreground font-mono mt-8">
					Cancel anytime. Secure billing. No credit card for free plan.
				</p>
			</div>
		</section>
	);
}
