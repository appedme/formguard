import Link from "next/link";
import { User } from "@stackframe/stack";

interface FinalCTAProps {
	user?: User | null;
}

export default function FinalCTA({ user }: FinalCTAProps) {
	return (
		// Always-dark section — inverted for maximum impact
		<div className="dark">
			<section className="py-32 border-b border-border bg-background">
				<div className="mx-auto max-w-6xl px-6 text-center">
					<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8">
						Stop waiting. Start shipping.
					</p>
					<h2 className="text-5xl md:text-6xl font-black text-foreground mb-8 leading-tight">
						Ship forms faster
						<br />
						than your competitors.
					</h2>
					<p className="text-muted-foreground text-base mb-12 font-mono">
						No credit card required.
					</p>
					{user ? (
						<Link
							href="/dashboard"
							className="inline-flex items-center justify-center h-14 px-10 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
						>
							Go to Dashboard
						</Link>
					) : (
						<Link
							href="/handler/sign-up"
							data-cta="start-free-final"
							className="inline-flex items-center justify-center h-14 px-10 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
						>
							Start Free — Deploy in Minutes
						</Link>
					)}
				</div>
			</section>
		</div>
	);
}
