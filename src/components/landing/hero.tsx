import Link from "next/link";
import { User } from "@stackframe/stack";
import { CheckCircle2, ShieldCheck, Zap, LayoutTemplate, ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
	user?: User | null;
}

export default function Hero({ user }: HeroProps) {
	return (
		<section className="relative pt-32 pb-24 overflow-hidden border-b border-border bg-background">
			{/* Decorative background elements */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-50" />
			</div>

			<div className="mx-auto max-w-6xl px-6 relative z-10 w-full">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left Content */}
					<div className="flex flex-col items-start text-left w-full">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
							<Sparkles className="w-4 h-4" />
							<span>New: Notion & Google Forms Themes</span>
						</div>
						
						<h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground mb-6">
							Stop 99% of spam in <span className="text-primary italic pr-2">60 seconds.</span>
						</h1>
						
						<p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
							The modern alternative to reCAPTCHA. Privacy-first, developer-friendly, and completely invisible to your real users. No more annoying puzzles.
						</p>

						<div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
							{user ? (
								<Link
									href="/dashboard"
									className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-8 text-base font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
								>
									Go to Dashboard
								</Link>
							) : (
								<Link
									href="/handler/sign-up"
									className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-8 text-base font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
								>
									Start Protecting Your Forms
									<ArrowRight className="w-4 h-4 ml-2" />
								</Link>
							)}
							<Link
								href="#pricing"
								className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-8 text-base font-semibold text-foreground bg-secondary/50 hover:bg-secondary rounded-lg transition-all"
							>
								Try it Free
							</Link>
						</div>

						<div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-sm font-medium text-muted-foreground mt-4">
							<div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> No credit card required</div>
							<div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Generous free tier</div>
							<div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Drop-in integration</div>
						</div>
					</div>

					{/* Right Value Props Visual */}
					<div className="relative w-full h-full min-h-[500px] hidden lg:block">
						{/* Background grid */}
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] rounded-3xl mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
						
						<div className="absolute left-6 top-1/2 -translate-y-1/2 w-full flex flex-col gap-5">
							{/* Card 1: Headless API */}
							<div className="bg-card backdrop-blur-xl border border-border/80 rounded-2xl p-6 shadow-2xl hover:-translate-y-1 transition-transform cursor-default bg-linear-to-br from-card to-secondary/30">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl mt-1">
										<Zap className="w-6 h-6" />
									</div>
									<div>
										<h3 className="text-lg font-bold text-foreground">API First Backend</h3>
										<p className="text-sm text-muted-foreground mt-1">Plug & play endpoint for your HTML forms. Zero server code required.</p>
									</div>
								</div>
							</div>

							{/* Card 2: Hosted Pages */}
							<div className="bg-card backdrop-blur-xl border border-border/80 rounded-2xl p-6 shadow-2xl ml-8 relative z-10 hover:-translate-y-1 transition-transform cursor-default bg-linear-to-br from-card to-secondary/30">
								<div className="flex items-start gap-4 mb-4">
									<div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl mt-1">
										<LayoutTemplate className="w-6 h-6" />
									</div>
									<div>
										<h3 className="text-lg font-bold text-foreground">Beautiful Public Pages</h3>
										<p className="text-sm text-muted-foreground mt-1">Instantly host forms if you don't have a UI. Full library of premium styles.</p>
									</div>
								</div>
								<div className="flex flex-wrap gap-2 pl-18">
									<span className="px-2 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-md">Request a custom theme!</span>
									<span className="px-2 py-1 text-xs font-semibold bg-muted rounded-md text-foreground">Formspree style</span>
									<span className="px-2 py-1 text-xs font-semibold bg-muted rounded-md text-foreground">Typeform styling</span>
									<span className="px-2 py-1 text-xs font-semibold bg-muted rounded-md text-foreground">Notion-like</span>
									<span className="px-2 py-1 text-xs font-semibold bg-muted rounded-md text-foreground">Google Forms</span>
									<span className="px-2 py-1 text-xs font-semibold bg-muted rounded-md text-foreground">MS Word</span>
									<span className="px-2 py-1 text-xs font-semibold bg-muted rounded-md text-foreground">Minimal</span>
									<span className="px-2 py-1 text-xs font-medium text-muted-foreground border border-border rounded-md">New weekly</span>
								</div>
							</div>

							{/* Card 3: Spam Protection */}
							<div className="bg-card backdrop-blur-xl border border-border/80 rounded-2xl p-6 shadow-2xl ml-16 hover:-translate-y-1 transition-transform cursor-default bg-linear-to-br from-card to-secondary/30">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl mt-1">
										<ShieldCheck className="w-6 h-6" />
									</div>
									<div>
										<h3 className="text-lg font-bold text-foreground">Invisible Spam Protection</h3>
										<p className="text-sm text-muted-foreground mt-1">AI-powered bot filtering and analytics. Never solve a Captcha again.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
