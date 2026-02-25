import Features from "@/components/landing/features";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import Link from "next/link";

export const metadata = {
	title: "Features",
	description: "Everything FormGuard does: edge processing, AI summaries, spam protection, webhook automation, and more.",
};

export default function FeaturesPage() {
	return (
		<>
			<Navbar />
			<main>
				<section className="py-16 border-b border-border bg-background">
					<div className="mx-auto max-w-6xl px-6">
						<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
							Features
						</p>
						<h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
							Built for every builder.
						</h1>
						<p className="text-muted-foreground max-w-xl leading-relaxed mb-6">
							FormGuard replaces your form backend with a single edge
							endpoint — and wraps it with AI, spam protection, analytics, and
							a clean dashboard. No servers. Ever.
						</p>
						<Link
							href="/handler/sign-up"
							data-cta="start-free-features-hero"
							className="inline-flex items-center justify-center h-11 px-6 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
						>
							Start Free — No Credit Card
						</Link>
					</div>
				</section>

				<Features />

				{/* Deep-dive breakdown */}
				<section className="py-24 border-b border-border bg-background">
					<div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16">
						<div>
							<h2 className="text-2xl font-black text-foreground mb-4">Edge Processing</h2>
							<p className="text-muted-foreground text-sm leading-relaxed mb-4">
								Every submission hits a Cloudflare Worker running within 50ms of
								your user. No cold starts, no regional latency spikes. The
								payload is validated, rate-limited, and stored before the user
								even sees your thank-you page.
							</p>
							<ul className="space-y-2 text-sm text-muted-foreground">
								{["Global Cloudflare network", "Rate limiting per IP", "Payload validation", "Instant acknowledgement"].map(f => (
									<li key={f} className="flex items-center gap-2"><span className="text-foreground font-mono">✓</span>{f}</li>
								))}
							</ul>
						</div>
						<div>
							<h2 className="text-2xl font-black text-foreground mb-4">AI Summaries</h2>
							<p className="text-muted-foreground text-sm leading-relaxed mb-4">
								On demand — not automatic — so you control AI costs. Click
								&ldquo;Generate Insight&rdquo; from the dashboard, and the Worker
								batches your submissions, calls the AI model, and returns a
								structured plain-English summary.
							</p>
							<ul className="space-y-2 text-sm text-muted-foreground">
								{["On-demand generation", "Sentiment analysis", "Repeated theme detection", "Weekly report mode"].map(f => (
									<li key={f} className="flex items-center gap-2"><span className="text-foreground font-mono">✓</span>{f}</li>
								))}
							</ul>
						</div>
						<div>
							<h2 className="text-2xl font-black text-foreground mb-4">Spam Protection</h2>
							<p className="text-muted-foreground text-sm leading-relaxed mb-4">
								Bot detection and honeypot checks happen at the Worker layer,
								before data ever reaches the database. Keeps your submission
								table clean without any client-side dependencies.
							</p>
						</div>
						<div>
							<h2 className="text-2xl font-black text-foreground mb-4">App Integrations</h2>
							<p className="text-muted-foreground text-sm leading-relaxed mb-4">
								Connect your form data to the tools you already use. Automatically
								sync submissions to Notion databases, Google Sheets, or Slack
								channels the moment they arrive.
							</p>
							<ul className="space-y-2 text-sm text-muted-foreground">
								{["Notion & Google Sheets", "Slack & Discord", "100+ Apps via Zapier", "Native Webhooks"].map(f => (
									<li key={f} className="flex items-center gap-2"><span className="text-foreground font-mono">✓</span>{f}</li>
								))}
							</ul>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
