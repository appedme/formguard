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
			
			{/* Video Showcase at Bottom */}
			<section className="py-24 border-b border-border bg-background flex flex-col items-center justify-center px-6">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
						See FormGuard in Action
					</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						Watch how easy it is to set up a serverless form backend in less than 2 minutes.
					</p>
				</div>
				<div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-muted/20 relative aspect-video">
					<iframe 
						className="absolute top-0 left-0 w-full h-full"
						src="https://www.youtube.com/embed/u6Abofkznog?rel=0" 
						title="FormGuard Demo" 
						frameBorder="0" 
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
						referrerPolicy="strict-origin-when-cross-origin" 
						allowFullScreen
					></iframe>
				</div>
			</section>

			<FinalCTA user={user} />
		</main>
	);
}
