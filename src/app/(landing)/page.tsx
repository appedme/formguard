import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import SocialProof from "@/components/landing/social-proof";
import ProblemSolution from "@/components/landing/problem-solution";
import HowItWorks from "@/components/landing/how-it-works";
import Features from "@/components/landing/features";
import AiSection from "@/components/landing/ai-section";
import Pricing from "@/components/landing/pricing";
import FAQ from "@/components/landing/faq";
import FinalCTA from "@/components/landing/final-cta";
import Footer from "@/components/landing/footer";

export const runtime = "edge";

export default function LandingPage() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<SocialProof />
				<ProblemSolution />
				<HowItWorks />
				<Features />
				<AiSection />
				<Pricing />
				<FAQ />
				<FinalCTA />
			</main>
			<Footer />
		</>
	);
}
