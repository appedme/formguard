import Pricing from "@/components/landing/pricing";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import FAQ from "@/components/landing/faq";

export const metadata = {
	title: "Pricing — FormGuard",
	description: "Simple, transparent pricing. Free tier, Pro at ₹399/month, Growth at ₹999/month. Cancel anytime.",
};

export default function PricingPage() {
	return (
		<>
			<Navbar />
			<main>
				<section className="py-16 border-b border-border bg-background">
					<div className="mx-auto max-w-6xl px-6">
						<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
							Pricing
						</p>
						<h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
							Start free. Scale when ready.
						</h1>
						<p className="text-muted-foreground max-w-xl leading-relaxed">
							No credit card for the free plan. Razorpay secure billing on
							paid plans. Cancel anytime from the dashboard.
						</p>
					</div>
				</section>

				<Pricing />
				<FAQ />
			</main>
			<Footer />
		</>
	);
}
