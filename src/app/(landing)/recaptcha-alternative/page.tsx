import Link from "next/link";
import { ShieldCheck, XCircle, CheckCircle2, Zap, ArrowRight, Lock, EyeOff } from "lucide-react";
import Comparison from "@/components/landing/comparison";
import FinalCTA from "@/components/landing/final-cta";
import { stackServerApp } from "@/stack/server";

export const metadata = {
	title: "The Best reCAPTCHA Alternative for 2026 | FormGuard",
	description: "Stop using reCAPTCHA. FormGuard is the privacy-first, invisible alternative that doesn't ruin your conversion rates or user experience.",
};

export default async function RecaptchaAlternative() {
	const user = await stackServerApp.getUser();

	return (
		<main>
			{/* SEO Hero */}
			<section className="py-32 border-b border-border bg-background overflow-hidden relative">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-red-500/5 blur-[120px] rounded-full opacity-50" />
				</div>
				
				<div className="mx-auto max-w-5xl px-6 text-center">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-bold mb-8 border border-red-500/20 uppercase tracking-widest">
						Stop Killing Your Conversions
					</div>
					<h1 className="text-5xl md:text-7xl font-black text-foreground mb-8 tracking-tight leading-[1.1]">
						The modern alternative <br /> to <span className="text-red-500 line-through decoration-8">reCAPTCHA.</span>
					</h1>
					<p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto font-medium">
						reCAPTCHA was built for the web of 2010. FormGuard is built for the web of 2026. No puzzles, no privacy concerns, just 99.9% bot protection.
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link
							href="/handler/sign-up"
							className="inline-flex items-center justify-center h-14 px-10 text-base font-bold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
						>
							Switch to FormGuard Free
							<ArrowRight className="w-4 h-4 ml-2" />
						</Link>
						<Link
							href="#why-recaptcha-is-bad"
							className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
						>
							Why reCAPTCHA is hurting you ↓
						</Link>
					</div>
				</div>
			</section>

			{/* Why reCAPTCHA is bad */}
			<section id="why-recaptcha-is-bad" className="py-24 border-b border-border bg-card">
				<div className="mx-auto max-w-6xl px-6">
					<h2 className="text-3xl font-black text-foreground mb-16 text-center tracking-tight">3 Reasons to Ditch reCAPTCHA Today</h2>
					<div className="grid md:grid-cols-3 gap-12">
						<div className="space-y-6 p-8 bg-background border border-border rounded-2xl hover:border-red-500/20 transition-all">
							<div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
								<XCircle className="w-6 h-6 text-red-500" />
							</div>
							<h3 className="text-xl font-bold">Terrible User Experience</h3>
							<p className="text-muted-foreground font-medium text-sm leading-relaxed">
								Clicking fire hydrants and traffic lights is a nightmare for users. It creates friction that leads to dropped leads and abandoned signups.
							</p>
						</div>
						<div className="space-y-6 p-8 bg-background border border-border rounded-2xl hover:border-red-500/20 transition-all">
							<div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
								<Lock className="w-6 h-6 text-red-500" />
							</div>
							<h3 className="text-xl font-bold">Privacy Nightmares</h3>
							<p className="text-muted-foreground font-medium text-sm leading-relaxed">
								reCAPTCHA tracks your users across the web to build profiles. FormGuard is GDPR/CCPA compliant and respects user privacy.
							</p>
						</div>
						<div className="space-y-6 p-8 bg-background border border-border rounded-2xl hover:border-red-500/20 transition-all">
							<div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
								<Zap className="w-6 h-6 text-red-500" />
							</div>
							<h3 className="text-xl font-bold">Developer Friction</h3>
							<p className="text-muted-foreground font-medium text-sm leading-relaxed">
								Integrating reCAPTCHA requires complex SDKs and client-side scripts. FormGuard is a one-line backend change.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* FormGuard Solution */}
			<section className="py-24 border-b border-border bg-background">
				<div className="mx-auto max-w-6xl px-6">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-4xl font-black text-foreground mb-8 tracking-tight">The Invisible Solution</h2>
							<p className="text-lg text-muted-foreground mb-8 font-medium">
								FormGuard works silently in the background. It analyzes behavioral signals and network patterns to distinguish between humans and bots without ever asking for a click.
							</p>
							<ul className="space-y-4 mb-10">
								<li className="flex items-center gap-3 font-bold text-foreground/80">
									<CheckCircle2 className="w-5 h-5 text-emerald-500" />
									99.9% Detection Accuracy
								</li>
								<li className="flex items-center gap-3 font-bold text-foreground/80">
									<CheckCircle2 className="w-5 h-5 text-emerald-500" />
									Zero Latency for Users
								</li>
								<li className="flex items-center gap-3 font-bold text-foreground/80">
									<CheckCircle2 className="w-5 h-5 text-emerald-500" />
									GDPR & CCPA Compliant
								</li>
							</ul>
							<Link
								href="/handler/sign-up"
								className="inline-flex items-center justify-center h-12 px-8 text-sm font-bold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
							>
								Start Free Integration
							</Link>
						</div>
						<div className="bg-secondary/30 border border-border p-8 rounded-3xl relative group">
							<div className="p-6 bg-card border border-border rounded-2xl shadow-xl space-y-4">
								<div className="flex items-center justify-between border-b border-border pb-4">
									<span className="font-bold text-sm">Real-time Protection Log</span>
									<span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest">Live</span>
								</div>
								<div className="space-y-3">
									<div className="flex items-center justify-between text-xs">
										<span className="text-muted-foreground">Submission from IP 192.168.1.1</span>
										<span className="text-emerald-500 font-bold font-mono">HUMAN [ACCEPTED]</span>
									</div>
									<div className="flex items-center justify-between text-xs">
										<span className="text-muted-foreground">Submission from IP 45.12.3.9</span>
										<span className="text-red-500 font-bold font-mono">BOT [BLOCKED]</span>
									</div>
									<div className="flex items-center justify-between text-xs">
										<span className="text-muted-foreground">Submission from IP 2.11.88.4</span>
										<span className="text-emerald-500 font-bold font-mono">HUMAN [ACCEPTED]</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Comparison />
			<FinalCTA user={user} />
		</main>
	);
}
