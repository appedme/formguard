import Hero from "@/components/landing/hero";
import ProblemSolution from "@/components/landing/problem-solution";
import HowItWorks from "@/components/landing/how-it-works";
import AiSection from "@/components/landing/ai-section";
import Features from "@/components/landing/features";
import Pricing from "@/components/landing/pricing";
import FAQ from "@/components/landing/faq";
import FinalCTA from "@/components/landing/final-cta";
import { stackServerApp } from "@/stack/server";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "The Modern Form Backend for Developers",
	description: "The intelligent way to capture form submissions. Built-in AI spam protection, automated insights, and lightning-fast edge performance.",
};

export default async function LandingPage() {
	const user = await stackServerApp.getUser();

	return (
		<main>
			<Hero user={user} />
			<ProblemSolution />
			<HowItWorks />
			<AiSection />
			<Features />
			<Pricing />
			<FAQ />
			<FinalCTA user={user} />
		</main>
	);
}
