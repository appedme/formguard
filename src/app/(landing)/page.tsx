import Hero from "@/components/landing/hero";
import ProblemSolution from "@/components/landing/problem-solution";
import HowItWorks from "@/components/landing/how-it-works";
import AiSection from "@/components/landing/ai-section";
import Features from "@/components/landing/features";
import Testimonials from "@/components/landing/testimonials";
import Pricing from "@/components/landing/pricing";
import FAQ from "@/components/landing/faq";
import FinalCTA from "@/components/landing/final-cta";
import { stackServerApp } from "@/stack/server";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "FormGuard — The AI-Powered Form Backend for Developers",
	description: "Capture form submissions, block spam with AI, and generate insights — all at the edge. Google Sheets, Telegram, Notion integrations built-in. Free tier available.",
	openGraph: {
		title: "FormGuard — The AI-Powered Form Backend",
		description: "Capture form submissions, block spam with AI, and get insights — at the edge.",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "FormGuard — The AI-Powered Form Backend",
		description: "Form submissions, spam protection, AI insights — all at the edge.",
	},
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
			<Testimonials />
			<Pricing />
			<FAQ />
			<FinalCTA user={user} />
		</main>
	);
}
