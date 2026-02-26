import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export const metadata = {
	title: "Docs",
	description: "FormGuard documentation — integration guides, API reference, and examples.",
};

const sections = [
	{
		title: "Quick Start",
		items: [
			{ label: "1. Sign up and create a form", desc: "Create an account, hit + Create Form, and copy your unique endpoint URL." },
			{ label: "2. Add your endpoint to an HTML form", desc: 'Set action="https://formguard.strivio.world/api/submit/YOUR_ID" method="POST".' },
			{ label: "3. Submit test data", desc: "Fill and submit the form. See the submission appear in your dashboard instantly." },
			{ label: "4. Generate insight", desc: 'Click "Generate Insight" to run the AI model against all collected submissions.' },
		],
	},
	{
		title: "API Reference",
		items: [
			{ label: "POST /api/submit/:endpoint_id", desc: "Accept any JSON or form-data payload. Returns 200 on success, 429 on rate limit, 403 on spam block." },
			{ label: "GET /api/forms/:id/submissions", desc: "Fetch paginated submissions for a form. Requires Bearer token." },
			{ label: "POST /api/forms/:id/insight", desc: "Trigger on-demand AI insight generation. Pro/Growth plans only." },
		],
	},
	{
		title: "Integrations",
		items: [
			{ label: "Plain HTML", desc: '<form action="…" method="POST"> with any input fields you like.' },
			{ label: "React / Next.js", desc: "Use fetch() or axios to POST form data to your endpoint from client-side or server-side." },
			{ label: "App Integrations", desc: "Connect your forms directly to Notion, Google Sheets, Slack, and 100+ more apps via our automated connectors." },
			{ label: "Webhooks", desc: "Configure outgoing webhooks per form to push submissions to any custom HTTPS endpoint." },
		],
	},
	{
		title: "AI & LLM Assisted Development",
		items: [
			{ label: "llms.txt", desc: "We provide a machine-readable technical overview of our entire infrastructure, setup, and usage patterns. Ideal for AI coding assistants and documentation scrapers." },
			{ label: "Full Context URL", desc: "https://formguard.strivio.world/llms.txt" },
		],
	},
];

export default function DocsPage() {
	return (
		<>
			<Navbar />
			<main>
				<section className="py-16 border-b border-border bg-background">
					<div className="mx-auto max-w-6xl px-6">
						<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
							Documentation
						</p>
						<h1 className="text-4xl font-black text-foreground mb-4">
							Get started in minutes.
						</h1>
						<p className="text-muted-foreground">
							Everything you need to integrate FormGuard into your project.
						</p>
					</div>
				</section>

				{sections.map((section) => (
					<section key={section.title} className="py-16 border-b border-border bg-background">
						<div className="mx-auto max-w-6xl px-6">
							<h2 className="text-xl font-black text-foreground mb-8">{section.title}</h2>
							<div className="space-y-6">
								{section.items.map((item) => (
									<div key={item.label} className="border border-border p-6 bg-card">
										<h3 className="font-mono text-sm font-bold text-foreground mb-2">{item.label}</h3>
										<p className="text-sm text-muted-foreground">{item.desc}</p>
									</div>
								))}
							</div>
						</div>
					</section>
				))}
			</main>
			<Footer />
		</>
	);
}
