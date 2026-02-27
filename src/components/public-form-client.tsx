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
	id?: string;
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
		publicFormStyle: string;
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

	const styleConfig = {
		default: {
			root: "font-sans",
			bgStyle: { backgroundColor: `${form.publicFormThemeColor}08` },
			card: "shadow-sm border-border/40 rounded-xl",
			input: "bg-transparent border-0 border-b-2 border-muted focus-visible:ring-0 rounded-none focus-visible:border-primary px-0 pb-2 transition-all placeholder:text-muted-foreground/40 text-base",
			label: "font-bold text-foreground text-base",
			button: "rounded-lg font-bold tracking-tight text-base shadow-lg transition-all active:scale-[0.98] hover:opacity-90",
			title: "font-black tracking-tight",
			headerCard: "shadow-md border-border/40 rounded-xl"
		},
		minimal: {
			root: "font-sans bg-white",
			bgStyle: {},
			card: "border-0 border-b border-border/20 rounded-none bg-transparent px-0 py-8 shadow-none !mb-0",
			input: "bg-transparent border-0 border-b-2 border-muted/30 focus-visible:ring-0 rounded-none px-0 pb-2 transition-all placeholder:text-muted-foreground/40 text-xl",
			label: "font-medium text-foreground text-xl",
			button: "rounded-none font-medium bg-black text-white hover:bg-black/90 px-8 shadow-none h-14 text-lg",
			title: "font-medium tracking-normal text-5xl",
			headerCard: "border-0 shadow-none rounded-none bg-transparent px-0 pb-8 border-b border-border/20"
		},
		notion: {
			root: "font-serif bg-white",
			bgStyle: {},
			card: "border-0 rounded-none bg-transparent px-0 py-6 shadow-none",
			input: "bg-transparent border border-border/40 hover:border-border focus-visible:ring-1 focus-visible:ring-border rounded px-3 py-2 transition-all placeholder:text-muted-foreground/40 text-base font-serif",
			label: "font-semibold text-foreground text-base font-serif",
			button: "rounded font-semibold bg-white border border-border/60 text-foreground hover:bg-muted/30 px-6 font-serif shadow-sm",
			title: "font-bold tracking-tight text-4xl font-serif",
			headerCard: "border-0 shadow-none rounded-none bg-transparent px-0 pb-6"
		},
		playful: {
			root: "font-sans",
			bgStyle: { backgroundColor: `${form.publicFormThemeColor}15` },
			card: "border-4 border-black rounded-3xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
			input: "bg-white border-2 border-black focus-visible:ring-0 rounded-xl focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-3 transition-all placeholder:text-muted-foreground/40 font-bold text-lg",
			label: "font-black text-foreground text-xl",
			button: "rounded-2xl font-black bg-black text-white hover:bg-black/90 px-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all h-14 text-lg",
			title: "font-black tracking-tighter text-5xl",
			headerCard: "border-4 border-black rounded-3xl bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
		},
		terminal: {
			root: "font-mono bg-black text-green-500 selection:bg-green-500/30",
			bgStyle: {},
			card: "border border-green-500/30 rounded-none bg-black shadow-none",
			input: "bg-black border-0 border-b border-green-500/50 focus-visible:ring-0 rounded-none px-0 pb-2 transition-all text-green-400 placeholder:text-green-900/50 focus-visible:border-green-400 font-mono text-sm",
			label: "font-normal text-green-500 uppercase tracking-widest text-xs",
			button: "rounded-none font-bold bg-green-500 text-black hover:bg-green-400 px-8 uppercase tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.3)] h-12 text-xs",
			title: "font-normal tracking-widest text-2xl uppercase border-b border-green-500/30 pb-4 text-green-400",
			headerCard: "border border-green-500/30 rounded-none bg-black shadow-[0_0_20px_rgba(34,197,94,0.1)]"
		}
	};

	const currentStyle = (form.publicFormStyle as keyof typeof styleConfig) || "default";
	const theme = styleConfig[currentStyle] || styleConfig.default;

	const isTerminal = currentStyle === "terminal";

	return (
		<div className={`w-full min-h-screen py-12 px-4 transition-colors duration-500 ${theme.root}`} style={theme.bgStyle}>
			<div className="max-w-3xl mx-auto space-y-4">
				{/* 1. Header Card */}
				<Card className={`overflow-hidden relative ${theme.headerCard}`}>
					{/* Top Accent Bar */}
					{currentStyle !== "terminal" && currentStyle !== "minimal" && currentStyle !== "notion" && (
						<div 
							className="h-2.5 w-full absolute top-0 left-0" 
							style={{ backgroundColor: form.publicFormThemeColor }}
						/>
					)}
					
					{/* Header Image */}
					{form.publicFormHeaderImage && (
						<div className={`w-full h-40 md:h-56 overflow-hidden ${currentStyle !== "minimal" && currentStyle !== "notion" ? 'mt-2.5' : ''}`}>
							<img 
								src={form.publicFormHeaderImage} 
								alt="Form Header" 
								className="w-full h-full object-cover"
							/>
						</div>
					)}

					<div className="p-6 md:p-8 pt-10 space-y-4">
						{!isTerminal && currentStyle !== "notion" && currentStyle !== "minimal" && (
							<div className="flex items-center gap-2 mb-2">
								<div className="bg-foreground p-1 rounded-md">
									<ShieldCheck className="w-3.5 h-3.5 text-background" />
								</div>
								<span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground font-bold">
									FormGuard Secured
								</span>
							</div>
						)}
						
						<h1 className={`${theme.title} text-foreground leading-tight ${isTerminal ? 'text-green-400' : ''}`}>
							{form.name}
						</h1>
						
						{form.publicFormDescription && (
							<p className={`text-base font-medium whitespace-pre-wrap leading-relaxed ${isTerminal ? 'text-green-500/80' : 'text-foreground/70'}`}>
								{form.publicFormDescription}
							</p>
						)}

						{currentStyle !== "terminal" && <Separator className="mt-6 opacity-40" />}
						
						<div className={`text-[11px] font-bold uppercase tracking-widest mt-4 ${isTerminal ? 'text-green-500/50' : 'text-red-500'}`}>
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
						fields.map((field) => {
							const fieldKey = field.name || field.id || "unnamed";
							return (
							<Card key={fieldKey} className={`p-6 md:p-8 transition-all group ${theme.card}`}>
								<div className="space-y-4">
									<Label htmlFor={fieldKey} className={`flex items-start gap-1.5 leading-snug ${theme.label} ${isTerminal ? 'text-green-500' : ''}`}>
										{field.label}
										{field.required && <span className={`${isTerminal ? 'text-green-500' : 'text-red-500'} text-xl font-black leading-none`}>*</span>}
									</Label>

									<div className="pt-1">
										{field.type === "textarea" ? (
											<Textarea
												id={fieldKey}
												name={fieldKey}
												required={field.required}
												placeholder={field.placeholder || "Your answer"}
												className={`${theme.input} min-h-[40px] resize-none overflow-hidden`}
												style={!isTerminal && currentStyle !== "minimal" && currentStyle !== "notion" ? { borderBottomColor: formData[fieldKey] ? form.publicFormThemeColor : undefined } : {}}
												value={formData[fieldKey] || ""}
												onChange={(e) => {
													setFormData({ ...formData, [fieldKey]: e.target.value });
													e.target.style.height = 'auto';
													e.target.style.height = e.target.scrollHeight + 'px';
												}}
											/>
										) : field.type === "radio" ? (
											<RadioGroup 
												onValueChange={(val) => setFormData({ ...formData, [fieldKey]: val })}
												className="flex flex-col gap-4"
											>
												{field.options?.map((option, i) => (
													<div key={`${fieldKey}-${option}-${i}`} className="flex items-center space-x-3 group/opt">
														<RadioGroupItem 
															value={option} 
															id={`${fieldKey}-${option}`} 
															className={`border-2 ${isTerminal ? 'border-green-500/50 text-green-500' : 'border-muted-foreground/30'}`}
															style={!isTerminal && currentStyle !== "notion" && currentStyle !== "minimal" ? { color: form.publicFormThemeColor } : {}}
														/>
														<Label htmlFor={`${fieldKey}-${option}`} className={`cursor-pointer flex-1 py-1 transition-colors ${theme.label.replace('mb-3', '').replace('mb-2', '')}`}>
															{option}
														</Label>
													</div>
												))}
											</RadioGroup>
										) : field.type === "checkbox" ? (
											<div className="flex flex-col gap-4">
												{field.options?.map((option, i) => (
													<div key={`${fieldKey}-${option}-${i}`} className="flex items-center space-x-3 group/opt">
														<Checkbox 
															id={`${fieldKey}-${option}`} 
															className={`border-2 data-[state=checked]:border-none ${isTerminal ? 'border-green-500/50 text-green-500' : 'border-muted-foreground/30'}`}
															style={!isTerminal && currentStyle !== "notion" && currentStyle !== "minimal" && (formData[fieldKey] as unknown as string[])?.includes(option) ? { backgroundColor: form.publicFormThemeColor } : {}}
															onCheckedChange={(checked) => {
																const current = (formData[fieldKey] as unknown as string[]) || [];
																const next = checked 
																	? [...current, option] 
																	: current.filter(i => i !== option);
																setFormData({ ...formData, [fieldKey]: next as any });
															}}
														/>
														<Label htmlFor={`${fieldKey}-${option}`} className={`cursor-pointer flex-1 py-1 transition-colors ${theme.label.replace('mb-3', '').replace('mb-2', '')}`}>
															{option}
														</Label>
													</div>
												))}
											</div>
										) : field.type === "select" ? (
											<Select onValueChange={(val) => setFormData({ ...formData, [fieldKey]: val })}>
												<SelectTrigger className={`w-full md:w-1/2 h-11 bg-background/50 border-muted-foreground/20 ${theme.input.includes('rounded-none') ? 'rounded-none' : 'rounded-lg'} ${isTerminal ? 'border-green-500/50 text-green-500' : ''}`}>
													<SelectValue placeholder={field.placeholder || "Choose an option"} />
												</SelectTrigger>
												<SelectContent className={`${theme.input.includes('rounded-none') ? 'rounded-none' : 'rounded-xl'} ${isTerminal ? 'bg-black border-green-500 text-green-500' : ''}`}>
													{field.options?.map((option, i) => (
														<SelectItem key={`${fieldKey}-${option}-${i}`} value={option} className={isTerminal ? 'focus:bg-green-500/20 focus:text-green-500' : ''}>{option}</SelectItem>
													))}
												</SelectContent>
											</Select>
										) : (
											<Input
												id={fieldKey}
												name={fieldKey}
												type={field.type}
												required={field.required}
												placeholder={field.placeholder || "Your answer"}
												className={`${theme.input} h-auto`}
												style={!isTerminal && currentStyle !== "minimal" && currentStyle !== "notion" ? { borderBottomColor: formData[fieldKey] ? form.publicFormThemeColor : undefined } : {}}
												value={formData[fieldKey] || ""}
												onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.value })}
											/>
										)}
									</div>
								</div>
							</Card>
							);
						})
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
							className={`${theme.button} px-8 h-12`}
							style={currentStyle === "default" || currentStyle === "playful" ? { backgroundColor: form.publicFormThemeColor, color: "#fff", borderColor: currentStyle === "playful" ? "#000" : undefined } : {}}
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
							className={`text-xs font-bold uppercase tracking-widest hover:text-foreground ${isTerminal ? 'text-green-500/50 hover:text-green-500' : 'text-muted-foreground'}`}
							onClick={() => {
								setFormData({});
								setStatus("idle");
							}}
						>
							Clear form
						</Button>
					</div>
				</form>

				<footer className={`pt-12 pb-8 flex flex-col items-center gap-6 ${isTerminal ? 'opacity-50' : ''}`}>
					<div className="flex items-center gap-3">
						<span className={`text-[11px] font-bold uppercase tracking-tighter ${isTerminal ? 'text-green-500' : 'text-muted-foreground'}`}>Powered by</span>
						<div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${isTerminal ? 'border border-green-500 text-green-500' : 'bg-foreground text-background shadow-lg'}`}>
							FormGuard
						</div>
					</div>
					<div className={`text-[10px] font-medium ${isTerminal ? 'text-green-500/50' : 'text-muted-foreground/60'}`}>
						This content is neither created nor endorsed by FormGuard.
					</div>
				</footer>
			</div>
		</div>
	);
}
