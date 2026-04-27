import Hero from "@/components/landing/hero";
import ProblemSolution from "@/components/landing/problem-solution";
import HowItWorks from "@/components/landing/how-it-works";
import AiSection from "@/components/landing/ai-section";
import Features from "@/components/landing/features";
import Testimonials from "@/components/landing/testimonials";
import Comparison from "@/components/landing/comparison";
import Pricing from "@/components/landing/pricing";
import FAQ from "@/components/landing/faq";
import FinalCTA from "@/components/landing/final-cta";
import { stackServerApp } from "@/stack/server";
import { JsonLd } from "@/components/seo/json-ld";
import { constructMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
    title: "Invisible Spam Protection for Modern Forms",
    description: "Stop 99% of spam submissions without CAPTCHAs. The developer-first alternative to reCAPTCHA."
});

export default async function LandingPage() {
	const user = await stackServerApp.getUser();

	return (
		<main className="bg-background">
            <JsonLd />
			<Hero user={user} />
            
            {/* Minimalist Section Spacing */}
            <div className="space-y-0">
			    <ProblemSolution />
			    <HowItWorks />
			    <Features />
			    <Comparison />
			    <Testimonials />
			    <Pricing />
			    <FAQ />
            </div>

			<FinalCTA user={user} />
		</main>
	);
}
