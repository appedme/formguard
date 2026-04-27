import Link from "next/link";
import { User } from "@stackframe/stack";

interface FinalCTAProps {
	user?: User | null;
}

export default function FinalCTA({ user }: FinalCTAProps) {
	return (
		// Always-dark section — inverted for maximum impact
		<div className="dark">
			<section className="py-32 border-b border-border bg-background relative overflow-hidden">
				{/* Background glow */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-50" />
				
				<div className="mx-auto max-w-6xl px-6 text-center relative z-10">
					<p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-8 font-bold">
						Ready to end the spam?
					</p>
					<h2 className="text-5xl md:text-7xl font-black text-foreground mb-8 leading-[1.1] tracking-tight">
						Protect your forms
						<br />
						<span className="text-muted-foreground italic">in the next 60 seconds.</span>
					</h2>
					<p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto font-medium">
						Join hundreds of developers who have replaced reCAPTCHA with FormGuard for better conversion and zero friction.
					</p>
					{user ? (
						<Link
							href="/dashboard"
							className="inline-flex items-center justify-center h-16 px-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-xl shadow-xl shadow-primary/20"
						>
							Go to Dashboard
						</Link>
					) : (
						<div className="flex flex-col items-center gap-6">
							<Link
								href="/handler/sign-up"
								data-cta="start-free-final"
								className="inline-flex items-center justify-center h-16 px-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-xl shadow-xl shadow-primary/20"
							>
								Start Protecting Your Forms
							</Link>
							<p className="text-muted-foreground text-sm font-mono uppercase tracking-widest">
								Free forever tier · No credit card required
							</p>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
