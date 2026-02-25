"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
		<div className="p-8 max-w-5xl">
			{/* Header */}
			<div className="flex items-start justify-between mb-8">
				<div>
					<div className="flex items-center gap-3 mb-1">
						<Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
							← Back
						</Button>
						<h1 className="text-2xl font-black text-foreground">{form.name}</h1>
					</div>
					<p className="text-xs font-mono text-muted-foreground mt-2">
						Created {new Date(form.createdAt).toLocaleDateString()}
					</p>
				</div>
				<Button variant="destructive" size="sm" disabled={deleting} onClick={handleDelete}>
					{deleting ? "Deleting…" : "Delete Form"}
				</Button>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-3 gap-4 mb-8">
				<Card className="border-border">
					<CardHeader className="pb-1">
						<CardDescription className="text-xs font-mono uppercase">Submissions</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-black text-foreground">{totalSubmissions}</p>
					</CardContent>
				</Card>
				<Card className="border-border">
					<CardHeader className="pb-1">
						<CardDescription className="text-xs font-mono uppercase">Endpoint ID</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm font-mono text-foreground truncate">{form.endpointId}</p>
					</CardContent>
				</Card>
				<Card className="border-border">
					<CardHeader className="pb-1">
						<CardDescription className="text-xs font-mono uppercase">Pages</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-black text-foreground">{totalPages || 1}</p>
					</CardContent>
				</Card>
			</div>

			{/* Endpoint URL + Copy */}
			<Card className="border-border mb-8">
				<CardHeader>
					<CardTitle className="text-base">Your Endpoint</CardTitle>
					<CardDescription>Point your form&apos;s action to this URL.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-3">
						<code className="flex-1 bg-muted border border-border px-4 py-3 text-sm font-mono text-foreground overflow-x-auto">
							{endpointUrl}
						</code>
						<Button
							size="sm"
							onClick={() => copyToClipboard(endpointUrl, "url")}
						>
							{copied === "url" ? "Copied!" : "Copy"}
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Code Snippets */}
			<Card className="border-border mb-8">
				<CardHeader>
					<CardTitle className="text-base">Integration Examples</CardTitle>
					<CardDescription>Copy and paste into your project.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{[
						{ label: "HTML Form", code: htmlSnippet, id: "html" },
						{ label: "cURL", code: curlSnippet, id: "curl" },
						{ label: "JavaScript fetch", code: fetchSnippet, id: "fetch" },
					].map((snippet) => (
						<div key={snippet.id}>
							<div className="flex items-center justify-between mb-2">
								<Badge variant="secondary" className="font-mono text-xs">{snippet.label}</Badge>
								<Button
									variant="outline"
									size="sm"
									onClick={() => copyToClipboard(snippet.code, snippet.id)}
								>
									{copied === snippet.id ? "Copied!" : "Copy"}
								</Button>
							</div>
							<pre className="bg-muted border border-border p-4 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap">
								{snippet.code}
							</pre>
						</div>
					))}
				</CardContent>
			</Card>

			<Separator className="mb-8" />

			{/* Submissions Table */}
			<div>
				<h2 className="text-lg font-black text-foreground mb-4">
					Submissions
					<span className="text-muted-foreground font-normal ml-2 text-sm">
						({totalSubmissions} total)
					</span>
				</h2>

				{initialSubmissions.length === 0 ? (
					<Card className="border-border border-dashed">
						<CardContent className="flex flex-col items-center justify-center py-16 text-center">
							<p className="text-3xl mb-3">📥</p>
							<h3 className="text-base font-bold text-foreground mb-2">No submissions yet</h3>
							<p className="text-sm text-muted-foreground max-w-sm">
								Use the endpoint above to send a test submission. It&apos;ll appear here instantly.
							</p>
						</CardContent>
					</Card>
				) : (
					<div className="space-y-3">
						{initialSubmissions.map((sub) => (
							<Card key={sub.id} className="border-border">
								<CardContent className="p-4">
									<div className="flex items-start justify-between mb-2">
										<div className="flex items-center gap-2">
											<Badge variant={sub.isSpam ? "destructive" : "secondary"} className="text-xs font-mono">
												{sub.isSpam ? "SPAM" : "CLEAN"}
											</Badge>
											{sub.ipAddress && (
												<span className="text-xs font-mono text-muted-foreground">{sub.ipAddress}</span>
											)}
										</div>
										<span className="text-xs text-muted-foreground font-mono">
											{new Date(sub.createdAt).toLocaleString()}
										</span>
									</div>
									<pre className="bg-muted border border-border p-3 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap">
										{JSON.stringify(sub.payload, null, 2)}
									</pre>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
