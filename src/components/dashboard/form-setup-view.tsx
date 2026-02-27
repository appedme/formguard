"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
	Copy, 
	Check, 
	ShieldCheck, 
	Lock, 
	Terminal, 
	Globe, 
	Code2,
	ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { Highlight, themes } from "prism-react-renderer";

interface SetupViewProps {
	form: {
		id: string;
		endpointId: string;
		turnstileEnabled: boolean;
	};
}

export function FormSetupView({ form }: SetupViewProps) {
	const router = useRouter();
	const [copied, setCopied] = useState<string | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const [turnstileEnabled, setTurnstileEnabled] = useState(form.turnstileEnabled);

	const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
	const endpointUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/api/submit/${form.endpointId}`;

	function copyToClipboard(text: string, label: string) {
		navigator.clipboard.writeText(text);
		setCopied(label);
		setTimeout(() => setCopied(null), 2000);
	}

	async function handleToggleTurnstile() {
		setIsUpdating(true);
		try {
			const res = await fetch(`/api/forms/${form.id}/settings`, {
				method: "PATCH",
				body: JSON.stringify({ turnstileEnabled: !turnstileEnabled }),
			});

			if (res.ok) {
				setTurnstileEnabled(!turnstileEnabled);
				toast.success(`Spam protection ${!turnstileEnabled ? "enabled" : "disabled"}`);
				router.refresh();
			}
		} catch {
			toast.error("Failed to update settings");
		} finally {
			setIsUpdating(false);
		}
	}

	const snippets = [
		{
			label: "HTML Form",
			icon: Code2,
			lang: "markup",
			code: `<form action="${endpointUrl}" method="POST">
  <input name="email" type="email" placeholder="Email" required />
  <input name="message" type="text" placeholder="Message" />
  ${turnstileEnabled ? `\n  <!-- Turnstile Widget -->\n  <div class="cf-turnstile" data-sitekey="${turnstileSiteKey}"></div>\n  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>` : ""}
  <button type="submit">Submit</button>
</form>`
		},
		{
			label: "cURL",
			icon: Terminal,
			lang: "bash",
			code: `curl -X POST ${endpointUrl} \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","message":"Hello"}'`
		},
		{
			label: "JavaScript fetch",
			icon: Globe,
			lang: "javascript",
			code: `fetch("${endpointUrl}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "test@example.com", message: "Hello" }),
});`
		}
	];

	return (
		<div className="space-y-10">
			{/* Endpoint Header */}
			<section>
				<h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
					Your Endpoint 
					<div className="h-px bg-border/40 flex-1" />
				</h2>
				<div className="relative group overflow-hidden">
					<div className="absolute inset-y-0 right-0 flex items-center pr-3">
						<Button
							variant="ghost"
							size="icon"
							className="h-9 w-9 rounded-xl hover:bg-background shadow-sm"
							onClick={() => copyToClipboard(endpointUrl, "url")}
						>
							{copied === "url" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
						</Button>
					</div>
					<code className="block w-full bg-muted/30 border-2 border-border/40 rounded-2xl px-6 py-4 text-sm font-mono text-foreground font-bold overflow-x-auto pr-16 shadow-inner tracking-tight">
						{endpointUrl}
					</code>
				</div>
			</section>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
				{/* Integration Snippets */}
				<div className="lg:col-span-8 space-y-8">
					<section>
						<h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
							Integration Examples
							<div className="h-px bg-border/40 flex-1" />
						</h2>
						
						<div className="space-y-8">
							{snippets.map((snippet) => (
								<div key={snippet.label} className="group flex flex-col gap-3">
									<div className="flex items-center justify-between px-1">
										<div className="flex items-center gap-2.5">
											<div className="p-1.5 bg-muted rounded-lg">
												<snippet.icon className="w-3.5 h-3.5 text-muted-foreground" />
											</div>
											<span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{snippet.label}</span>
										</div>
										<Button
											variant="ghost"
											size="sm"
											className="h-8 px-3 text-[10px] font-black uppercase tracking-widest rounded-lg"
											onClick={() => copyToClipboard(snippet.code, snippet.label)}
										>
											{copied === snippet.label ? (
												<><Check className="w-3 h-3 mr-2 text-green-500" /> Copied</>
											) : (
												<><Copy className="w-3 h-3 mr-2" /> Copy</>
											)}
										</Button>
									</div>
									<div className="relative rounded-2xl border border-border/60 bg-muted/40 overflow-hidden shadow-sm">
										<Highlight
											theme={themes.vsDark}
											code={snippet.code}
											language={snippet.lang as any}
										>
											{({ className, style, tokens, getLineProps, getTokenProps }) => (
												<pre className="p-6 text-[11px] font-mono leading-relaxed overflow-x-auto scrollbar-hide" style={style}>
													{tokens.map((line, i) => (
														<div key={i} {...getLineProps({ line })}>
															{line.map((token, key) => (
																<span key={key} {...getTokenProps({ token })} />
															))}
														</div>
													))}
												</pre>
											)}
										</Highlight>
									</div>
								</div>
							))}
						</div>
					</section>
				</div>

				{/* Sidebar Settings (Spam Protec) */}
				<div className="lg:col-span-4 space-y-8">
					<section>
						<h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
							Quick Settings
							<div className="h-px bg-border/40 flex-1" />
						</h2>
						
						<Card className="border-border/60 shadow-none rounded-2xl overflow-hidden bg-card/50">
							<CardContent className="p-6 space-y-6">
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className={`p-2 rounded-xl transition-all ${turnstileEnabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
												<ShieldCheck className="w-4 h-4" />
											</div>
											<span className="text-xs font-black uppercase tracking-widest">Spam Protection</span>
										</div>
										<Switch 
											checked={turnstileEnabled} 
											onCheckedChange={handleToggleTurnstile}
											disabled={isUpdating}
										/>
									</div>
									<p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
										Powered by Cloudflare Turnstile. Invisible bot protection without CAPTCHAs.
									</p>
								</div>

								<div className="h-px bg-border/40" />

								<Button 
									variant="outline" 
									className="w-full h-11 rounded-xl text-xs font-black uppercase tracking-widest justify-between border-border/60 hover:bg-muted"
									onClick={() => window.open(endpointUrl, "_blank")}
								>
									<span className="flex items-center gap-2">
										<ExternalLink className="w-3.5 h-3.5" />
										Test endpoint
									</span>
									<span className="text-[10px] opacity-40">GET</span>
								</Button>
							</CardContent>
						</Card>

						{/* Quick Tips */}
						<div className="mt-8 p-6 bg-muted/20 border-2 border-dashed border-border/40 rounded-2xl">
							<h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
								<Lock className="w-3 h-3" />
								Security Tip
							</h4>
							<p className="text-[10px] text-muted-foreground leading-relaxed font-medium capitalize">
								Restrict submissions to specific domains in general settings to prevent unauthorized usage of your endpoint.
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
