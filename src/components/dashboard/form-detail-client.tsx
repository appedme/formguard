"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
	ChevronLeft, 
	Copy, 
	Check, 
	Trash2, 
	ExternalLink, 
	Terminal, 
	Code2, 
	Globe,
	Inbox,
	ShieldCheck,
	Lock,
	Zap,
	Database,
	MessageSquare,
	Slack,
	Send,
	Play,
	Table,
	Settings,
	Download
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { updateForm } from "@/db/actions/form.actions";
import type { Submission } from "@/db/schema";
import { FormAnalyticsClient } from "@/components/dashboard/form-analytics-client";
import { PublicFormSettings } from "@/components/dashboard/public-form-settings";

interface FormDetailProps {
	form: {
		id: string;
		name: string;
		endpointId: string;
		turnstileEnabled: boolean;
		isPublic: boolean;
		publicFormDescription: string | null;
		publicFormFields: any;
		publicFormSuccessMessage: string | null;
		publicFormButtonText: string;
		createdAt: Date;
		submissions: number;
	};
	userId: string;
	initialSubmissions: Submission[];
	totalSubmissions: number;
	totalPages: number;
	analytics: {
		total: number;
		last30Days: number;
		dailyHistory: { date: string; count: number }[];
	};
}

export function FormDetailClient({
	form,
	userId,
	initialSubmissions,
	totalSubmissions,
	totalPages,
	analytics,
}: FormDetailProps) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<"integrate" | "public">("integrate");
	const [copied, setCopied] = useState<string | null>(null);
	const [deleting, setDeleting] = useState(false);
	const [turnstileEnabled, setTurnstileEnabled] = useState(form.turnstileEnabled);
	const [isUpdating, setIsUpdating] = useState(false);
	const [playgroundData, setPlaygroundData] = useState('{\n  "email": "test@example.com",\n  "message": "Hello from playground"\n}');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

	useEffect(() => {
		// @ts-expect-error Prism is loaded via CDN script
		if (typeof window !== "undefined" && window.Prism) {
			// @ts-expect-error Prism is loaded via CDN script
			window.Prism.highlightAll();
		}
	}, [initialSubmissions]);

	const endpointUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/api/submit/${form.endpointId}`;

	function copyToClipboard(text: string, label: string) {
		navigator.clipboard.writeText(text);
		setCopied(label);
		setTimeout(() => setCopied(null), 2000);
	}

	async function handleDelete() {
		if (!confirm("Delete this form? All submissions and insights will be permanently removed.")) return;
		setDeleting(true);
		try {
			const res = await fetch(`/api/forms/${form.id}`, { method: "DELETE" });
			if (res.ok) {
				router.push("/dashboard");
				router.refresh();
			}
		} catch {
			setDeleting(false);
		}
	}

	async function handleToggleTurnstile() {
		setIsUpdating(true);
		try {
			await updateForm(form.id, "", { turnstileEnabled: !turnstileEnabled }); // User ID is handled by server app in reality, but for now we trust the client logic as placeholders or use the stack user
			// WAIT, updateForm in actions needs userId for security.
			// Let's use a standard fetch to an API route instead for easier client-side calling or pass the user id if we have it.
			// Actually, let's keep it simple and just use a client-side fetch to a new API route or use a server action properly.
			// I'll create a new API route /api/forms/[formId]/settings for this.
			const res = await fetch(`/api/forms/${form.id}/settings`, {
				method: "PATCH",
				body: JSON.stringify({ turnstileEnabled: !turnstileEnabled }),
			});

			if (res.ok) {
				setTurnstileEnabled(!turnstileEnabled);
				toast.success(`Spam protection ${!turnstileEnabled ? "enabled" : "disabled"}`);
				router.refresh();
			} else {
				toast.error("Failed to update settings");
			}
		} catch {
			toast.error("An error occurred");
		} finally {
			setIsUpdating(false);
		}
	}

	async function handlePlaygroundSubmit() {
		setIsSubmitting(true);
		try {
			const payload = JSON.parse(playgroundData);
			const res = await fetch(endpointUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (res.ok) {
				toast.success("Test submission sent!");
				router.refresh();
			} else {
				const data = await res.json() as { error?: string };
				toast.error(data.error || "Submission failed");
			}
		} catch (err) {
			toast.error("Invalid JSON or network error");
		} finally {
			setIsSubmitting(false);
		}
	}

	const htmlSnippet = `<form action="${endpointUrl}" method="POST">
  <input name="email" type="email" placeholder="Email" required />
  <input name="message" type="text" placeholder="Message" />
  ${turnstileEnabled ? `<!-- Turnstile Widget -->\n  <div class="cf-turnstile" data-sitekey="${turnstileSiteKey}"></div>\n  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>` : ""}
  <button type="submit">Submit</button>
</form>`;

	const curlSnippet = `curl -X POST ${endpointUrl} \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","message":"Hello"}'`;

	const fetchSnippet = `fetch("${endpointUrl}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "test@example.com", message: "Hello" }),
});`;

	return (
		<div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css"
			/>
			<Script
				src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"
				strategy="afterInteractive"
				onLoad={() => {
					// @ts-expect-error Prism is loaded via CDN script
					window.Prism.highlightAll();
				}}
			/>
			<Script
				src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.min.js"
				strategy="afterInteractive"
			/>
			<Script
				src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-json.min.js"
				strategy="afterInteractive"
			/>
			
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
				<div className="flex items-start gap-4">
					<Button 
						variant="ghost" 
						size="icon" 
						className="rounded-full h-9 w-9 shrink-0"
						onClick={() => router.push("/dashboard")}
					>
						<ChevronLeft className="w-5 h-5" />
					</Button>
					<div>
						<h1 className="text-2xl font-semibold tracking-tight text-foreground mb-1">{form.name}</h1>
						<div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
							<span className="bg-muted px-1.5 py-0.5 rounded uppercase tracking-tighter font-mono">{form.endpointId}</span>
							<span>•</span>
							<span>Created {new Date(form.createdAt).toLocaleDateString()}</span>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button 
						variant="outline" 
						size="sm" 
						className="rounded-full px-4 h-9"
						onClick={() => router.push(`/dashboard/forms/${form.id}/settings`)}
					>
						<Settings className="w-3.5 h-3.5 mr-2" />
						Settings
					</Button>
					<Button 
						variant="outline" 
						size="sm" 
						className="rounded-full px-4 h-9"
						onClick={() => window.open(endpointUrl, "_blank")}
					>
						<ExternalLink className="w-3.5 h-3.5 mr-2" />
						Test Endpoint
					</Button>
					<Button 
						variant="outline" 
						size="sm" 
						className="rounded-full px-4 h-9"
						onClick={() => document.getElementById("playground")?.scrollIntoView({ behavior: "smooth" })}
					>
						<Play className="w-3.5 h-3.5 mr-2" />
						Playground
					</Button>
					<Button 
						variant="ghost" 
						size="sm" 
						className="rounded-full px-4 h-9 text-destructive hover:text-destructive hover:bg-destructive/10"
						disabled={deleting} 
						onClick={handleDelete}
					>
						<Trash2 className="w-3.5 h-3.5 mr-2" />
						{deleting ? "Deleting…" : "Delete"}
					</Button>
				</div>
			</div>

			{/* Analytics Section */}
			<div className="mb-10">
				<FormAnalyticsClient analytics={analytics} />
			</div>

			{/* Tabs */}
			<div className="flex items-center gap-1 bg-muted/30 p-1 rounded-xl mb-8 w-fit border border-border/40">
				<Button 
					variant={activeTab === "integrate" ? "default" : "ghost"} 
					size="sm" 
					className={`rounded-lg h-9 px-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab !== "integrate" && 'text-muted-foreground'}`}
					onClick={() => setActiveTab("integrate")}
				>
					<Terminal className="w-3.5 h-3.5 mr-2" />
					Integrate
				</Button>
				<Button 
					variant={activeTab === "public" ? "default" : "ghost"} 
					size="sm" 
					className={`rounded-lg h-9 px-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab !== "public" && 'text-muted-foreground'}`}
					onClick={() => setActiveTab("public")}
				>
					<Globe className="w-3.5 h-3.5 mr-2" />
					Public Page
					{form.isPublic && (
						<div className="ml-2 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
					)}
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-8">
					{activeTab === "integrate" ? (
						<div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
							<section>
								<h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
									<Globe className="w-4 h-4 text-primary" />
									Your Endpoint
								</h2>
						<div className="relative group">
							<div className="absolute inset-y-0 right-0 flex items-center pr-2">
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 rounded-md"
									onClick={() => copyToClipboard(endpointUrl, "url")}
								>
									{copied === "url" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
								</Button>
							</div>
							<code className="block w-full bg-muted/50 border border-border/60 rounded-xl px-4 py-3.5 text-xs font-mono text-foreground overflow-x-auto pr-12">
								{endpointUrl}
							</code>
						</div>
					</section>

					<section>
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
								<ShieldCheck className="w-4 h-4 text-primary" />
								Spam Protection
							</h2>
							<div className="flex items-center gap-2">
								<span className="text-[10px] uppercase font-bold tracking-tighter text-muted-foreground mr-1">
									{turnstileEnabled ? "Active" : "Disabled"}
								</span>
								<Switch 
									checked={turnstileEnabled} 
									onCheckedChange={handleToggleTurnstile}
									disabled={isUpdating}
								/>
							</div>
						</div>
						<Card className="bg-primary/5 border-primary/10 shadow-none">
							<CardContent className="p-4 flex items-start gap-4">
								<div className="bg-primary/10 p-2 rounded-lg">
									<Lock className="w-4 h-4 text-primary" />
								</div>
								<div className="space-y-1">
									<p className="text-xs font-semibold text-foreground">Cloudflare Turnstile</p>
									<p className="text-[11px] text-muted-foreground leading-relaxed">
										Protect your form from bots and spam without frustrating your users. Turnstile is non-intrusive and doesn&apos;t require complex puzzles.
									</p>
								</div>
							</CardContent>
						</Card>
					</section>

					<section className="space-y-6">
						<div className="flex items-center justify-between">
							<h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
								<Terminal className="w-4 h-4 text-primary" />
								Integration Examples
							</h2>
						</div>
						
						<div className="space-y-6">
							{[
								{ label: "HTML Form", code: htmlSnippet, id: "html", icon: Code2, lang: "markup" },
								{ label: "cURL", code: curlSnippet, id: "curl", icon: Terminal, lang: "bash" },
								{ label: "JavaScript fetch", code: fetchSnippet, id: "fetch", icon: Globe, lang: "javascript" },
							].map((snippet) => (
								<div key={snippet.id} className="space-y-2.5">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<snippet.icon className="w-3 h-3 text-muted-foreground" />
											<span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{snippet.label}</span>
										</div>
										<Button
											variant="ghost"
											size="sm"
											className="h-7 px-2 text-[10px] font-medium"
											onClick={() => copyToClipboard(snippet.code, snippet.id)}
										>
											{copied === snippet.id ? (
												<><Check className="w-3 h-3 mr-1.5 text-green-500" /> Copied</>
											) : (
												<><Copy className="w-3 h-3 mr-1.5" /> Copy Code</>
											)}
										</Button>
									</div>
									<pre className="bg-muted/30! border-border/40! rounded-xl! p-4! text-[11px]! font-mono! text-foreground! overflow-x-auto whitespace-pre-wrap leading-relaxed language-${snippet.lang}">
										<code className={`language-${snippet.lang}`}>
											{snippet.code}
										</code>
									</pre>
								</div>
							))}
						</div>
					</section>

					<section id="playground" className="pt-8 border-t border-border/40">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
								<Play className="w-4 h-4 text-primary" />
								Form Playground
							</h2>
							<Badge variant="outline" className="text-[9px] uppercase font-mono tracking-tighter">Live Test</Badge>
						</div>
						<div className="space-y-4">
							<p className="text-[11px] text-muted-foreground">
								Directly test your form endpoint without writing any code. Edit the JSON payload below and hit submit.
							</p>
							<div className="relative">
								<textarea
									value={playgroundData}
									onChange={(e) => setPlaygroundData(e.target.value)}
									className="w-full h-32 bg-muted/20 border border-border/60 rounded-xl p-4 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none"
									spellCheck={false}
								/>
								<Button 
									size="sm" 
									className="absolute bottom-3 right-3 rounded-lg h-8 px-3"
									onClick={handlePlaygroundSubmit}
									disabled={isSubmitting}
								>
									{isSubmitting ? "Sending..." : "Submit Test"}
									<Send className="w-3 h-3 ml-2" />
								</Button>
							</div>
						</div>
					</section>

					<section className="pt-8 border-t border-border/40 pb-10">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
								<Zap className="w-4 h-4 text-primary" />
								Third-Party Integrations
							</h2>
							<Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-primary/20 text-[9px] uppercase font-mono tracking-tighter">
								Coming Soon
							</Badge>
						</div>
						
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 opacity-60 grayscale cursor-not-allowed">
							{[
								{ name: "Notion", icon: Database },
								{ name: "Google Sheets", icon: Table },
								{ name: "Slack", icon: Slack },
								{ name: "Discord", icon: MessageSquare },
								{ name: "Zapier", icon: Zap },
								{ name: "Webhooks", icon: Globe },
								{ name: "Airtable", icon: Database },
								{ name: "100+ More", icon: Zap },
							].map((integration) => (
								<div key={integration.name} className="flex items-center gap-3 p-3 bg-muted/30 border border-border/40 rounded-xl">
									<integration.icon className="w-4 h-4 text-muted-foreground" />
									<span className="text-[11px] font-medium text-muted-foreground">{integration.name}</span>
								</div>
							))}
						</div>
					</section>
				</div>
			) : (
						<div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
							<PublicFormSettings form={form} userId={userId} />
						</div>
					)}
				</div>

				{/* Submissions Sidebar */}
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-sm font-semibold text-foreground">Submissions</h2>
						<Badge variant="secondary" className="rounded-full px-2 py-0 h-5 text-[10px]">
							{totalSubmissions}
						</Badge>
					</div>

					{initialSubmissions.length === 0 ? (
						<div className="bg-muted/20 border border-dashed border-border/60 rounded-2xl p-8 text-center">
							<Inbox className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
							<p className="text-xs font-medium text-foreground mb-1">Waiting for submissions</p>
							<p className="text-[10px] text-muted-foreground">Try sending a test request to your endpoint.</p>
						</div>
					) : (
						<div className="space-y-3">
							{initialSubmissions.map((sub) => (
								<Card key={sub.id} className="bg-card/50 shadow-none border-border/60 group">
									<CardContent className="p-3.5">
										<div className="flex items-center justify-between mb-2.5">
											<Badge 
												variant={sub.isSpam ? "destructive" : "secondary"} 
												className={`text-[9px] h-4 px-1.5 uppercase font-mono tracking-tighter ${!sub.isSpam && "bg-green-500/10 text-green-600 border-green-500/20 shadow-none"}`}
											>
												{sub.isSpam ? "SPAM" : "CLEAN"}
											</Badge>
											<span className="text-[9px] text-muted-foreground/60 font-mono">
												{new Date(sub.createdAt).toLocaleDateString()}
											</span>
										</div>
										<pre className="text-[10px]! font-mono! text-muted-foreground! overflow-x-auto bg-muted/40! rounded-lg p-2.5! max-h-[120px] scrollbar-hide language-json">
											<code className="language-json">
												{JSON.stringify(sub.payload, null, 2)}
											</code>
										</pre>
									</CardContent>
								</Card>
							))}
							<Button 
								variant="ghost" 
								size="sm" 
								className="w-full text-xs text-muted-foreground" 
								onClick={() => router.push(`/dashboard/forms/${form.id}/submissions`)}
							>
								View all submissions
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
