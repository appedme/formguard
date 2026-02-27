"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Turnstile } from "@marsidev/react-turnstile";
import { toast } from "sonner";
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
	const [formData, setFormData] = useState<Record<string, any>>({});
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

	// Logic to calculate dynamic background
	const bgTint = `${form.publicFormThemeColor}08`; // ~3% opacity tint

	return (
		<div className="w-full min-h-screen py-12 px-4 transition-colors duration-500" style={{ backgroundColor: bgTint }}>
			<div className="max-w-3xl mx-auto space-y-4">
				{/* 1. Header Card */}
				<Card className="overflow-hidden shadow-md border-border/40 rounded-xl relative">
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

					<div className="p-6 md:p-8 pt-10 space-y-4">
						<div className="flex items-center gap-2 mb-2">
							<div className="bg-foreground p-1 rounded-md">
								<ShieldCheck className="w-3.5 h-3.5 text-background" />
							</div>
							<span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground font-bold">
								FormGuard Secured
							</span>
						</div>
						
						<h1 className="text-4xl font-black tracking-tight text-foreground leading-tight">
							{form.name}
						</h1>
						
						{form.publicFormDescription && (
							<p className="text-base font-medium text-foreground/70 whitespace-pre-wrap leading-relaxed">
								{form.publicFormDescription}
							</p>
						)}

						<Separator className="mt-6 opacity-40" />
						
						<div className="text-[11px] font-bold text-red-500 uppercase tracking-widest mt-4">
							* Indicates required question
						</div>
					</div>
				</Card>

				<form onSubmit={handleSubmit} className="space-y-4">
					{fields.length === 0 ? (
						<Card className="p-12 text-center border-dashed border-2">
							<p className="text-sm text-muted-foreground font-medium">This form has no fields yet.</p>
						</Card>
					) : (
						fields.map((field) => (
							<Card key={field.name} className="p-6 md:p-8 shadow-sm border-border/40 rounded-xl transition-all hover:shadow-md group">
								<div className="space-y-5">
									<Label htmlFor={field.name} className="text-base font-bold text-foreground flex items-center gap-1.5 leading-snug">
										{field.label}
										{field.required && <span className="text-red-500 text-xl font-black">*</span>}
									</Label>

									<div className="pt-1">
										{field.type === "textarea" ? (
											<Textarea
												id={field.name}
												name={field.name}
												required={field.required}
												placeholder={field.placeholder || "Your answer"}
												className="bg-transparent border-0 border-b-2 border-muted focus-visible:ring-0 rounded-none focus-visible:border-primary px-0 pb-2 transition-all text-base placeholder:text-muted-foreground/40 min-h-[40px] resize-none overflow-hidden"
												style={{ borderBottomColor: formData[field.name] ? form.publicFormThemeColor : undefined }}
												value={formData[field.name] || ""}
												onChange={(e) => {
													setFormData({ ...formData, [field.name]: e.target.value });
													e.target.style.height = 'auto';
													e.target.style.height = e.target.scrollHeight + 'px';
												}}
											/>
										) : field.type === "radio" ? (
											<RadioGroup 
												onValueChange={(val) => setFormData({ ...formData, [field.name]: val })}
												className="flex flex-col gap-4"
											>
												{field.options?.map((option, i) => (
													<div key={`${field.name}-${option}-${i}`} className="flex items-center space-x-3 group/opt">
														<RadioGroupItem 
															value={option} 
															id={`${field.name}-${option}`} 
															className="border-2 border-muted-foreground/30"
															style={{ color: form.publicFormThemeColor }}
														/>
														<Label htmlFor={`${field.name}-${option}`} className="text-sm font-medium cursor-pointer flex-1 py-1 group-hover/opt:text-primary transition-colors">
															{option}
														</Label>
													</div>
												))}
											</RadioGroup>
										) : field.type === "checkbox" ? (
											<div className="flex flex-col gap-4">
												{field.options?.map((option, i) => (
													<div key={`${field.name}-${option}-${i}`} className="flex items-center space-x-3 group/opt">
														<Checkbox 
															id={`${field.name}-${option}`} 
															className="border-2 border-muted-foreground/30 data-[state=checked]:border-none"
															style={{ backgroundColor: (formData[field.name] as unknown as string[])?.includes(option) ? form.publicFormThemeColor : undefined }}
															onCheckedChange={(checked) => {
																const current = (formData[field.name] as unknown as string[]) || [];
																const next = checked 
																	? [...current, option] 
																	: current.filter(i => i !== option);
																setFormData({ ...formData, [field.name]: next as any });
															}}
														/>
														<Label htmlFor={`${field.name}-${option}`} className="text-sm font-medium cursor-pointer flex-1 py-1 group-hover/opt:text-primary transition-colors">
															{option}
														</Label>
													</div>
												))}
											</div>
										) : field.type === "select" ? (
											<Select onValueChange={(val) => setFormData({ ...formData, [field.name]: val })}>
												<SelectTrigger className="w-full md:w-1/2 h-11 bg-background/50 border-muted-foreground/20 rounded-lg">
													<SelectValue placeholder={field.placeholder || "Choose an option"} />
												</SelectTrigger>
												<SelectContent className="rounded-xl">
													{field.options?.map((option, i) => (
														<SelectItem key={`${field.name}-${option}-${i}`} value={option}>{option}</SelectItem>
													))}
												</SelectContent>
											</Select>
										) : (
											<Input
												id={field.name}
												name={field.name}
												type={field.type}
												required={field.required}
												placeholder={field.placeholder || "Your answer"}
												className="bg-transparent border-0 border-b-2 border-muted focus-visible:ring-0 rounded-none focus-visible:border-primary px-0 pb-2 transition-all text-base placeholder:text-muted-foreground/40 h-auto"
												style={{ borderBottomColor: formData[field.name] ? form.publicFormThemeColor : undefined }}
												value={formData[field.name] || ""}
												onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
											/>
										)}
									</div>
								</div>
							</Card>
						))
					)}

					{form.turnstileEnabled && (
						<div className="flex justify-start pt-2">
							<Turnstile
								siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
								onSuccess={(token) => setTurnstileToken(token)}
							/>
						</div>
					)}

					<div className="flex items-center justify-between pt-4">
						<Button 
							type="submit" 
							disabled={status === "submitting" || fields.length === 0}
							className="h-12 px-8 rounded-lg font-bold tracking-tight text-base shadow-lg transition-all active:scale-[0.98] hover:opacity-90"
							style={{ backgroundColor: form.publicFormThemeColor, color: "#fff" }}
						>
							{status === "submitting" ? (
								<><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Submitting...</>
							) : (
								form.publicFormButtonText
							)}
						</Button>
						
						<Button 
							variant="ghost" 
							type="button"
							className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
							onClick={() => {
								setFormData({});
								setStatus("idle");
							}}
						>
							Clear form
						</Button>
					</div>
				</form>

				<footer className="pt-12 pb-8 flex flex-col items-center gap-6">
					<div className="flex items-center gap-3">
						<span className="text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">Powered by</span>
						<div className="bg-foreground text-background px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter shadow-lg">
							FormGuard
						</div>
					</div>
					<div className="text-[10px] text-muted-foreground/60 font-medium">
						This content is neither created nor endorsed by FormGuard.
					</div>
				</footer>
			</div>
		</div>
	);
}
