import { Star } from "lucide-react";

const testimonials = [
	{
		name: "Alex Chen",
		role: "Founding Engineer, LaunchPad",
		quote: "FormGuard replaced our entire form infrastructure in one afternoon. The AI insights alone saved us 10 hours of manual analysis per week.",
		rating: 5,
	},
	{
		name: "Priya Sharma",
		role: "Product Designer, PixelCraft",
		quote: "The public form builder is incredible. We went from design to live waitlist page in under 5 minutes. No code, beautiful UI, just works.",
		rating: 5,
	},
	{
		name: "Marcus Bell",
		role: "CTO, NexaHealth",
		quote: "Edge processing means our global user base gets sub-100ms form responses. The Telegram and Notion integrations are the cherry on top.",
		rating: 5,
	},
	{
		name: "Sara Johansson",
		role: "Indie Hacker",
		quote: "Previously, I had Zapier duct-taped to three different services. FormGuard consolidated everything — forms, analytics, AI, webhooks — into one dashboard.",
		rating: 5,
	},
];

const stats = [
	{ value: "50K+", label: "Submissions Processed" },
	{ value: "<50ms", label: "Avg. Response Time" },
	{ value: "99.9%", label: "Spam Detection Rate" },
	{ value: "300+", label: "Edge Locations" },
];

export default function Testimonials() {
	return (
		<section className="py-28 bg-muted/20 border-y border-border/40">
			<div className="mx-auto max-w-6xl px-6">
				{/* Stats Bar */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
					{stats.map((stat) => (
						<div key={stat.label} className="text-center">
							<p className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-1">{stat.value}</p>
							<p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</p>
						</div>
					))}
				</div>

				{/* Section Header */}
				<div className="text-center mb-16">
					<p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary font-black mb-4">Trusted by Developers</p>
					<h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
						Loved by teams who <span className="italic text-muted-foreground">ship fast</span>
					</h2>
				</div>

				{/* Testimonial Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{testimonials.map((t) => (
						<div
							key={t.name}
							className="p-8 bg-card border border-border/40 rounded-2xl hover:border-primary/20 transition-all group"
						>
							<div className="flex items-center gap-0.5 mb-4">
								{Array.from({ length: t.rating }).map((_, i) => (
									<Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
								))}
							</div>
							<blockquote className="text-sm text-foreground/80 leading-relaxed mb-6 font-medium">
								&ldquo;{t.quote}&rdquo;
							</blockquote>
							<div className="flex items-center gap-3">
								<div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-black">
									{t.name.charAt(0)}
								</div>
								<div>
									<p className="text-xs font-bold text-foreground">{t.name}</p>
									<p className="text-[10px] text-muted-foreground">{t.role}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
