import { PromptGeneratorClient } from "@/components/tools/prompt-generator-client";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Free AI Prompt URL Generator | Share Prompts Instantly",
	description: "Generate one-click shareable links for your AI prompts. Works with ChatGPT, Claude, Gemini, Perplexity, DeepSeek, and Grok. Free, no sign-up.",
	keywords: "prompt generator, ai prompt links, share chatgpt prompt, claude prompt link, gemini prompt url, perplexity link, grok prompt, deepseek prompt",
};

export default function PromptGeneratorPage() {
	return (
		<div className="bg-background min-h-screen">
			{/* Minimal Header */}
			<section className="pt-20 pb-12 border-b border-border/50">
				<div className="mx-auto max-w-4xl px-6 text-center">
					<Badge variant="outline" className="mb-6 px-3 py-1 text-[10px] uppercase tracking-widest font-mono text-primary border-primary/20 bg-primary/5">
						AI Utilities
					</Badge>
					<h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
						AI Prompt URL Generator
					</h1>
					<p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
						Type your prompt once, get instant shareable links for all major AI chatbots.
					</p>
				</div>
			</section>

			{/* Tool Interface */}
			<section className="py-12 bg-muted/20">
				<div className="mx-auto max-w-4xl px-6">
					<PromptGeneratorClient />
				</div>
			</section>

			{/* SEO Content Section */}
			<section className="py-24 border-t border-border/50">
				<div className="mx-auto max-w-4xl px-6">
					<div className="prose prose-sm prose-invert max-w-none">
						<h2 className="text-2xl font-bold text-foreground mb-6">How to use the Prompt URL Generator</h2>
						<p className="text-muted-foreground mb-4">
							Sharing AI prompts can be friction-heavy. Usually, you have to copy a wall of text, send it to someone, and they have to manually paste it into their preferred AI chatbot.
						</p>
						<p className="text-muted-foreground mb-8">
							FormGuard's **AI Prompt URL Generator** simplifies this into a single click. Simply enter your prompt, and we'll generate pre-filled links for the world's most popular AI models.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
							<div>
								<h3 className="text-lg font-bold text-foreground mb-4">Supported Platforms</h3>
								<ul className="space-y-2 text-muted-foreground">
									<li><strong>ChatGPT:</strong> Opens chat.openai.com with your prompt ready.</li>
									<li><strong>Claude:</strong> Direct link to Anthropic's Claude interface.</li>
									<li><strong>Gemini:</strong> Deep-linked prompt for Google's Gemini.</li>
									<li><strong>Perplexity:</strong> Search-ready link for AI answers.</li>
									<li><strong>DeepSeek:</strong> The newest powerhouse, supported natively.</li>
									<li><strong>Grok:</strong> X's AI generator links included.</li>
								</ul>
							</div>
							<div>
								<h3 className="text-lg font-bold text-foreground mb-4">Why use this?</h3>
								<ul className="space-y-2 text-muted-foreground">
									<li><strong>Zero Friction:</strong> One link, one click, one prompt.</li>
									<li><strong>No Sign-up:</strong> Completely free to use for any builder.</li>
									<li><strong>Tab Storming:</strong> Open all platforms at once to compare outputs.</li>
									<li><strong>SEO Ready:</strong> Perfect for technical blog posts and documentation.</li>
								</ul>
							</div>
						</div>

						<div className="mt-16 pt-12 border-t border-border/40">
							<h3 className="text-xl font-bold text-foreground mb-6">Frequently Asked Questions</h3>
							<div className="space-y-6">
								<div>
									<h4 className="font-bold text-foreground mb-2">Is my prompt data saved?</h4>
									<p className="text-muted-foreground text-sm">No. We don't store your prompts. The generator works by encoding your text into URL parameters that the destination sites understand. Everything happens in your browser.</p>
								</div>
								<div>
									<h4 className="font-bold text-foreground mb-2">Can I open all links at once?</h4>
									<p className="text-muted-foreground text-sm">Yes! Use the "Open All Submissions" button to trigger multiple tabs. Note: Your browser might ask for permission to open multiple pop-ups.</p>
								</div>
								<div>
									<h4 className="font-bold text-foreground mb-2">Does this cost anything?</h4>
									<p className="text-muted-foreground text-sm">Absolutely not. This is a free utility from the FormGuard team to help builders move faster.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
