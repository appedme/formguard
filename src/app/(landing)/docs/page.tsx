import Link from "next/link";
import { Terminal, Globe, ShieldCheck, Zap, Code2, BookOpen, Cpu, ArrowRight } from "lucide-react";

export const metadata = {
	title: "Docs — FormGuard",
	description: "Comprehensive developer documentation for FormGuard infrastructure. Integration guides, API reference, and edge security.",
};

const sections = [
	{
		id: "overview",
		title: "Platform Overview",
		icon: Globe,
		content: "FormGuard is a high-performance, edge-native form backend designed for developers. It eliminates the need for managing server infrastructure, handling database migrations for form data, or writing custom spam protection logic.",
		features: [
			"Edge-native execution (Cloudflare Workers)",
			"Zero-config spam protection (Turnstile)",
			"AI-native insight engine (Gemini Pro)",
			"Serverless postgres persistence (Neon)"
		]
	},
	{
		id: "getting-started",
		title: "Quick Start Guide",
		icon: Zap,
		steps: [
			{ title: "Create your Form", desc: "Navigate to the dashboard and create a new form. This generates a unique, cryptographically secure Endpoint ID." },
			{ title: "Connect your UI", desc: 'Point your form action to our edge endpoint. No SDK or library installation required. Just standard HTML.' },
			{ title: "Validate Flow", desc: "Submit a test request. Your data is processed at the edge, checked for spam, and stored in milliseconds." }
		]
	},
	{
		id: "security",
		title: "Security & Spam Protection",
		icon: ShieldCheck,
		content: "FormGuard integrates Cloudflare Turnstile at the infrastructure level. This provides non-intrusive, puzzle-free CAPTCHA verification that executes before your data reaches our database.",
		setup: "Enable Turnstile in your form settings, then include the Turnstile widget in your HTML. Our edge workers verify the token before accepting the submission."
	},
	{
		id: "api",
		title: "Technical API Reference",
		icon: Terminal,
		endpoints: [
			{
				method: "POST",
				path: "/api/submit/:endpointId",
				desc: "Primary data ingestion endpoint. Supports JSON and multipart/form-data. Executed on the edge.",
				responses: [
					{ code: "201", desc: "Success. Returns submission ID and timestamp." },
					{ code: "403", desc: "Forbidden. Spam protection triggered or invalid Turnstile token." },
					{ code: "429", desc: "Rate limit exceeded (Global or per IP)." }
				]
			}
		]
	},
	{
		id: "ai",
		title: "AI Insight Engine",
		icon: Cpu,
		content: "Powered by Gemini 1.5 Flash. FormGuard analyzes the semantic content of your submissions to detect trends, sentiment, and common themes across hundreds of entries in seconds.",
		usage: "Available via the dashboard 'Generate Insight' button. Requires a Pro or Growth plan."
	}
];

export default function DocsPage() {
	return (
		<div className="bg-background min-h-screen pb-24">
			{/* Hero Section */}
			<section className="py-24 border-b border-border bg-muted/20">
				<div className="mx-auto max-w-6xl px-6">
					<div className="flex items-center gap-2 mb-6">
						<div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
						<span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/80">Developer Infrastructure</span>
					</div>
					<h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground mb-8 leading-tight">
						Infrastructure for <br/><span className="text-primary italic">modern</span> form backends.
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
						Complete documentation for integrating FormGuard into your stack. From simple HTML forms to complex edge-executed workflows.
					</p>
				</div>
			</section>

			<div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-4 gap-12 mt-16">
				{/* Sidebar Navigation */}
				<aside className="lg:col-span-1 hidden lg:block sticky top-32 h-fit">
					<nav className="space-y-1">
						<p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-4 px-2">Documentation</p>
						{sections.map(s => (
							<a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all group">
								<s.icon className="w-4 h-4 transition-colors group-hover:text-primary" />
								{s.title}
							</a>
						))}
						<div className="pt-8 border-t border-border mt-8 px-2 space-y-3">
							<Link href="/llms.txt" className="flex items-center gap-2 text-xs font-mono text-primary hover:underline">
								<Code2 className="w-3 h-3" />
								llms.txt (Full Technical Context)
							</Link>
							<a href="https://context7.com/llmstxt/formguard_strivio_world_llms_txt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono text-primary hover:underline">
								<Terminal className="w-3 h-3" />
								Get on Context7 MCP
							</a>
						</div>
					</nav>
				</aside>

				{/* Main Content */}
				<main className="lg:col-span-3 space-y-24">
					{sections.map((section) => (
						<section key={section.id} id={section.id} className="scroll-mt-24">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-primary/10 rounded-lg">
									<section.icon className="w-5 h-5 text-primary" />
								</div>
								<h2 className="text-2xl font-black tracking-tight text-foreground">{section.title}</h2>
							</div>

							<div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
								{section.content && <p className="text-base text-foreground/80 leading-7">{section.content}</p>}

								{section.features && (
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
										{section.features.map(f => (
											<div key={f} className="flex items-center gap-3 p-4 bg-muted/30 border border-border/40 rounded-xl">
												<ShieldCheck className="w-4 h-4 text-primary/60" />
												<span className="font-medium text-foreground/70">{f}</span>
											</div>
										))}
									</div>
								)}

								{section.steps && (
									<div className="space-y-4 mt-8">
										{section.steps.map((step, i) => (
											<div key={step.title} className="flex gap-4 p-6 bg-card border border-border group hover:border-primary/20 transition-colors">
												<span className="text-3xl font-black text-muted-foreground/20 group-hover:text-primary/20 transition-colors tabular-nums">{i + 1}</span>
												<div>
													<h4 className="font-bold text-foreground mb-1">{step.title}</h4>
													<p className="text-muted-foreground leading-relaxed">{step.desc}</p>
												</div>
											</div>
										))}
									</div>
								)}

								{section.endpoints && (
									<div className="space-y-8">
										{section.endpoints.map(ep => (
											<div key={ep.path} className="space-y-4">
												<div className="flex items-center gap-3 font-mono text-xs">
													<span className="px-2 py-1 bg-primary text-white font-bold rounded">POST</span>
													<span className="text-foreground font-bold tracking-tight">{ep.path}</span>
												</div>
												<p className="pl-2 border-l-2 border-primary/20">{ep.desc}</p>
												<div className="bg-card border border-border overflow-hidden rounded-xl">
													<div className="px-4 py-2 border-b border-border bg-muted/30 text-[10px] font-bold text-muted-foreground">RETURNS</div>
													<div className="p-4 space-y-2">
														{ep.responses.map(r => (
															<div key={r.code} className="flex items-center gap-4 text-xs">
																<span className={`w-8 font-bold ${r.code.startsWith('2') ? 'text-green-500' : 'text-red-500'}`}>{r.code}</span>
																<span className="text-muted-foreground">{r.desc}</span>
															</div>
														))}
													</div>
												</div>
											</div>
										))}
									</div>
								)}

								{section.usage && (
									<div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl mt-4">
										<p className="text-foreground/80 flex items-center gap-2 font-medium italic">
											<Zap className="w-4 h-4 text-primary" />
											{section.usage}
										</p>
									</div>
								)}
							</div>
						</section>
					))}

					{/* Integration Footer */}
					<section className="pt-16 border-t border-border mt-16 pb-32">
						<div className="bg-foreground text-background p-10 rounded-2xl relative overflow-hidden group">
							<div className="relative z-10">
								<h3 className="text-2xl font-black mb-4">Ready to automate?</h3>
								<p className="text-background/60 text-sm max-w-md mb-8">
									Connect your forms directly to your stack. Webhooks, Notion, Slack, and Sheets coming in v2.
								</p>
								<Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-black text-sm hover:scale-105 transition-transform">
									Go to Dashboard
									<ArrowRight className="w-4 h-4" />
								</Link>
							</div>
							<div className="absolute -right-20 -bottom-20 opacity-10 rotate-12 transition-transform group-hover:scale-110">
								<BookOpen className="w-80 h-80" />
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
