"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
	Bot,
	Key,
	Plus,
	Trash2,
	Copy,
	Check,
	ShieldCheck,
	Terminal,
	ExternalLink,
	Zap,
	ChevronRight,
} from "lucide-react";
import { createApiKey, deleteApiKey } from "@/db/actions/api-key.actions";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";

interface ApiKey {
	id: string;
	name: string;
	key: string;
	createdAt: Date;
	lastUsedAt: Date | null;
}

interface McpClientProps {
	initialKeys: ApiKey[];
	userId: string;
}

const TOOLS = [
	{ name: "list_forms", desc: "List all your forms and their endpoints" },
	{ name: "create_form", desc: "Provision a new form with a unique ID" },
	{ name: "get_recent_submissions", desc: "Fetch the latest submissions for any form" },
	{ name: "update_form_settings", desc: "Configure webhooks, redirects, integrations" },
	{ name: "get_ai_insights", desc: "Retrieve AI-generated summaries and analysis" },
	{ name: "delete_form", desc: "Permanently remove a form and its data" },
];

export function McpClient({ initialKeys, userId }: McpClientProps) {
	const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
	const [newKeyName, setNewKeyName] = useState("");
	const [creating, setCreating] = useState(false);
	const [copied, setCopied] = useState<string | null>(null);

	const origin = typeof window !== "undefined" ? window.location.origin : "https://formguard.strivio.world";
	const mcpEndpoint = `${origin}/api/mcp`;

	const handleCreateKey = async () => {
		if (!newKeyName.trim()) {
			toast.error("Please enter a name for the key");
			return;
		}
		setCreating(true);
		try {
			const newKey = await createApiKey(userId, newKeyName);
			setKeys([...keys, newKey]);
			setNewKeyName("");
			toast.success("API Key created!");
		} catch {
			toast.error("Failed to create API key");
		} finally {
			setCreating(false);
		}
	};

	const handleDeleteKey = async (id: string) => {
		try {
			await deleteApiKey(userId, id);
			setKeys(keys.filter((k) => k.id !== id));
			toast.success("Key deleted");
		} catch {
			toast.error("Failed to delete API key");
		}
	};

	const copy = (text: string, id: string) => {
		navigator.clipboard.writeText(text);
		setCopied(id);
		setTimeout(() => setCopied(null), 2000);
	};

	const firstKey = keys[0];

	const stdioConfig = (key?: string) => JSON.stringify({
		mcpServers: {
			formguard: {
				command: "npx",
				args: [
					"-y", "mcp-remote@latest",
					mcpEndpoint,
					"--header", `x-api-key:${key ?? "YOUR_API_KEY"}`
				]
			}
		}
	}, null, 2);

	return (
		<div className="space-y-8">

			{/* Step 1 — API Keys */}
			<section>
				<div className="flex items-center gap-3 mb-5">
					<div className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-black shrink-0">1</div>
					<h2 className="text-sm font-semibold tracking-tight">Generate an API Key</h2>
					<div className="h-px flex-1 bg-border/40" />
					<Link href="/docs/mcp">
						<Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1 h-7">
							Docs <ExternalLink className="w-3 h-3" />
						</Button>
					</Link>
				</div>

				<div className="grid md:grid-cols-12 gap-6">
					{/* Create form */}
					<div className="md:col-span-4">
						<Card className="border-border/40 shadow-none rounded-2xl h-full">
							<CardHeader className="p-5 pb-4">
								<CardTitle className="text-sm font-semibold flex items-center gap-2">
									<Key className="w-4 h-4 text-muted-foreground" />
									New Key
								</CardTitle>
								<CardDescription className="text-xs">
									Give it a descriptive name, e.g. <em>"Cursor — Laptop"</em>.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-5 pt-0 space-y-3">
								<Input
									placeholder="My AI Agent"
									className="h-9 rounded-xl bg-muted/20 border-border/40 text-sm"
									value={newKeyName}
									onChange={(e) => setNewKeyName(e.target.value)}
									onKeyDown={(e) => e.key === "Enter" && handleCreateKey()}
								/>
								<Button
									className="w-full h-9 rounded-xl text-xs font-semibold"
									disabled={creating}
									onClick={handleCreateKey}
								>
									{creating ? "Creating…" : <><Plus className="w-3.5 h-3.5 mr-1.5" /> Generate Key</>}
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* Keys list */}
					<div className="md:col-span-8">
						{keys.length === 0 ? (
							<div className="h-full min-h-[140px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/40 bg-muted/5 text-center p-8">
								<ShieldCheck className="w-8 h-8 text-muted-foreground/30 mb-3" />
								<p className="text-sm font-medium text-foreground mb-1">No API keys yet</p>
								<p className="text-xs text-muted-foreground">Create a key to connect your AI tools.</p>
							</div>
						) : (
							<div className="space-y-2">
								{keys.map((k) => (
									<div
										key={k.id}
										className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-border/40 bg-card/50 group hover:border-border transition-colors"
									>
										<div className="flex items-center gap-3 min-w-0">
											<div className="p-2 bg-primary/10 rounded-xl shrink-0">
												<Bot className="w-4 h-4 text-primary" />
											</div>
											<div className="min-w-0">
												<p className="text-sm font-semibold truncate">{k.name}</p>
												<div className="flex items-center gap-2 mt-0.5">
													<code className="text-[10px] font-mono text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded border border-border/30">
														{k.key.substring(0, 10)}••••••••
													</code>
													<button
														onClick={() => copy(k.key, k.id)}
														className="text-muted-foreground hover:text-foreground transition-colors"
													>
														{copied === k.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
													</button>
												</div>
											</div>
										</div>
										<div className="flex items-center gap-4 shrink-0">
											<div className="hidden sm:block text-right">
												<p className="text-[9px] uppercase tracking-widest text-muted-foreground/50 font-bold">Last used</p>
												<p className={`text-[10px] font-semibold ${k.lastUsedAt ? "text-emerald-500" : "text-muted-foreground"}`}>
													{k.lastUsedAt ? format(new Date(k.lastUsedAt), "MMM d, HH:mm") : "Never"}
												</p>
											</div>
											<button
												onClick={() => handleDeleteKey(k.id)}
												className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
											>
												<Trash2 className="w-3.5 h-3.5" />
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Step 2 — Connect */}
			<section>
				<div className="flex items-center gap-3 mb-5">
					<div className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-black shrink-0">2</div>
					<h2 className="text-sm font-semibold tracking-tight">Add to Your IDE</h2>
					<div className="h-px flex-1 bg-border/40" />
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					{/* Cursor / mcp-remote */}
					<Card className="border-border/40 shadow-none rounded-2xl overflow-hidden">
						<div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/20">
							<div className="flex items-center gap-2.5">
								<div className="w-7 h-7 rounded-lg bg-background border border-border/40 flex items-center justify-center">
									<Terminal className="w-3.5 h-3.5 text-blue-500" />
								</div>
								<p className="text-sm font-semibold">Cursor / VSCode / Windsurf</p>
							</div>
							<Badge variant="outline" className="text-[9px] uppercase tracking-widest font-bold rounded-full px-2">Recommended</Badge>
						</div>
						<CardContent className="p-5 space-y-4">
							<p className="text-xs text-muted-foreground leading-relaxed">
								Paste this into your <code className="text-foreground bg-muted px-1 py-0.5 rounded text-[10px]">mcp_config.json</code> (or Cursor's MCP settings):
							</p>
							<div className="relative rounded-xl overflow-hidden border border-border/40">
								<div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-white/5">
									<span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">mcp_config.json</span>
									<button
										onClick={() => copy(stdioConfig(firstKey?.key), "stdio")}
										className="flex items-center gap-1.5 text-[10px] text-zinc-400 hover:text-white transition-colors"
									>
										{copied === "stdio" ? <><Check className="w-3 h-3 text-green-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
									</button>
								</div>
								<pre className="p-4 bg-zinc-950 text-[10px] text-zinc-300 font-mono leading-relaxed overflow-x-auto">
									{stdioConfig(firstKey?.key)}
								</pre>
							</div>
							{!firstKey && (
								<p className="text-[10px] text-amber-500/80 font-medium">↑ Generate an API key above to auto-fill your key here.</p>
							)}
							<a href="https://cursor.com/mcp" target="_blank" rel="noopener noreferrer">
								<Button variant="outline" size="sm" className="w-full rounded-xl h-9 text-xs border-border/40 gap-1.5">
									Cursor MCP Docs <ExternalLink className="w-3 h-3" />
								</Button>
							</a>
						</CardContent>
					</Card>

					{/* Native SSE */}
					<Card className="border-border/40 shadow-none rounded-2xl overflow-hidden">
						<div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/20">
							<div className="flex items-center gap-2.5">
								<div className="w-7 h-7 rounded-lg bg-background border border-border/40 flex items-center justify-center">
									<Zap className="w-3.5 h-3.5 text-amber-500" />
								</div>
								<p className="text-sm font-semibold">Direct HTTP (Advanced)</p>
							</div>
							<Badge variant="secondary" className="text-[9px] uppercase tracking-widest font-bold rounded-full px-2">Expert</Badge>
						</div>
						<CardContent className="p-5 space-y-4">
							<p className="text-xs text-muted-foreground leading-relaxed">
								Point any MCP-compatible client directly at the endpoint with your API key as a header.
							</p>
							<div className="space-y-2">
								<div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border/40">
									<div>
										<p className="text-[9px] uppercase tracking-widest text-muted-foreground/60 font-bold mb-0.5">Endpoint URL</p>
										<code className="text-[11px] font-mono text-foreground">{mcpEndpoint}</code>
									</div>
									<button onClick={() => copy(mcpEndpoint, "url")} className="text-muted-foreground hover:text-foreground transition-colors ml-3 shrink-0">
										{copied === "url" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
									</button>
								</div>
								<div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border/40">
									<div>
										<p className="text-[9px] uppercase tracking-widest text-muted-foreground/60 font-bold mb-0.5">Auth Header</p>
										<code className="text-[11px] font-mono text-foreground">x-api-key: <span className="text-primary">{firstKey?.key.substring(0,14) ?? "YOUR_API_KEY"}…</span></code>
									</div>
								</div>
							</div>
							<a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">
								<Button variant="outline" size="sm" className="w-full rounded-xl h-9 text-xs border-border/40 gap-1.5">
									MCP Protocol Docs <ExternalLink className="w-3 h-3" />
								</Button>
							</a>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Step 3 — Available Tools */}
			<section>
				<div className="flex items-center gap-3 mb-5">
					<div className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-black shrink-0">3</div>
					<h2 className="text-sm font-semibold tracking-tight">Available Tools</h2>
					<div className="h-px flex-1 bg-border/40" />
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
					{TOOLS.map((t) => (
						<div key={t.name} className="flex items-start gap-3 p-4 rounded-2xl border border-border/40 bg-card/50 hover:border-border transition-colors">
							<ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
							<div>
								<code className="text-xs font-mono font-bold text-foreground">{t.name}</code>
								<p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{t.desc}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CTA */}
			<div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
						<Bot className="w-5 h-5 text-primary" />
					</div>
					<div>
						<p className="text-sm font-semibold">Full MCP Documentation</p>
						<p className="text-xs text-muted-foreground mt-0.5">Workflows, examples, and advanced agent setup guides.</p>
					</div>
				</div>
				<Link href="/docs/mcp">
					<Button size="sm" className="rounded-xl px-5 font-semibold text-xs shrink-0">
						Read the Docs <ExternalLink className="w-3 h-3 ml-1.5" />
					</Button>
				</Link>
			</div>
		</div>
	);
}
