"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
	Code2,
	Cpu,
	Zap,
	Download
} from "lucide-react";
import { createApiKey, deleteApiKey } from "@/db/actions/api-key.actions";
import { toast } from "sonner";
import { format } from "date-fns";

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

export function McpClient({ initialKeys, userId }: McpClientProps) {
	const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
	const [newKeyName, setNewKeyName] = useState("");
	const [creating, setCreating] = useState(false);
	const [copiedKey, setCopiedKey] = useState<string | null>(null);

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
			toast.success("API Key created successfully!");
		} catch (error) {
			toast.error("Failed to create API key");
		} finally {
			setCreating(false);
		}
	};

	const handleDeleteKey = async (id: string) => {
		try {
			await deleteApiKey(userId, id);
			setKeys(keys.filter((k) => k.id !== id));
			toast.success("API Key deleted");
		} catch (error) {
			toast.error("Failed to delete API key");
		}
	};

	const copyToClipboard = (text: string, id: string) => {
		navigator.clipboard.writeText(text);
		setCopiedKey(id);
		setTimeout(() => setCopiedKey(null), 2000);
		toast.success("Copied to clipboard!");
	};

	const generateCursorConfig = (key: string) => {
		const config = {
			mcpServers: {
				formguard: {
					command: "npx",
					args: ["-y", "@modelcontextprotocol/server-http", "--url", `${window.location.origin}/api/mcp`],
					env: {
						X_API_KEY: key
					}
				}
			}
		};
		return JSON.stringify(config, null, 2);
	};

	return (
		<div className="space-y-10">
			{/* Overview Section */}
			<div className="grid md:grid-cols-3 gap-6">
				<Card className="border-border/40 shadow-none bg-primary/5 rounded-2xl overflow-hidden relative group">
					<div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
						<Zap className="w-24 h-24" />
					</div>
					<CardHeader className="p-6">
						<h3 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Automate Tasks</h3>
						<CardTitle className="text-lg font-black">AI Agent Integration</CardTitle>
						<CardDescription className="text-xs font-medium leading-relaxed">Let AI agents like Cursor or Windsurf manage your forms, inspect submissions, and build integrations for you.</CardDescription>
					</CardHeader>
				</Card>

				<Card className="border-border/40 shadow-none bg-muted/20 rounded-2xl overflow-hidden relative group">
					<div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
						<Code2 className="w-24 h-24" />
					</div>
					<CardHeader className="p-6">
						<h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Standardized</h3>
						<CardTitle className="text-lg font-black">MCP Protocol</CardTitle>
						<CardDescription className="text-xs font-medium leading-relaxed">Built on the Model Context Protocol, ensuring compatibility with all modern AI development tools.</CardDescription>
					</CardHeader>
				</Card>

				<Card className="border-border/40 shadow-none bg-muted/20 rounded-2xl overflow-hidden relative group">
					<div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
						<ShieldCheck className="w-24 h-24" />
					</div>
					<CardHeader className="p-6">
						<h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Secure</h3>
						<CardTitle className="text-lg font-black">Scoped Access</CardTitle>
						<CardDescription className="text-xs font-medium leading-relaxed">Your data is secured behind API keys. Revoke access instantly by deleting keys from this dashboard.</CardDescription>
					</CardHeader>
				</Card>
			</div>

			{/* API Keys Management */}
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 flex-1 mr-4">
						1. Manage API Keys
						<Separator className="flex-1" />
					</h2>
				</div>

				<div className="grid md:grid-cols-12 gap-8">
					<div className="md:col-span-4 space-y-6">
						<Card className="border-border/40 shadow-none rounded-2xl">
							<CardHeader className="p-6">
								<CardTitle className="text-sm font-black uppercase tracking-tighter">Create New Key</CardTitle>
								<CardDescription className="text-[10px] font-medium">Use a descriptive name like &quot;Cursor Laptop&quot; or &quot;Production Bot&quot;.</CardDescription>
							</CardHeader>
							<CardContent className="p-6 pt-0 space-y-4">
								<div className="space-y-2">
									<Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Key Name</Label>
									<Input 
										placeholder="e.g. My AI Agent"
										className="h-10 bg-muted/20 border-border/40 rounded-xl focus:ring-primary/20"
										value={newKeyName}
										onChange={(e) => setNewKeyName(e.target.value)}
									/>
								</div>
								<Button 
									className="w-full h-10 rounded-xl font-bold text-xs bg-foreground text-background"
									disabled={creating}
									onClick={handleCreateKey}
								>
									{creating ? "Creating..." : <><Plus className="w-3.5 h-3.5 mr-1.5" /> Generate Key</>}
								</Button>
							</CardContent>
						</Card>
					</div>

					<div className="md:col-span-8 space-y-4">
						{keys.length === 0 ? (
							<div className="py-20 text-center bg-muted/5 rounded-3xl border-2 border-dashed border-border/40">
								<div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
									<Key className="w-5 h-5 text-muted-foreground" />
								</div>
								<p className="text-sm font-bold text-foreground">No active API keys</p>
								<p className="text-xs text-muted-foreground mt-1">Generate a key to start using the MCP server.</p>
							</div>
						) : (
							<div className="space-y-3">
								{keys.map((k) => (
									<Card key={k.id} className="border-border/40 shadow-none rounded-2xl group transition-all hover:border-primary/20">
										<div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
											<div className="flex items-center gap-4">
												<div className="p-2.5 bg-primary/10 rounded-xl text-primary">
													<Bot className="w-4 h-4" />
												</div>
												<div>
													<p className="text-sm font-black tracking-tight">{k.name}</p>
													<div className="flex items-center gap-2 mt-0.5">
														<p className="text-[10px] font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-border/40">
															{k.key.substring(0, 8)}••••••••••••••••
														</p>
														<Button 
															variant="ghost" 
															size="icon" 
															className="w-6 h-6 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
															onClick={() => copyToClipboard(k.key, k.id)}
														>
															{copiedKey === k.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
														</Button>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-6 pr-2">
												<div className="text-right hidden sm:block">
													<p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/40 leading-none mb-1">Created</p>
													<p className="text-[10px] font-bold">{format(new Date(k.createdAt), "MMM d, yyyy")}</p>
												</div>
												<div className="text-right hidden sm:block">
													<p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/40 leading-none mb-1">Last Used</p>
													<p className={`text-[10px] font-bold ${k.lastUsedAt ? 'text-emerald-500' : 'text-muted-foreground'}`}>
														{k.lastUsedAt ? format(new Date(k.lastUsedAt), "MMM d, HH:mm") : "Never"}
													</p>
												</div>
												<Button 
													variant="ghost" 
													size="icon" 
													className="w-9 h-9 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
													onClick={() => handleDeleteKey(k.id)}
												>
													<Trash2 className="w-4 h-4" />
												</Button>
											</div>
										</div>
									</Card>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Setup Instructions */}
			<div className="space-y-6">
				<h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 flex-1 mr-4">
					2. IDE Configuration
					<Separator className="flex-1" />
				</h2>

				<div className="grid md:grid-cols-2 gap-6">
					<Card className="border-border/40 shadow-none rounded-2xl overflow-hidden flex flex-col">
						<div className="bg-muted/30 p-4 flex items-center justify-between border-b border-border/40">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-border/40">
									<Terminal className="w-4 h-4 text-blue-500" />
								</div>
								<p className="text-sm font-bold">Cursor / VSCode</p>
							</div>
							<Badge variant="outline" className="text-[9px] uppercase font-black tracking-widest">Recommended</Badge>
						</div>
						<CardContent className="p-6 flex-1 flex flex-col">
							<ol className="list-decimal list-inside text-xs font-medium space-y-4 text-muted-foreground mb-6">
								<li>Open <span className="text-foreground font-black">Cursor Settings</span> and go to <span className="text-foreground font-black">General {'>'} MCP</span>.</li>
								<li>Click <span className="text-foreground font-black">+ Add New MCP Server</span>.</li>
								<li>Set Name to <span className="text-foreground font-black">FormGuard</span>.</li>
								<li>Set Type to <span className="text-foreground font-black">SSE</span>.</li>
								<li>URL: <span className="text-foreground font-black underline underline-offset-4">{typeof window !== 'undefined' ? `${window.location.origin}/api/mcp` : ""}</span></li>
								<li>Add Header: <span className="text-foreground font-black">x-api-key</span> = <span className="text-foreground font-black">[Your API Key]</span></li>
							</ol>

							<div className="mt-auto space-y-3">
								<div className="p-4 bg-muted/20 border border-border/40 rounded-xl space-y-3">
									<div className="flex items-center justify-between">
										<p className="text-[10px] font-black uppercase tracking-widest opacity-40">SSE Config (Native)</p>
										<Badge variant="outline" className="h-4 text-[8px] border-primary/20 text-primary px-1">Best Performance</Badge>
									</div>
									<p className="text-xs font-mono text-foreground/80 wrap-break-word leading-relaxed">
										URL: <span className="underline">{typeof window !== 'undefined' ? `${window.location.origin}/api/mcp` : ""}</span><br/>
										Header: <span className="font-bold text-primary">x-api-key</span>
									</p>
								</div>

								<div className="p-4 bg-zinc-950 rounded-xl border border-white/5 space-y-3">
									<div className="flex items-center justify-between">
										<p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Stdio Config (via mcp-remote)</p>
										<Badge variant="outline" className="h-4 text-[8px] border-zinc-700 text-zinc-400 px-1">Universal</Badge>
									</div>
									<pre className="text-[10px] font-mono text-zinc-300 leading-relaxed overflow-x-auto">
{`"formguard-servermcp-": {
  "command": "npx",
  "args": [
    "-y", "mcp-remote@latest",
    "${typeof window !== 'undefined' ? window.location.origin : ""}/api/mcp",
    "--header", "x-api-key:[YOUR_KEY]"
  ]
}`}
									</pre>
								</div>

								<Button variant="outline" className="w-full rounded-xl h-11 text-xs font-bold border-border/40" asChild>
									<a href="https://cursor.com/mcp" target="_blank" rel="noopener noreferrer">
										Learn more about Cursor MCP <ExternalLink className="w-3.5 h-3.5 ml-2" />
									</a>
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card className="border-border/40 shadow-none rounded-2xl overflow-hidden flex flex-col">
						<div className="bg-muted/30 p-4 flex items-center justify-between border-b border-border/40">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-border/40">
									<Cpu className="w-4 h-4 text-emerald-500" />
								</div>
								<p className="text-sm font-bold">Generic Client (JSON-RPC)</p>
							</div>
							<Badge variant="secondary" className="text-[9px] uppercase font-black tracking-widest">Expert</Badge>
						</div>
						<CardContent className="p-6 flex-1 flex flex-col">
							<p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">Direct Tool Usage</p>
							<div className="space-y-4">
								<div className="p-4 bg-zinc-950 rounded-xl border border-white/5 font-mono text-[10px] text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">
{`curl -X POST "${typeof window !== 'undefined' ? window.location.origin : ""}/api/mcp" \\
  -H "x-api-key: YOUR_KEY" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "list_forms",
      "arguments": {}
    },
    "id": 1
  }'`}
								</div>
								<div className="flex-1">
									<p className="text-xs font-medium text-muted-foreground leading-relaxed">
										You can also point any MCP-compatible agent directly to our SSE endpoint. This allows context-aware interaction with your entire FormGuard workspace.
									</p>
								</div>
								<Button variant="outline" className="w-full rounded-xl h-11 text-xs font-bold border-border/40" asChild>
									<a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">
										View MCP Documentation <ExternalLink className="w-3.5 h-3.5 ml-2" />
									</a>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Documentation Link */}
			<div className="pt-6">
				<Card className="border-primary/20 bg-primary/5 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
					<div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
						<Bot className="w-8 h-8 text-primary" />
					</div>
					<h2 className="text-2xl font-black mb-3">Want more power?</h2>
					<p className="text-sm text-muted-foreground max-w-lg mb-8 font-medium">
						Read our full guide on how to build automated workflows using FormGuard and AI agents. Learn how to trigger actions on new submissions and more.
					</p>
					<Button className="rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 transition-all hover:scale-105" asChild>
						<a href="/docs/mcp">
							Read MCP Add-in Docs
						</a>
					</Button>
				</Card>
			</div>
		</div>
	);
}
