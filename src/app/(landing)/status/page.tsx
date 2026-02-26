
export const metadata = {
	title: "Status",
	description: "FormGuard system status — check uptime and incidents.",
};

const systems = [
	{ name: "Edge API (form submissions)", status: "Operational" },
	{ name: "Dashboard", status: "Operational" },
	{ name: "AI Insight Engine", status: "Operational" },
	{ name: "Dodo Payments Billing", status: "Operational" },
	{ name: "Auth (StackAuth)", status: "Operational" },
	{ name: "Cloudflare D1 Database", status: "Operational" },
];

export default function StatusPage() {
	return (
		<main>
			<section className="py-16 border-b border-border bg-background">
				<div className="mx-auto max-w-4xl px-6">
					<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
						System Status
					</p>
					<div className="flex items-center gap-3 mb-2">
						<div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
						<h1 className="text-4xl font-black text-foreground">
							All systems operational
						</h1>
					</div>
					<p className="text-muted-foreground text-sm font-mono">
						Updated: {new Date().toUTCString()}
					</p>
				</div>
			</section>

			<section className="py-16 bg-background">
				<div className="mx-auto max-w-4xl px-6 space-y-px bg-border">
					{systems.map((system) => (
						<div
							key={system.name}
							className="flex items-center justify-between bg-background px-6 py-5"
						>
							<span className="text-sm font-medium text-foreground">{system.name}</span>
							<span className="flex items-center gap-2 text-xs font-mono text-green-600 dark:text-green-400">
								<span className="h-2 w-2 rounded-full bg-green-500" />
								{system.status}
							</span>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
