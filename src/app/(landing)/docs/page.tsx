import Link from "next/link";
import { Terminal, Globe, ShieldCheck, Zap, Code2, BookOpen, Cpu, ArrowRight, Bot } from "lucide-react";

export const metadata = {
	title: "Docs — FormGuard",
	description: "Comprehensive developer documentation for FormGuard infrastructure. Integration guides, API reference, and edge security.",
};

const sections = [
	{
		id: "quickstart",
		title: "Quickstart",
		icon: Zap,
		content: "Get FormGuard running in your application in less than 60 seconds. No complex configuration required.",
		codeExamples: [
			{
				lang: "HTML",
				title: "Standard HTML Form",
				code: `<form action="https://formguard.unstory.app/api/submit/YOUR_ENDPOINT_ID" method="POST">
  <input type="email" name="email" required placeholder="Your email" />
  <textarea name="message" required placeholder="Your message"></textarea>
  <button type="submit">Send</button>
</form>`
			},
			{
				lang: "Next.js",
				title: "React / Next.js Fetch",
				code: `const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const res = await fetch('https://formguard.unstory.app/api/submit/YOUR_ID', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  
  if (res.ok) alert('Success!');
};`
			}
		]
	},
	{
		id: "spam-protection",
		title: "Invisible Spam Protection",
		icon: ShieldCheck,
		content: "FormGuard uses advanced AI and behavioral analysis to stop 99% of bots without ever showing a CAPTCHA to your real users. It's completely invisible and works out of the box.",
		features: [
			"No puzzles for users",
			"AI-powered behavioral analysis",
			"Global threat intelligence",
			"Zero latency impact"
		]
	},
	{
		id: "api",
		title: "API Reference",
		icon: Terminal,
		content: "Our edge-native API is designed for high performance and reliability.",
		endpoints: [
			{
				method: "POST",
				path: "/api/submit/:id",
				desc: "Ingest form data. Supports multipart/form-data and application/json.",
				responses: [
					{ code: "201", desc: "Submission accepted and secured." },
					{ code: "403", desc: "Spam detected or invalid request." },
					{ code: "429", desc: "Rate limit exceeded." }
				]
			}
		]
	}
];

export default function DocsPage() {
	return (
		<div className="bg-background min-h-screen pb-24">
			{/* Hero Section */}
			<section className="py-24 border-b border-border bg-primary/5">
				<div className="mx-auto max-w-6xl px-6">
					<div className="flex items-center gap-2 mb-6">
						<div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
						<span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-bold">Developer Docs</span>
					</div>
					<h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground mb-8 leading-tight">
						Build faster with <br/><span className="text-primary italic pr-2">invisible</span> protection.
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-medium">
						Integrate premium spam protection into any form in seconds. No SDKs, no complex logic, just results.
					</p>
				</div>
			</section>

			<div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-4 gap-12 mt-16">
				{/* Sidebar Navigation */}
				<aside className="lg:col-span-1 hidden lg:block sticky top-32 h-fit">
					<nav className="space-y-1">
						<p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60 mb-6 px-2">Getting Started</p>
						{sections.map(s => (
							<a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all group">
								<s.icon className="w-4 h-4 transition-colors group-hover:text-primary" />
								{s.title}
							</a>
						))}
					</nav>
				</aside>

				{/* Main Content */}
				<main className="lg:col-span-3 space-y-32">
					{sections.map((section) => (
						<section key={section.id} id={section.id} className="scroll-mt-24">
							<div className="flex items-center gap-3 mb-8">
								<div className="p-2.5 bg-primary/10 rounded-xl">
									<section.icon className="w-5 h-5 text-primary" />
								</div>
								<h2 className="text-3xl font-black tracking-tight text-foreground">{section.title}</h2>
							</div>

							<div className="space-y-8">
								{section.content && <p className="text-lg text-muted-foreground leading-relaxed font-medium">{section.content}</p>}

								{section.codeExamples && (
									<div className="space-y-8">
										{section.codeExamples.map(example => (
											<div key={example.title} className="space-y-4">
												<h4 className="text-xs font-black uppercase tracking-widest text-foreground/60">{example.title}</h4>
												<div className="bg-secondary/30 rounded-2xl p-6 border border-border relative group overflow-hidden">
													<div className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground bg-background px-2 py-1 rounded border border-border">{example.lang}</div>
													<pre className="text-sm font-mono text-primary overflow-x-auto">
														{example.code}
													</pre>
												</div>
											</div>
										))}
									</div>
								)}

								{section.features && (
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
										{section.features.map(f => (
											<div key={f} className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl shadow-sm">
												<div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
													<CheckCircle2 className="w-4 h-4 text-primary" />
												</div>
												<span className="font-bold text-foreground/80 text-sm">{f}</span>
											</div>
										))}
									</div>
								)}

								{section.endpoints && (
									<div className="space-y-12">
										{section.endpoints.map(ep => (
											<div key={ep.path} className="space-y-6">
												<div className="flex items-center gap-4 font-mono">
													<span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-lg uppercase">POST</span>
													<span className="text-foreground font-black tracking-tight">{ep.path}</span>
												</div>
												<p className="text-muted-foreground font-medium">{ep.desc}</p>
												<div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
													<div className="px-6 py-3 border-b border-border bg-muted/30 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Response Codes</div>
													<div className="p-6 space-y-4">
														{ep.responses.map(r => (
															<div key={r.code} className="flex items-center gap-6 text-sm">
																<span className={`w-12 font-black ${r.code.startsWith('2') ? 'text-emerald-500' : 'text-red-500'}`}>{r.code}</span>
																<span className="text-muted-foreground font-medium">{r.desc}</span>
															</div>
														))}
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</section>
					))}

					{/* Support Footer */}
					<section className="pt-24 border-t border-border mt-24">
						<div className="bg-foreground text-background p-12 rounded-3xl relative overflow-hidden group shadow-2xl">
							<div className="relative z-10">
								<h3 className="text-3xl font-black mb-6">Need specialized help?</h3>
								<p className="text-background/60 text-lg max-w-md mb-10 font-medium">
									Our engineering team is available for custom integration support and enterprise solutions.
								</p>
								<Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-black text-sm rounded-xl hover:scale-105 transition-transform">
									Contact Engineering
									<ArrowRight className="w-4 h-4" />
								</Link>
							</div>
							<div className="absolute -right-12 -bottom-12 opacity-10 rotate-12 transition-transform group-hover:scale-110">
								<ShieldCheck className="w-64 h-64" />
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
