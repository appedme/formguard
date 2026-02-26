"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Turnstile } from "@marsidev/react-turnstile";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";

interface PublicFormField {
	label: string;
	name: string;
	type: "text" | "email" | "textarea" | "number";
	required: boolean;
	placeholder?: string;
}

interface PublicFormClientProps {
	form: {
		id: string;
		name: string;
		endpointId: string;
		publicFormDescription: string | null;
		publicFormFields: any;
		publicFormSuccessMessage: string | null;
		publicFormButtonText: string;
		turnstileEnabled: boolean;
	};
}

export function PublicFormClient({ form }: PublicFormClientProps) {
	const [formData, setFormData] = useState<Record<string, string>>({});
	const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

	const fields = (form.publicFormFields as PublicFormField[]) || [];

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		
		if (form.turnstileEnabled && !turnstileToken) {
			toast.error("Please complete the spam protection.");
			return;
		}

		setStatus("submitting");

		try {
			const payload = {
				...formData,
				...(form.turnstileEnabled ? { "cf-turnstile-response": turnstileToken } : {}),
			};

			const res = await fetch(`/api/submit/${form.endpointId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const errorData = await res.json() as { error?: string };
				throw new Error(errorData.error || "Failed to submit form");
			}

			setStatus("success");
			toast.success("Response submitted successfully!");
		} catch (error: any) {
			setStatus("error");
			toast.error(error.message || "Something went wrong. Please try again.");
		}
	}

	if (status === "success") {
		return (
			<Card className="w-full max-w-lg border-2 border-primary/20 shadow-2xl p-6 text-center">
				<CardContent className="pt-10 pb-10">
					<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
						<CheckCircle2 className="w-10 h-10 text-primary" />
					</div>
					<h2 className="text-2xl font-black tracking-tight mb-4">Success!</h2>
					<p className="text-muted-foreground whitespace-pre-wrap">
						{form.publicFormSuccessMessage || "Your response has been recorded. Thank you!"}
					</p>
					<Button 
						variant="outline" 
						className="mt-8 rounded-xl font-bold"
						onClick={() => {
							setFormData({});
							setStatus("idle");
							setTurnstileToken(null);
						}}
					>
						Submit another response
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-lg border-primary/10 shadow-2xl overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm">
			<CardHeader className="bg-primary/5 border-b border-primary/10 p-8">
				<div className="flex items-center gap-3 mb-4">
					<div className="bg-foreground p-1.5 rounded-lg shadow-lg">
						<ShieldCheck className="w-5 h-5 text-background" />
					</div>
					<Badge variant="outline" className="font-mono text-[10px] tracking-widest uppercase py-0 px-2 h-5 border-primary/20 text-primary bg-primary/5">
						Trusted Form
					</Badge>
				</div>
				<CardTitle className="text-3xl font-black tracking-tight text-foreground leading-tight">
					{form.name}
				</CardTitle>
				{form.publicFormDescription && (
					<CardDescription className="text-sm font-medium text-foreground/60 mt-2 whitespace-pre-wrap">
						{form.publicFormDescription}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className="p-8">
				<form onSubmit={handleSubmit} className="space-y-6">
					{fields.length === 0 ? (
						<div className="py-10 text-center bg-muted/20 rounded-xl border border-dashed border-border/60">
							<p className="text-sm text-muted-foreground">This form has no fields yet.</p>
						</div>
					) : (
						fields.map((field) => (
							<div key={field.name} className="space-y-3">
								<Label htmlFor={field.name} className="text-xs font-black uppercase tracking-widest text-foreground/70">
									{field.label}
									{field.required && <span className="text-primary ml-1">*</span>}
								</Label>
								{field.type === "textarea" ? (
									<Textarea
										id={field.name}
										name={field.name}
										required={field.required}
										placeholder={field.placeholder}
										className="bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 rounded-xl min-h-[120px] transition-all"
										value={formData[field.name] || ""}
										onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
									/>
								) : (
									<Input
										id={field.name}
										name={field.name}
										type={field.type}
										required={field.required}
										placeholder={field.placeholder}
										className="bg-background/50 border-border/40 h-12 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all"
										value={formData[field.name] || ""}
										onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
									/>
								)}
							</div>
						))
					)}

					{form.turnstileEnabled && (
						<div className="flex justify-center pt-2">
							<Turnstile
								siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
								onSuccess={(token) => setTurnstileToken(token)}
							/>
						</div>
					)}

					<Button 
						type="submit" 
						disabled={status === "submitting" || fields.length === 0}
						className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-black tracking-tight text-base shadow-xl shadow-foreground/5 transition-all active:scale-[0.98]"
					>
						{status === "submitting" ? (
							<><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Submitting...</>
						) : (
							form.publicFormButtonText
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
