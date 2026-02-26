import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { 
    Terminal, 
    Bot, 
    ShieldCheck, 
    Zap, 
    Code2, 
    Cpu, 
    ArrowLeft, 
    Copy, 
    ExternalLink,
    CheckCircle2,
    Settings,
    Database,
    Webhook
} from "lucide-react";

export const metadata = {
	title: "MCP Integration Guide — FormGuard",
	description: "Connect your FormGuard account to AI agents using the Model Context Protocol. Full reference for Cursor, VSCode, and Windsurf.",
};

const tools = [
    {
        name: "list_forms",
        desc: "Returns a list of all your forms including their names and endpoint IDs.",
        args: "None"
    },
    {
        name: "create_form",
        desc: "Creates a new form endpoint. Useful for AI agents provisioning infrastructure.",
        args: "name: string"
    },
    {
        name: "get_form_details",
        desc: "Returns full configuration including webhooks and public page settings.",
        args: "endpointId: string"
    },
    {
        name: "update_form_settings",
        desc: "Update webhooks, Discord/Slack integrations, and auto-responders.",
        args: "endpointId: string, settings: Partial<FormSettings>"
    },
    {
        name: "get_recent_submissions",
        desc: "Fetches latest data entries for context-aware coding or analysis.",
        args: "endpointId: string, limit?: number"
    },
    {
        name: "get_ai_insights",
        desc: "Retrieves AI-generated sentiment and trend analysis for a form.",
        args: "endpointId: string"
    },
];

export default function McpDocsPage() {
	return (
		<div className="bg-background min-h-screen pb-32">
			{/* Status Bar */}
			<div className="bg-primary/10 border-b border-primary/20 py-2">
				<div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
						</span>
						<span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary/80">Server Status: Operational</span>
					</div>
					<div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-muted-foreground/60">
						<span>v1.1.0-stable</span>
						<span>SSE Transport enabled</span>
					</div>
				</div>
			</div>

			<section className="py-20">
				<div className="mx-auto max-w-6xl px-6">
					<Link 
						href="/docs" 
						className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12 group"
					>
						<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
						Back to Documentation
					</Link>

					<div className="max-w-3xl">
						<div className="flex items-center gap-3 mb-6">
							<div className="p-3 bg-primary/10 rounded-2xl">
								<Bot className="w-8 h-8 text-primary" />
							</div>
							<h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
								Model Context Protocol
							</h1>
						</div>
						<p className="text-xl text-muted-foreground leading-relaxed font-medium">
							Connect FormGuard to your AI agents to enable natural language management of your forms, data, and edge infrastructure.
						</p>
					</div>
				</div>
			</section>

			<div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
				{/* Main Guide Content */}
				<div className="lg:col-span-8 space-y-24">
					{/* Overview */}
					<section id="concepts" className="space-y-8">
						<div className="space-y-4">
							<h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
								<Cpu className="w-6 h-6 text-primary/40" />
								Core Concepts
							</h2>
							<p className="text-foreground/70 leading-relaxed">
								FormGuard&apos;s MCP implementation uses a secure **SSE (Server-Sent Events)** transport. This allows AI agents like Cursor or VSCode to call specialized tools that interact with your FormGuard account. Whether it&apos;s provisioning a new form or fetching submission context for a bug fix, MCP makes your workflow AI-native.
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="p-6 bg-muted/30 border border-border/40 rounded-2xl space-y-3">
								<ShieldCheck className="w-5 h-5 text-primary" />
								<h3 className="font-bold text-foreground">Secure SSE</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">Standard SSE protocol ensuring compatibility with all major AI editors without complex proxying.</p>
							</div>
							<div className="p-6 bg-muted/30 border border-border/40 rounded-2xl space-y-3">
								<Database className="w-5 h-5 text-primary" />
								<h3 className="font-bold text-foreground">Live Context</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">Provide LLMs with real-time submission data to help them generate better frontend components and logic.</p>
							</div>
						</div>
					</section>

					{/* Tool Reference */}
					<section id="tools" className="space-y-8">
						<div className="space-y-4">
							<h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
								<Code2 className="w-6 h-6 text-primary/40" />
								Server Tool Reference
							</h2>
							<p className="text-foreground/70 leading-relaxed">
								The following tools are available to any agent connected with a valid API key.
							</p>
						</div>

						<div className="space-y-4">
							{tools.map(tool => (
								<div key={tool.name} className="p-6 bg-card border border-border/40 hover:border-primary/20 transition-all group rounded-2xl">
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-mono text-xs font-bold border border-primary/10">
												/
											</div>
											<h4 className="font-mono text-sm font-black text-foreground">{tool.name}</h4>
										</div>
										<span className="text-[10px] font-mono bg-muted px-2 py-1 rounded text-muted-foreground uppercase tracking-widest">
											Args: {tool.args}
										</span>
									</div>
									<p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
								</div>
							))}
						</div>
					</section>

					{/* Integration Block */}
					<section id="integration" className="space-y-8">
						<div className="space-y-4">
							<h2 className="text-2xl font-black tracking-tight">Setup Instructions</h2>
							<p className="text-foreground/70 leading-relaxed">Follow these steps to integrate FormGuard with Cursor, VSCode, or Windsurf.</p>
						</div>

						<div className="space-y-12">
							<div className="relative pl-8 border-l-2 border-border/40 space-y-4">
								<div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
								<h4 className="font-black text-foreground">1. Generate your API Key</h4>
								<p className="text-sm text-muted-foreground">Go to your <Link href="/dashboard/mcp" className="text-primary hover:underline font-bold italic">MCP Dashboard</Link> and create a new key. Copy it immediately as it won&apos;t be shown again.</p>
							</div>

							<div className="relative pl-8 border-l-2 border-border/40 space-y-4">
								<div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
								<h4 className="font-black text-foreground">2. Add to your IDE</h4>
								<div className="bg-foreground text-background p-6 rounded-2xl space-y-4 shadow-xl">
									<div className="flex items-center justify-between">
										<div className="flex gap-2">
											<div className="w-3 h-3 rounded-full bg-red-500/20" />
											<div className="w-3 h-3 rounded-full bg-yellow-500/20" />
											<div className="w-3 h-3 rounded-full bg-green-500/20" />
										</div>
										<span className="text-[10px] font-mono text-background/40">cursor-settings.json</span>
									</div>
									<pre className="font-mono text-xs leading-relaxed text-background/80 overflow-x-auto">
{`{
  "mcpServers": {
    "formguard": {
      "type": "sse",
      "url": "https://formguard.strivio.world/api/mcp",
      "headers": {
        "x-api-key": "YOUR_FG_KEY_HERE"
      }
    }
  }
}`}
									</pre>
								</div>
								
								<div className="bg-foreground text-background p-6 rounded-2xl space-y-4 shadow-xl">
									<div className="flex items-center justify-between">
										<p className="text-[10px] font-mono text-background/40 uppercase tracking-widest">Stdio (via mcp-remote)</p>
										<Badge variant="outline" className="text-[8px] border-background/20 text-background/60">Universal</Badge>
									</div>
									<pre className="font-mono text-xs leading-relaxed text-background/80 overflow-x-auto">
{`"formguard": {
  "command": "npx",
  "args": [
    "-y", "mcp-remote@latest",
    "https://formguard.strivio.world/api/mcp",
    "--header", "x-api-key:YOUR_KEY"
  ]
}`}
									</pre>
								</div>
							</div>

							<div className="relative pl-8 border-l-2 border-border/40 space-y-4">
								<div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
								<h4 className="font-black text-foreground">3. Verify Connection</h4>
								<p className="text-sm text-muted-foreground italic">Ask your agent: &quot;List all my FormGuard forms and check the &apos;Product Beta&apos; form for recent activity.&quot;</p>
							</div>
						</div>
					</section>
				</div>

				{/* Right Sidebar - Sticky Shortcuts */}
				<aside className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-8">
					<div className="p-8 bg-muted/20 border border-border/40 rounded-3xl space-y-6">
						<h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground/60">Endpoints</h3>
						<div className="space-y-4">
							<div className="group">
								<label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Base URL</label>
								<div className="flex items-center gap-2 p-3 bg-background border border-border/40 rounded-xl group-hover:border-primary/20 transition-colors">
									<code className="text-xs font-mono truncate text-foreground/70">https://formguard.strivio.world/api/mcp</code>
									<Copy className="w-3.5 h-3.5 text-muted-foreground/30 hover:text-primary cursor-pointer shrink-0" />
								</div>
							</div>
							<div className="group">
								<label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Auth Header</label>
								<div className="flex items-center gap-2 p-3 bg-background border border-border/40 rounded-xl group-hover:border-primary/20 transition-colors">
									<code className="text-xs font-mono text-foreground/70">x-api-key</code>
								</div>
							</div>
						</div>
					</div>

					<div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
						<div className="flex items-center gap-2 text-primary">
							<Zap className="w-4 h-4 fill-current" />
							<h3 className="font-black text-sm uppercase tracking-widest">Developer Quicklinks</h3>
						</div>
						<div className="space-y-2">
							<Link href="/dashboard/mcp" className="flex items-center justify-between text-sm group hover:text-primary transition-colors py-1">
								<span>Generate Keys</span>
								<ExternalLink className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
							</Link>
							<Link href="/docs#api" className="flex items-center justify-between text-sm group hover:text-primary transition-colors py-1">
								<span>Standard API Reference</span>
								<ExternalLink className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
							</Link>
							<Link href="/llms.txt" className="flex items-center justify-between text-sm group hover:text-primary transition-colors py-1">
								<span>Technical Context (LLMs)</span>
								<ExternalLink className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
							</Link>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
