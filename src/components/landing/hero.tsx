import Link from "next/link";
import { User } from "@stackframe/stack";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";

interface HeroProps {
	user?: User | null;
}

export default function Hero({ user }: HeroProps) {
	return (
		<section className="relative pt-32 pb-20 overflow-hidden bg-background">
			{/* Subtler background glow */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
				<div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 blur-[120px] rounded-full opacity-60" />
			</div>

			<div className="mx-auto max-w-4xl px-6 text-center relative z-10">
				{/* Minimalist Badge */}
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-8">
					<ShieldCheck className="w-3 h-3 text-primary" />
					Invisible Spam Protection
				</div>
				
				<h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-foreground mb-8">
					Forms without <br />
					<span className="text-muted-foreground italic">the friction.</span>
				</h1>
				
				<p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
					Stop 99% of spam submissions with invisible, AI-powered protection. 
					The developer-first alternative to reCAPTCHA.
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
					{user ? (
						<Link
							href="/dashboard"
							className="h-14 px-10 inline-flex items-center justify-center bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/20"
						>
							Go to Dashboard
						</Link>
					) : (
						<Link
							href="/handler/sign-up"
							className="h-14 px-10 inline-flex items-center justify-center bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/20"
						>
							Start Protecting Your Forms
							<ArrowRight className="w-4 h-4 ml-2" />
						</Link>
					)}
					<Link
						href="#how-it-works"
						className="h-14 px-10 inline-flex items-center justify-center bg-secondary text-foreground font-bold rounded-full hover:bg-secondary/80 transition-colors"
					>
						See How it Works
					</Link>
				</div>

				{/* Minimal Trust Signals */}
				<div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-mono uppercase tracking-widest text-muted-foreground/60">
					<div className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> No CAPTCHAs</div>
					<div className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> 1-Min Setup</div>
					<div className="flex items-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> Privacy First</div>
				</div>
			</div>
		</section>
	);
}
