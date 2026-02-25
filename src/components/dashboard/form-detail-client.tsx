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
	Inbox
} from "lucide-react";
import type { Submission } from "@/db/schema";

interface FormDetailProps {
	form: {
		id: string;
		name: string;
		endpointId: string;
		createdAt: Date;
		submissions: number;
	};
	initialSubmissions: Submission[];
	totalSubmissions: number;
	totalPages: number;
}

export function FormDetailClient({
	form,
	initialSubmissions,
	totalSubmissions,
	totalPages,
}: FormDetailProps) {
	const router = useRouter();
	const [copied, setCopied] = useState<string | null>(null);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		// @ts-ignore
		if (typeof window !== "undefined" && window.Prism) {
			// @ts-ignore
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

	const htmlSnippet = `<form action="${endpointUrl}" method="POST">
  <input name="email" type="email" placeholder="Email" required />
  <input name="message" type="text" placeholder="Message" />
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
					// @ts-ignore
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
						onClick={() => window.open(endpointUrl, "_blank")}
					>
						<ExternalLink className="w-3.5 h-3.5 mr-2" />
						Test Endpoint
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

			{/* Stats Row */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
				{[
					{ label: "Submissions", value: totalSubmissions, icon: Inbox },
					{ label: "Pages", value: totalPages || 1, icon: Code2 },
					{ label: "Endpoint Status", value: "Active", icon: Globe },
				].map((stat) => (
					<Card key={stat.label} className="bg-card/50 shadow-none border-border/60">
						<CardContent className="p-5">
							<p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
								{stat.label}
							</p>
							<div className="flex items-center justify-between">
								<p className="text-xl font-semibold text-foreground">{stat.value}</p>
								<stat.icon className="w-4 h-4 text-muted-foreground/40" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
				{/* Integration Section */}
				<div className="lg:col-span-2 space-y-8">
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
									<pre className={`!bg-muted/30 !border-border/40 !rounded-xl !p-4 !text-[11px] !font-mono !text-foreground overflow-x-auto whitespace-pre-wrap leading-relaxed language-${snippet.lang}`}>
										<code className={`language-${snippet.lang}`}>
											{snippet.code}
										</code>
									</pre>
								</div>
							))}
						</div>
					</section>
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
										<pre className="!text-[10px] font-mono !text-muted-foreground overflow-x-auto !bg-muted/40 rounded-lg !p-2.5 max-h-[120px] scrollbar-hide language-json">
											<code className="language-json">
												{JSON.stringify(sub.payload, null, 2)}
											</code>
										</pre>
									</CardContent>
								</Card>
							))}
							{totalPages > 1 && (
								<Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground" onClick={() => router.push("/dashboard/submissions")}>
									View all submissions
								</Button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
