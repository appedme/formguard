"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Play, Terminal, Info } from "lucide-react";
import { toast } from "sonner";

interface PlaygroundViewProps {
	form: {
		id: string;
		endpointId: string;
	};
}

export function FormPlaygroundView({ form }: PlaygroundViewProps) {
	const router = useRouter();
	const [playgroundData, setPlaygroundData] = useState('{\n  "email": "test@example.com",\n  "message": "Hello from playground"\n}');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const endpointUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/api/submit/${form.endpointId}`;

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

	return (
		<div className="max-w-4xl mx-auto space-y-8 pb-20">
			<section>
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
					<div className="flex items-center gap-3">
						<div className="p-3 bg-primary/10 rounded-2xl">
							<Play className="w-5 h-5 text-primary" />
						</div>
						<div>
							<h2 className="text-xl font-black tracking-tighter">Form Playground</h2>
							<p className="text-xs text-muted-foreground font-medium">Test your implementation without writing code.</p>
						</div>
					</div>
					<Badge variant="outline" className="w-fit h-7 rounded-lg border-primary/20 bg-primary/5 text-primary font-black uppercase tracking-widest text-[10px]">
						Live Test Mode
					</Badge>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
					{/* Editor */}
					<div className="lg:col-span-8 flex flex-col gap-4">
						<div className="flex items-center justify-between px-2">
							<div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
								<Terminal className="w-3.5 h-3.5" />
								JSON Payload
							</div>
							<div className="text-[10px] font-medium text-muted-foreground/40 italic">
								{isSubmitting ? "Executing request..." : "Ready to send"}
							</div>
						</div>
						
						<div className="relative group rounded-3xl border-2 border-border/40 bg-muted/20 overflow-hidden shadow-sm transition-all hover:border-border focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/5">
							<textarea
								value={playgroundData}
								onChange={(e) => setPlaygroundData(e.target.value)}
								className="w-full h-64 bg-transparent p-8 font-mono text-sm text-foreground focus:outline-none resize-none leading-relaxed"
								spellCheck={false}
							/>
							<div className="absolute bottom-6 right-6 flex items-center gap-3">
								<Button 
									size="lg" 
									className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest gap-3 shadow-xl shadow-primary/20 active:scale-[0.97] transition-all"
									onClick={handlePlaygroundSubmit}
									disabled={isSubmitting}
								>
									{isSubmitting ? "Sending..." : "Submit Test"}
									<Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
								</Button>
							</div>
						</div>
					</div>

					{/* Sidebar context */}
					<div className="lg:col-span-4 space-y-6">
						<div className="p-6 bg-muted/30 border border-border/40 rounded-3xl space-y-4">
							<h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
								<Info className="w-3.5 h-3.5 text-primary" />
								How it works
							</h3>
							<ul className="space-y-3">
								{[
									"Enter valid JSON in the editor.",
									"Click 'Submit Test' to send a POST request.",
									"Results will appear in your Submissions list.",
									"Turnstile is bypassed for playground tests."
								].map((tip, i) => (
									<li key={i} className="flex gap-2 text-[11px] font-medium text-muted-foreground leading-tight">
										<span className="text-primary font-black opacity-40">{i+1}.</span>
										{tip}
									</li>
								))}
							</ul>
						</div>

						<div className="p-6 border-2 border-dashed border-border/40 rounded-3xl">
							<p className="text-[10px] text-muted-foreground font-medium text-center uppercase tracking-widest italic opacity-60">
								Endpoint active and ready.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
