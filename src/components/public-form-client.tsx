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
import { CheckCircle2, ShieldCheck, Loader2, Check, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface PublicFormField {
	label: string;
	name: string;
	type: "text" | "email" | "textarea" | "number" | "radio" | "checkbox" | "select";
	required: boolean;
	placeholder?: string;
	options?: string[];
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
		publicFormHeaderImage: string | null;
		publicFormThemeColor: string;
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
		<div className="w-full max-w-2xl mx-auto space-y-6">
			{/* Form Container */}
			<div className="rounded-xl overflow-hidden shadow-xl border border-border/40 bg-card/60 backdrop-blur-md relative">
				{/* Top Accent Bar */}
				<div 
					className="h-2.5 w-full absolute top-0 left-0" 
					style={{ backgroundColor: form.publicFormThemeColor }}
				/>
				
				{/* Header Image */}
				{form.publicFormHeaderImage && (
					<div className="w-full h-40 md:h-56 overflow-hidden border-b border-border/40 mt-2.5">
						<img 
							src={form.publicFormHeaderImage} 
							alt="Form Header" 
							className="w-full h-full object-cover"
						/>
					</div>
				)}

				<div className="p-6 md:p-10 space-y-8">
					{/* Header Info */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="bg-foreground p-1 rounded-lg">
								<ShieldCheck className="w-4 h-4 text-background" />
							</div>
							<Badge variant="outline" className="font-mono text-[9px] tracking-widest uppercase py-0 px-2 h-4 border-primary/20 text-primary bg-primary/5">
								Verified FormGuard Endpoint
							</Badge>
						</div>
						<h1 className="text-4xl font-black tracking-tight text-foreground leading-tight">
							{form.name}
						</h1>
						{form.publicFormDescription && (
							<p className="text-sm font-medium text-foreground/60 whitespace-pre-wrap leading-relaxed">
								{form.publicFormDescription}
							</p>
						)}
						<Separator className="bg-border/40" />
					</div>

					<form onSubmit={handleSubmit} className="space-y-10">
						{fields.length === 0 ? (
							<div className="py-20 text-center bg-muted/20 rounded-2xl border border-dashed border-border/60">
								<p className="text-sm text-muted-foreground">This form has no fields yet.</p>
							</div>
						) : (
							<div className="space-y-10">
								{fields.map((field) => (
									<div key={field.name} className="space-y-4">
										<Label htmlFor={field.name} className="text-sm font-black uppercase tracking-widest text-foreground/80 flex items-center gap-2">
											{field.label}
											{field.required && <span className="text-red-500 text-lg">*</span>}
										</Label>

										{field.type === "textarea" ? (
											<Textarea
												id={field.name}
												name={field.name}
												required={field.required}
												placeholder={field.placeholder}
												className="bg-background/40 border-border/40 focus:border-primary/50 focus:ring-primary/20 rounded-xl min-h-[120px] transition-all text-base px-4 py-3"
												value={formData[field.name] || ""}
												onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
											/>
										) : field.type === "radio" ? (
											<RadioGroup 
												onValueChange={(val) => setFormData({ ...formData, [field.name]: val })}
												className="flex flex-col gap-3"
											>
												{field.options?.map((option) => (
													<div key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-border/40 bg-background/30 hover:bg-background/50 transition-colors">
														<RadioGroupItem value={option} id={`${field.name}-${option}`} />
														<Label htmlFor={`${field.name}-${option}`} className="font-medium cursor-pointer flex-1">{option}</Label>
													</div>
												))}
											</RadioGroup>
										) : field.type === "checkbox" ? (
											<div className="flex flex-col gap-3">
												{field.options?.map((option) => (
													<div key={option} className="flex items-center space-x-3 p-3 rounded-lg border border-border/40 bg-background/30 hover:bg-background/50 transition-colors">
														<Checkbox 
															id={`${field.name}-${option}`} 
															onCheckedChange={(checked) => {
																const current = (formData[field.name] as unknown as string[]) || [];
																const next = checked 
																	? [...current, option] 
																	: current.filter(i => i !== option);
																setFormData({ ...formData, [field.name]: next as any });
															}}
														/>
														<Label htmlFor={`${field.name}-${option}`} className="font-medium cursor-pointer flex-1">{option}</Label>
													</div>
												))}
											</div>
										) : field.type === "select" ? (
											<Select onValueChange={(val) => setFormData({ ...formData, [field.name]: val })}>
												<SelectTrigger className="w-full h-12 bg-background/40 border-border/40 rounded-xl">
													<SelectValue placeholder={field.placeholder || "Select an option"} />
												</SelectTrigger>
												<SelectContent className="rounded-xl border-border/40">
													{field.options?.map((option) => (
														<SelectItem key={option} value={option}>{option}</SelectItem>
													))}
												</SelectContent>
											</Select>
										) : (
											<Input
												id={field.name}
												name={field.name}
												type={field.type}
												required={field.required}
												placeholder={field.placeholder}
												className="bg-background/40 border-border/40 h-12 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all text-base px-4"
												value={formData[field.name] || ""}
												onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
											/>
										)}
									</div>
								))}
							</div>
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
							className="w-full h-14 rounded-xl font-black tracking-tight text-lg shadow-xl transition-all active:scale-[0.98]"
							style={{ backgroundColor: form.publicFormThemeColor, color: "#fff" }}
						>
							{status === "submitting" ? (
								<><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Submitting...</>
							) : (
								form.publicFormButtonText
							)}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
