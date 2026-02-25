import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export const metadata = {
	title: "Privacy Policy",
	description: "FormGuard Privacy Policy — how we collect, use, and protect your data.",
};

const sections = [
	{
		title: "What we collect",
		body: "We collect your email address and name during sign-up via StackAuth. For form submissions, we store only the raw payload sent by your users — nothing more.",
	},
	{
		title: "How we use it",
		body: "Your email is used for account identification and plan management. Submission data is used solely to provide the dashboard and AI insight features you've requested. We do not sell data.",
	},
	{
		title: "Data storage",
		body: "All data is stored in Cloudflare D1 databases, isolated per workspace. Cloudflare's infrastructure is SOC 2 compliant. Data resides in the region nearest to your users by default.",
	},
	{
		title: "Third-party services",
		body: "We use Razorpay for payment processing (their privacy policy applies to payment data), StackAuth for authentication, and Cloudflare for infrastructure. None of these services receive your form submission data.",
	},
	{
		title: "Your rights",
		body: "You can delete your account and all associated data at any time from the dashboard. On deletion, all submission data and insights are permanently removed within 24 hours.",
	},
	{
		title: "Cookies",
		body: "We use only essential cookies for authentication. No tracking or advertising cookies.",
	},
	{
		title: "Contact",
		body: "Privacy questions: hello@strivio.world",
	},
];

export default function PrivacyPage() {
	return (
		<>
			<Navbar />
			<main>
				<section className="py-16 border-b border-border bg-background">
					<div className="mx-auto max-w-4xl px-6">
						<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
							Legal
						</p>
						<h1 className="text-4xl font-black text-foreground mb-4">
							Privacy Policy
						</h1>
						<p className="text-muted-foreground text-sm font-mono">
							Last updated: February 2026
						</p>
					</div>
				</section>

				<section className="py-16 bg-background">
					<div className="mx-auto max-w-4xl px-6 space-y-10">
						{sections.map((s) => (
							<div key={s.title} className="border-b border-border pb-10 last:border-0">
								<h2 className="text-lg font-bold text-foreground mb-3">{s.title}</h2>
								<p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
							</div>
						))}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
