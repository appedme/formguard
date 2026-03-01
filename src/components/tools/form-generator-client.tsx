"use client";

import { useState } from "react";
import { 
	Card, 
	CardContent, 
	CardHeader,
	CardTitle,
	CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { 
	CheckCircle2, 
	Copy, 
	Code2, 
	Eye,
	AlignLeft,
	Mail,
	Phone,
	Building2,
	ChevronDown
} from "lucide-react";
import { toast } from "sonner";

interface FormField {
	id: string;
	label: string;
	type: string;
	icon: any;
	required: boolean;
	enabled: boolean;
	defaultEnabled: boolean;
	placeholder: string;
}

const DEFAULT_FIELDS: FormField[] = [
	{ id: "name", label: "Full Name", type: "text", icon: AlignLeft, required: true, enabled: true, defaultEnabled: true, placeholder: "John Doe" },
	{ id: "email", label: "Email Address", type: "email", icon: Mail, required: true, enabled: true, defaultEnabled: true, placeholder: "john@acme.com" },
	{ id: "company", label: "Company", type: "text", icon: Building2, required: false, enabled: false, defaultEnabled: false, placeholder: "Acme Corp" },
	{ id: "phone", label: "Phone Number", type: "tel", icon: Phone, required: false, enabled: false, defaultEnabled: false, placeholder: "+1 (555) 000-0000" },
	{ id: "message", label: "Message", type: "textarea", icon: AlignLeft, required: true, enabled: true, defaultEnabled: true, placeholder: "How can we help?" },
];

export function FormGeneratorClient() {
	const [fields, setFields] = useState<FormField[]>(DEFAULT_FIELDS);
	const [formTheme, setFormTheme] = useState<"light" | "dark" | "system">("system");
	const [showLabels, setShowLabels] = useState(true);

	const toggleField = (id: string) => {
		setFields(fields.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
	};

	const toggleRequired = (id: string) => {
		setFields(fields.map(f => f.id === id ? { ...f, required: !f.required } : f));
	};

	const generateHtml = () => {
		const enabledFields = fields.filter(f => f.enabled);

		const htmlFields = enabledFields.map(f => {
			const requiredAttr = f.required ? " required" : "";
			const labelHtml = showLabels ? `\n    <label for="${f.id}" class="block text-sm font-medium text-gray-700 mb-1">${f.label}${f.required ? ' <span class="text-red-500">*</span>' : ''}</label>` : '';
			
			let inputHtml = "";
			if (f.type === "textarea") {
				inputHtml = `\n    <textarea name="${f.id}" id="${f.id}" rows="4" placeholder="${f.placeholder}"${requiredAttr} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"></textarea>`;
			} else {
				inputHtml = `\n    <input type="${f.type}" name="${f.id}" id="${f.id}" placeholder="${f.placeholder}"${requiredAttr} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />`;
			}

			return `  <div>${labelHtml}${inputHtml}\n  </div>`;
		}).join("\n\n");

		return `<!-- 
  Install Tailwind CSS: https://tailwindcss.com/docs/installation
  Powered by FormGuard: https://formguard.strivio.world
-->
<form action="YOUR_FORMGUARD_ENDPOINT_URL" method="POST" class="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-5 font-sans">
  <div class="mb-6">
    <h2 class="text-2xl font-bold text-gray-900">Contact Us</h2>
    <p class="text-gray-500 text-sm mt-1">We'll get back to you as soon as possible.</p>
  </div>

${htmlFields}

  <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors mt-2">
    Send Message
  </button>
  
  <p class="text-xs text-center text-gray-400 mt-4">Protected by FormGuard AI</p>
</form>`;
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(generateHtml());
		toast.success("HTML copied to clipboard!");
	};

	const enabledCount = fields.filter(f => f.enabled).length;

	return (
		<div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row gap-8 min-h-[700px]">
			{/* Left Column: Builder */}
			<div className="w-full md:w-1/3 flex flex-col gap-6">
				<Card className="border-border/40 shadow-none bg-card/60 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<CardTitle className="text-lg flex items-center gap-2">
							<AlignLeft className="w-5 h-5 text-primary" />
							Form Fields
						</CardTitle>
						<CardDescription>Toggle the fields you want to include in your form block.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{fields.map((field) => (
							<div key={field.id} className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-background/50">
								<div className="flex items-center gap-3">
									<div className={`w-8 h-8 rounded-lg flex items-center justify-center ${field.enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
										<field.icon className="w-4 h-4" />
									</div>
									<div className="flex flex-col">
										<span className="text-sm font-medium text-foreground">{field.label}</span>
										<span className="text-[10px] text-muted-foreground font-mono uppercase">{field.type}</span>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<button 
										onClick={() => toggleRequired(field.id)}
										disabled={!field.enabled}
										className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors ${!field.enabled ? 'opacity-30' : field.required ? 'bg-red-500/10 text-red-500' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
									>
										REQ
									</button>
									<Switch 
										checked={field.enabled}
										onCheckedChange={() => toggleField(field.id)}
									/>
								</div>
							</div>
						))}
					</CardContent>
				</Card>

				<Card className="border-border/40 shadow-none bg-card/60 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<CardTitle className="text-sm">Settings</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm text-foreground">Show Labels</span>
							<Switch checked={showLabels} onCheckedChange={setShowLabels} />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Right Column: Preview & Code */}
			<div className="w-full md:w-2/3 flex flex-col h-full min-h-[600px]">
				<Tabs defaultValue="preview" className="flex-1 flex flex-col h-full w-full">
					<div className="flex items-center justify-between mb-4">
						<TabsList className="bg-background/80 border border-border/40">
							<TabsTrigger value="preview" className="text-xs font-semibold px-4 gap-2 data-[state=active]:bg-muted">
								<Eye className="w-3.5 h-3.5" /> Preview
							</TabsTrigger>
							<TabsTrigger value="code" className="text-xs font-semibold px-4 gap-2 data-[state=active]:bg-muted">
								<Code2 className="w-3.5 h-3.5" /> Source Code
							</TabsTrigger>
						</TabsList>
						
						<Button 
							size="sm" 
							className="h-9 px-4 gap-2 bg-foreground text-background hover:bg-foreground/90 font-bold"
							onClick={handleCopy}
							disabled={enabledCount === 0}
						>
							<Copy className="w-3.5 h-3.5" />
							Copy HTML
						</Button>
					</div>

					{/* Visual Preview */}
					<TabsContent value="preview" className="m-0 flex-1 h-full w-full bg-[#f8fafc] rounded-2xl border border-border/40 overflow-hidden flex items-center justify-center p-8 relative">
						{/* Grid Background Pattern */}
						<div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
						
						{enabledCount === 0 ? (
							<div className="text-center z-10">
								<p className="text-muted-foreground font-medium">Select at least one field to preview the form.</p>
							</div>
						) : (
							<div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-5 font-sans z-10">
								<div className="mb-6">
									<h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
									<p className="text-gray-500 text-sm mt-1">We'll get back to you as soon as possible.</p>
								</div>

								{fields.filter(f => f.enabled).map((field) => (
									<div key={field.id}>
										{showLabels && (
											<label className="block text-sm font-medium text-gray-700 mb-1">
												{field.label}
												{field.required && <span className="text-red-500 ml-1">*</span>}
											</label>
										)}
										{field.type === "textarea" ? (
											<textarea
												rows={4}
												placeholder={field.placeholder}
												className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none bg-white text-gray-900"
											/>
										) : (
											<input
												type={field.type}
												placeholder={field.placeholder}
												className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-900"
											/>
										)}
									</div>
								))}

								<button 
									type="button" 
									className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors mt-2"
									onClick={(e) => {
										e.preventDefault();
										toast("This is just a visual preview!");
									}}
								>
									Send Message
								</button>
								<p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
									Protected by FormGuard AI
								</p>
							</div>
						)}
					</TabsContent>

					{/* Code View */}
					<TabsContent value="code" className="m-0 flex-1 h-full w-full rounded-2xl overflow-hidden border border-border/40 relative">
						{enabledCount === 0 ? (
							<div className="h-full w-full bg-muted/30 flex items-center justify-center">
								<p className="text-muted-foreground font-medium">Select at least one field to generate code.</p>
							</div>
						) : (
							<div className="h-[600px] w-full overflow-auto bg-[#0d1117] p-6 text-[13px] font-mono leading-relaxed text-[#c9d1d9] shadow-inner selection:bg-[#3392FF] selection:text-white relative rounded-2xl">
								<pre className="m-0 bg-transparent p-0">
									<code>
										{generateHtml()}
									</code>
								</pre>
							</div>
						)}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
