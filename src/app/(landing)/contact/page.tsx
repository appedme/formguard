import { ContactForm } from "@/components/landing/contact-form";
import { MessageSquare, Mail, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
	title: "Contact & Feedback — FormGuard",
	description: "Help us make FormGuard better. Share your feedback, report bugs, or request features directly from the source.",
};

export default function ContactPage() {
	return (
		<div className="bg-background min-h-screen pb-32">
			{/* Hero Section */}
			<section className="py-24 border-b border-border bg-muted/20">
				<div className="mx-auto max-w-6xl px-6">
					<div className="flex items-center gap-2 mb-6 text-primary">
						<MessageSquare className="w-5 h-5" />
						<span className="text-[10px] font-mono uppercase tracking-[0.2em] font-black">Direct Communication</span>
					</div>
					<h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground mb-8 leading-tight">
                        We thrive on <br/><span className="text-primary italic">your</span> feedback.
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
						Bugs, feature requests, or just a quick integration question—our engineering team reads every single message sent through this portal.
					</p>
				</div>
			</section>

			<div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-20">
				{/* Left Side - Context */}
				<div className="lg:col-span-5 space-y-12">
					<div className="space-y-6">
						<h2 className="text-2xl font-black text-foreground tracking-tight">How we handle feedback</h2>
						<p className="text-muted-foreground text-sm leading-relaxed">
							FormGuard is built for developers, by developers. Your input directly influences our roadmap and infrastructure priorities.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-4">
						<div className="p-6 bg-muted/30 border border-border/40 rounded-2xl flex items-start gap-4 transition-all hover:bg-muted/50">
							<div className="p-2 bg-primary/10 rounded-lg shrink-0">
								<Zap className="w-4 h-4 text-primary" />
							</div>
							<div>
								<h4 className="font-bold text-foreground text-sm mb-1">Fast Response</h4>
								<p className="text-xs text-muted-foreground leading-relaxed">We aim to respond to technical inquiries within 24 hours.</p>
							</div>
						</div>

						<div className="p-6 bg-muted/30 border border-border/40 rounded-2xl flex items-start gap-4 transition-all hover:bg-muted/50">
							<div className="p-2 bg-primary/10 rounded-lg shrink-0 text-primary">
								<ShieldCheck className="w-4 h-4" />
							</div>
							<div>
								<h4 className="font-bold text-foreground text-sm mb-1">Privacy First</h4>
								<p className="text-xs text-muted-foreground leading-relaxed">Your message is stored securely and never shared with third parties.</p>
							</div>
						</div>

						<div className="p-6 bg-muted/30 border border-border/40 rounded-2xl flex items-start gap-4 transition-all hover:bg-muted/50">
							<div className="p-2 bg-primary/10 rounded-lg shrink-0 text-primary">
								<Mail className="w-4 h-4" />
							</div>
							<div>
								<h4 className="font-bold text-foreground text-sm mb-1">Direct Support</h4>
								<p className="text-xs text-muted-foreground leading-relaxed">Talk directly to the engineers building the platform.</p>
							</div>
						</div>
					</div>
				</div>

				{/* Right Side - Form */}
				<div className="lg:col-span-7">
					<div className="p-8 md:p-12 bg-card border border-border rounded-[32px] shadow-sm">
						<ContactForm />
					</div>
				</div>
			</div>
		</div>
	);
}
