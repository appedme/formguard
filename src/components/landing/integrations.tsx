import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
	Database, 
	MessageSquare, 
	Table, 
	Webhook, 
	Github, 
	Slack, 
	Mail,
	Plus
} from "lucide-react";

const integrations = [
	{ name: "Notion", icon: Database, status: "Soon", color: "text-black" },
	{ name: "Google Sheets", icon: Table, status: "Soon", color: "text-green-600" },
	{ name: "Slack", icon: Slack, status: "Active", color: "text-blue-500" },
	{ name: "Discord", icon: MessageSquare, status: "Soon", color: "text-indigo-500" },
	{ name: "Email Notifications", icon: Mail, status: "Active", color: "text-red-500" },
	{ name: "GitHub Issues", icon: Github, status: "Soon", color: "text-slate-900" },
];

export default function Integrations() {
	return (
		<section className="py-24 border-b border-border bg-background relative overflow-hidden">
			{/* Subtle decorative background elements */}
			<div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
			<div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

			<div className="mx-auto max-w-6xl px-6">
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
					<div>
						<p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 font-semibold">
							Integrations
						</p>
						<h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
							Connected to your <br />
							<span className="text-muted-foreground font-medium">favorite workspace.</span>
						</h2>
					</div>
					<div className="flex items-center gap-3">
						<Badge variant="outline" className="rounded-full px-4 py-1 text-xs font-bold border-border bg-muted/30">
							100+ More coming soon
						</Badge>
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
					{integrations.map((item) => (
						<Card 
							key={item.name} 
							className="bg-card/50 shadow-none border-border/60 hover:border-primary/30 transition-all duration-300 group"
						>
							<CardContent className="p-6 flex flex-col items-center text-center">
								<div className={`w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${item.color}`}>
									<item.icon className="w-6 h-6" />
								</div>
								<h3 className="text-xs font-bold text-foreground mb-1">{item.name}</h3>
								<p className={`text-[10px] font-bold uppercase tracking-widest ${item.status === "Active" ? "text-green-500" : "text-muted-foreground/60"}`}>
									{item.status}
								</p>
							</CardContent>
						</Card>
					))}
					
					{/* Placeholder for 100+ more */}
					<Card className="bg-primary/5 shadow-none border-primary/20 border-dashed transition-all duration-300 flex items-center justify-center">
						<CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
							<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
								<Plus className="w-5 h-5 text-primary" />
							</div>
							<p className="text-[10px] font-bold text-primary uppercase tracking-widest">
								100+ More
							</p>
						</CardContent>
					</Card>
				</div>
				
				<div className="mt-16 p-8 bg-muted/30 border border-border/60 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
					<div className="flex items-center gap-6">
						<div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center shrink-0 shadow-sm">
							<Webhook className="w-7 h-7 text-primary" />
						</div>
						<div>
							<h4 className="text-sm font-bold text-foreground mb-1">Custom Webhooks</h4>
							<p className="text-xs text-muted-foreground max-w-sm">
								Already support any HTTPS endpoint. Send your data to Zapier, Make, or your own custom backend.
							</p>
						</div>
					</div>
					<Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider h-auto">
						Available Now
					</Badge>
				</div>
			</div>
		</section>
	);
}
