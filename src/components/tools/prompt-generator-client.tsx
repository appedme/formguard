"use client";

import { useState, useEffect } from "react";
import { 
	Card, 
	CardContent, 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
	Copy, 
	ExternalLink, 
	Check, 
	Eraser,
	Sparkles,
	Zap,
	LayoutGrid,
	Search,
	Bot,
	MessageSquare,
	Cpu
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PLATFORMS = [
	{
		id: "chatgpt",
		name: "ChatGPT",
		baseUrl: "https://chat.openai.com/?q=",
		color: "text-emerald-500",
		bgColor: "bg-emerald-500/5",
		borderColor: "border-emerald-500/10",
		icon: MessageSquare,
		description: "OpenAI's industry leader."
	},
	{
		id: "claude",
		name: "Claude",
		baseUrl: "https://claude.ai/new?q=",
		color: "text-orange-500",
		bgColor: "bg-orange-500/5",
		borderColor: "border-orange-500/10",
		icon: Bot,
		description: "Anthropic's reasoning giant."
	},
	{
		id: "gemini",
		name: "Gemini",
		baseUrl: "https://gemini.google.com/app?q=",
		color: "text-blue-500",
		bgColor: "bg-blue-500/5",
		borderColor: "border-blue-500/10",
		icon: Sparkles,
		description: "Google's search-integrated AI."
	},
	{
		id: "perplexity",
		name: "Perplexity",
		baseUrl: "https://www.perplexity.ai/?q=",
		color: "text-cyan-500",
		bgColor: "bg-cyan-500/5",
		borderColor: "border-cyan-500/10",
		icon: Search,
		description: "The AI search engine."
	},
	{
		id: "deepseek",
		name: "DeepSeek",
		baseUrl: "https://chat.deepseek.com/?q=",
		color: "text-indigo-500",
		bgColor: "bg-indigo-500/5",
		borderColor: "border-indigo-500/10",
		icon: Cpu,
		description: "High-performance open weights."
	},
	{
		id: "grok",
		name: "Grok (X)",
		baseUrl: "https://x.com/i/grok?q=",
		color: "text-gray-400",
		bgColor: "bg-gray-400/5",
		borderColor: "border-gray-400/10",
		icon: Zap,
		description: "X's real-time AI interface."
	},
];

export function PromptGeneratorClient() {
	const [prompt, setPrompt] = useState("");
	const [mounted, setMounted] = useState(false);
	const [copiedId, setCopiedId] = useState<string | null>(null);

	// Persist prompt in URL for shareability
	useEffect(() => {
		setMounted(true);
		const params = new URLSearchParams(window.location.search);
		const p = params.get("p");
		if (p) {
			setPrompt(decodeURIComponent(p));
		}
	}, []);

	const updateUrl = (text: string) => {
		const url = new URL(window.location.href);
		if (text) {
			url.searchParams.set("p", encodeURIComponent(text));
		} else {
			url.searchParams.delete("p");
		}
		window.history.replaceState({}, "", url.toString());
	};

	const handlePromptChange = (val: string) => {
		setPrompt(val);
		updateUrl(val);
	};

	const getEncodedUrl = (baseUrl: string) => {
		return baseUrl + encodeURIComponent(prompt);
	};

	const handleCopy = (baseUrl: string, id: string) => {
		if (!prompt) {
			toast.error("Please enter a prompt first");
			return;
		}
		const url = getEncodedUrl(baseUrl);
		navigator.clipboard.writeText(url);
		setCopiedId(id);
		toast.success(`Link for ${PLATFORMS.find(p => p.id === id)?.name} copied!`);
		setTimeout(() => setCopiedId(null), 2000);
	};

	const openAll = () => {
		if (!prompt) {
			toast.error("Please enter a prompt first");
			return;
		}
		PLATFORMS.forEach((platform) => {
			window.open(getEncodedUrl(platform.baseUrl), "_blank");
		});
		toast.success("Opening 6 platforms...");
	};

	const clearPrompt = () => {
		setPrompt("");
		updateUrl("");
	};

	if (!mounted) return null;

	return (
		<div className="space-y-8">
			{/* Text Area Card */}
			<Card className="border-border/40 bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/5 p-6 rounded-2xl overflow-hidden relative">
				<div className="flex items-center justify-between mb-4">
					<label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
						Your AI Prompt
					</label>
					{prompt && (
						<Button 
							variant="ghost" 
							size="sm" 
							onClick={clearPrompt}
							className="h-7 text-[10px] text-muted-foreground hover:text-destructive transition-colors gap-1.5 px-2"
						>
							<Eraser className="w-3 h-3" />
							Clear
						</Button>
					)}
				</div>
				<Textarea
					placeholder="Describe what you want to build, write, or solve..."
					className="min-h-[220px] resize-none bg-background/50 border-border/40 focus-visible:ring-primary/20 text-base leading-relaxed p-4 rounded-xl transition-all"
					value={prompt}
					onChange={(e) => handlePromptChange(e.target.value)}
				/>
				<div className="mt-6 flex flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
						<span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tight">Real-time Link Generation Enabled</span>
					</div>
					<Button 
						onClick={openAll}
						disabled={!prompt}
						className="h-9 px-5 bg-foreground text-background hover:bg-foreground/90 transition-all rounded-full text-xs font-bold gap-2"
					>
						<LayoutGrid className="w-3.5 h-3.5" />
						Open All in Tabs
					</Button>
				</div>
			</Card>

			{/* Platforms Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{PLATFORMS.map((platform) => (
					<Card 
						key={platform.id} 
						className={cn(
							"group border-border/40 bg-card/40 hover:bg-accent/40 transition-all duration-300 shadow-none border rounded-xl overflow-hidden",
							!prompt && "opacity-50 grayscale pointer-events-none"
						)}
					>
						<CardContent className="p-5">
							<div className="flex items-start justify-between mb-4">
								<div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border", platform.bgColor, platform.color, platform.borderColor)}>
									<platform.icon className="w-5 h-5" />
								</div>
								<div className="flex items-center gap-1">
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 rounded-full hover:bg-background/80"
										onClick={() => handleCopy(platform.baseUrl, platform.id)}
										title="Copy pre-filled link"
									>
										{copiedId === platform.id ? (
											<Check className="w-3.5 h-3.5 text-green-500" />
										) : (
											<Copy className="w-3.5 h-3.5" />
										)}
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 rounded-full hover:bg-background/80"
										asChild
									>
										<a 
											href={getEncodedUrl(platform.baseUrl)} 
											target="_blank" 
											rel="noopener noreferrer"
											title={`Open in ${platform.name}`}
										>
											<ExternalLink className="w-3.5 h-3.5" />
										</a>
									</Button>
								</div>
							</div>
							<h3 className="text-sm font-bold text-foreground mb-1">{platform.name}</h3>
							<p className="text-[10px] text-muted-foreground line-clamp-1">{platform.description}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
