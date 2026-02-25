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
import { stackServerApp } from "@/stack/server";

export const runtime = "edge";

export default async function LandingPage() {
	const user = await stackServerApp.getUser();

	return (
		<>
			<Navbar user={user} />
			<main>
				<Hero user={user} />
				<SocialProof />
				<ProblemSolution />
				<HowItWorks />
				<Features />
				<AiSection />
				<Pricing />
				<FAQ />
				<FinalCTA user={user} />
			</main>
			<Footer />
		</>
	);
}
