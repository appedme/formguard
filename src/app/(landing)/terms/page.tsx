import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export const metadata = {
	title: "Terms of Service",
	description: "FormGuard Terms of Service.",
};

const sections = [
	{
		title: "1. Acceptance of Terms",
		body: "By accessing and using FormGuard, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.",
	},
	{
		title: "2. Service Description",
		body: "FormGuard provides edge-based form submission processing, spam filtering, and AI-powered insight generation. The service is provided 'as is' and may be modified or discontinued at any time.",
	},
	{
		title: "3. User Responsibilities",
		body: "You are responsible for all data submitted through your form endpoints. You agree not to use FormGuard for illegal activity, spam distribution, or collection of sensitive personal data without appropriate disclosures.",
	},
	{
		title: "4. Free and Paid Plans",
		body: "Free plans are subject to usage limits and may be changed at any time. Paid plans are billed via Dodo Payments and can be cancelled at any time from the dashboard with no further charges.",
	},
	{
		title: "5. Data Retention",
		body: "Submission data is stored in isolated Cloudflare D1 databases. FormGuard does not share your submission data with third parties. You may delete your data at any time from the dashboard.",
	},
	{
		title: "6. Limitation of Liability",
		body: "FormGuard is not liable for any indirect, incidental, or consequential damages arising from use of the service. Maximum liability is limited to the amount paid in the last 30 days.",
	},
	{
		title: "7. Changes to Terms",
		body: "We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.",
	},
	{
		title: "8. Contact",
		body: "For questions about these terms, contact us at hello@strivio.world.",
	},
];

export default function TermsPage() {
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
							Terms of Service
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
