"use client";

import { useState } from "react";
import { 
	Card, 
	CardContent, 
	CardHeader,
	CardTitle,
	CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { 
	Copy, 
	Image as ImageIcon,
	Link as LinkIcon,
	Code2,
	Eye
} from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export function MetaTagClient() {
	const [form, setForm] = useState({
		title: "FormGuard - Free AI Form Backend",
		description: "Launch forms instantly, block spam with AI, and sync to Google Sheets without writing backend code.",
		url: "https://formguard.strivio.world",
		image: "https://formguard.strivio.world/og-image.png",
		siteName: "FormGuard",
		twitterHandle: "@strivio_inc"
	});

	const handleChange = (field: keyof typeof form, value: string) => {
		setForm(prev => ({ ...prev, [field]: value }));
	};

	const generateTags = () => {
		return `<!-- Primary Meta Tags -->
<title>${form.title}</title>
<meta name="title" content="${form.title}" />
<meta name="description" content="${form.description}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${form.url}" />
<meta property="og:title" content="${form.title}" />
<meta property="og:description" content="${form.description}" />
<meta property="og:image" content="${form.image}" />
${form.siteName ? `<meta property="og:site_name" content="${form.siteName}" />\n` : ''}
<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${form.url}" />
<meta property="twitter:title" content="${form.title}" />
<meta property="twitter:description" content="${form.description}" />
<meta property="twitter:image" content="${form.image}" />
${form.twitterHandle ? `<meta name="twitter:creator" content="${form.twitterHandle}" />\n<meta name="twitter:site" content="${form.twitterHandle}" />` : ''}`;
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(generateTags());
		toast.success("Meta tags copied to clipboard!");
	};

	return (
		<div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row gap-8 min-h-[700px]">
			{/* Left Column: Editor */}
			<div className="w-full md:w-1/3 flex flex-col gap-6">
				<Card className="border-border/40 shadow-none bg-card/60 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<CardTitle className="text-lg">Page Details</CardTitle>
						<CardDescription>Enter the metadata for your webpage.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-5">
						<div className="space-y-2">
							<Label htmlFor="title" className="text-xs font-bold uppercase text-muted-foreground">Title</Label>
							<Input 
								id="title"
								value={form.title}
								onChange={(e) => handleChange("title", e.target.value)}
								placeholder="Super amazing website"
								className="bg-background/50 h-9"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="description" className="text-xs font-bold uppercase text-muted-foreground">Description</Label>
							<Textarea 
								id="description"
								value={form.description}
								onChange={(e) => handleChange("description", e.target.value)}
								placeholder="A short description of the page..."
								className="bg-background/50 resize-none h-20"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="image" className="text-xs font-bold uppercase text-muted-foreground flex items-center justify-between">
								<span>Image URL</span>
								<ImageIcon className="w-3.5 h-3.5" />
							</Label>
							<Input 
								id="image"
								value={form.image}
								onChange={(e) => handleChange("image", e.target.value)}
								placeholder="https://example.com/og.png"
								className="bg-background/50 h-9"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="url" className="text-xs font-bold uppercase text-muted-foreground flex items-center justify-between">
								<span>Canonical URL</span>
								<LinkIcon className="w-3.5 h-3.5" />
							</Label>
							<Input 
								id="url"
								value={form.url}
								onChange={(e) => handleChange("url", e.target.value)}
								placeholder="https://example.com"
								className="bg-background/50 h-9"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="siteName" className="text-xs font-bold uppercase text-muted-foreground">Site Name</Label>
								<Input 
									id="siteName"
									value={form.siteName}
									onChange={(e) => handleChange("siteName", e.target.value)}
									placeholder="MySite"
									className="bg-background/50 h-9"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="twitterHandle" className="text-xs font-bold uppercase text-muted-foreground">Twitter @</Label>
								<Input 
									id="twitterHandle"
									value={form.twitterHandle}
									onChange={(e) => handleChange("twitterHandle", e.target.value)}
									placeholder="@username"
									className="bg-background/50 h-9"
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Right Column: Previews */}
			<div className="w-full md:w-2/3 flex flex-col h-full min-h-[600px]">
				<Tabs defaultValue="preview" className="flex-1 flex flex-col h-full w-full">
					<div className="flex items-center justify-between mb-4">
						<TabsList className="bg-background/80 border border-border/40">
							<TabsTrigger value="preview" className="text-xs font-semibold px-4 gap-2 data-[state=active]:bg-muted">
								<Eye className="w-3.5 h-3.5" /> Social Previews
							</TabsTrigger>
							<TabsTrigger value="code" className="text-xs font-semibold px-4 gap-2 data-[state=active]:bg-muted">
								<Code2 className="w-3.5 h-3.5" /> HTML Code
							</TabsTrigger>
						</TabsList>
						
						<Button 
							size="sm" 
							className="h-9 px-4 gap-2 bg-foreground text-background hover:bg-foreground/90 font-bold"
							onClick={handleCopy}
						>
							<Copy className="w-3.5 h-3.5" />
							Copy Meta Tags
						</Button>
					</div>

					<TabsContent value="preview" className="m-0 flex-1 h-full w-full bg-[#f8fafc] rounded-2xl border border-border/40 overflow-auto p-8 relative space-y-12">
						{/* Twitter/X Preview */}
						<div>
							<h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
								<svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.126H5.078z"></path></g></svg>
								X (Twitter) Link
							</h3>
							
							<div className="max-w-[500px] border border-slate-200 rounded-2xl overflow-hidden bg-white hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
								<div className="aspect-[1.91/1] bg-slate-100 border-b border-slate-200 relative overflow-hidden">
									{form.image ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img src={form.image} alt={form.title} className="w-full h-full object-cover" />
									) : (
										<div className="absolute inset-0 flex items-center justify-center text-slate-400">No Image Specified</div>
									)}
								</div>
								<div className="p-3">
									<div className="text-[13px] text-slate-500 mb-0.5 truncate">{new URL(form.url || "https://example.com").hostname}</div>
									<div className="text-[15px] text-slate-900 line-clamp-2 leading-snug">{form.title || "Untitled"}</div>
									<div className="text-[15px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">{form.description}</div>
								</div>
							</div>
						</div>

						{/* LinkedIn Preview */}
						<div>
							<h3 className="text-sm font-bold text-[#0a66c2] mb-4 flex items-center gap-2">
								<svg viewBox="0 0 28 28" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M26.29 2H1.7A1.69 1.69 0 000 3.63v20.72A1.67 1.67 0 001.7 26h24.59A1.66 1.66 0 0028 24.35V3.63A1.68 1.68 0 0026.29 2zM8.36 22.36H4.2V10.19h4.16zM6.28 8.56a2.41 2.41 0 112.44-2.4 2.41 2.41 0 01-2.44 2.4H6.27zM23.8 22.36h-4.16v-5.91c0-1.41-.05-3.23-2-3.23-2 0-2.3 1.54-2.3 3.12v6H11.2V10.19h4v1.67h.06c.55-1 1.9-2.14 3.9-2.14 4.18 0 4.95 2.75 4.95 6.33z"></path></svg>
								LinkedIn Post
							</h3>
							
							<div className="max-w-[552px] border border-slate-300 rounded-[2px] bg-white cursor-pointer shadow-sm">
								<div className="aspect-[1.91/1] bg-slate-100 border-b border-slate-200 relative overflow-hidden">
									{form.image ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img src={form.image} alt={form.title} className="w-full h-full object-cover" />
									) : (
										<div className="absolute inset-0 flex items-center justify-center text-slate-400">No Image Specified</div>
									)}
								</div>
								<div className="py-2 px-4 bg-[#f3f2ef]">
									<div className="text-sm font-semibold text-slate-900 truncate">{form.title || "Untitled"}</div>
									<div className="text-xs text-slate-500 truncate mt-0.5">{new URL(form.url || "https://example.com").hostname}</div>
								</div>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="code" className="m-0 flex-1 h-full w-full rounded-2xl overflow-hidden border border-border/40 relative">
						<div className="h-[600px] w-full overflow-auto bg-[#0d1117] p-6 text-[13px] font-mono leading-relaxed text-[#c9d1d9] shadow-inner selection:bg-[#3392FF] selection:text-white relative rounded-2xl">
							<pre className="m-0 bg-transparent p-0">
								<code>
									{generateTags()}
								</code>
							</pre>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
