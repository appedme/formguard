import { Check, X } from "lucide-react";

const comparisons = [
	{
		feature: "User Experience",
		formguard: "Zero Friction",
		recaptcha: "Annoying Puzzles",
		turnstile: "Mostly Invisible",
	},
	{
		feature: "Setup Complexity",
		formguard: "Under 60s",
		recaptcha: "Complex SDK",
		turnstile: "SDK Required",
	},
	{
		feature: "Privacy Focused",
		formguard: true,
		recaptcha: false,
		turnstile: true,
	},
	{
		feature: "Bot Protection Engine",
		formguard: "AI-Powered",
		recaptcha: "Heuristic",
		turnstile: "Challenge-based",
	},
	{
		feature: "Real-time Analytics",
		formguard: true,
		recaptcha: "Basic",
		turnstile: "Limited",
	},
	{
		feature: "Native Integrations",
		formguard: true,
		recaptcha: false,
		turnstile: false,
	},
	{
		feature: "Free Tier",
		formguard: "Generous",
		recaptcha: "Limited",
		turnstile: "Generous",
	},
];

export default function Comparison() {
	return (
		<section id="comparison" className="py-24 border-b border-border bg-background">
			<div className="mx-auto max-w-5xl px-6">
				<div className="text-center mb-16">
					<p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
						Benchmark
					</p>
					<h2 className="text-3xl font-black text-foreground mb-4 tracking-tight">
						FormGuard vs The Rest
					</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
						We built FormGuard to be the protection we wanted for our own apps. Invisible, fast, and developer-first.
					</p>
				</div>

				<div className="w-full overflow-x-auto">
					<table className="w-full text-left border-collapse min-w-[600px]">
						<thead>
							<tr>
								<th className="p-4 border-b border-border font-bold text-muted-foreground w-1/3">Features</th>
								<th className="p-4 border-b border-border font-black text-primary text-center text-lg w-1/5 bg-primary/5 rounded-t-xl">FormGuard</th>
								<th className="p-4 border-b border-border font-bold text-muted-foreground text-center w-1/5">reCAPTCHA</th>
								<th className="p-4 border-b border-border font-bold text-muted-foreground text-center w-1/5">Turnstile</th>
							</tr>
						</thead>
						<tbody>
							{comparisons.map((row, index) => (
								<tr key={index} className="group hover:bg-muted/30 transition-colors">
									<td className="p-4 border-b border-border/50 font-bold text-sm text-foreground">
										{row.feature}
									</td>
									<td className="p-4 border-b border-border/50 text-center bg-primary/5 font-bold text-sm text-primary">
										{row.formguard === true ? (
											<Check className="w-5 h-5 mx-auto text-primary" />
										) : (
											row.formguard
										)}
									</td>
									<td className="p-4 border-b border-border/50 text-center text-sm font-medium text-muted-foreground">
										{row.recaptcha === true ? (
											<Check className="w-5 h-5 mx-auto text-foreground/70" />
										) : row.recaptcha === false ? (
											<X className="w-5 h-5 mx-auto text-red-500/50" />
										) : (
											row.recaptcha
										)}
									</td>
									<td className="p-4 border-b border-border/50 text-center text-sm font-medium text-muted-foreground">
										{row.turnstile === true ? (
											<Check className="w-5 h-5 mx-auto text-foreground/70" />
										) : row.turnstile === false ? (
											<X className="w-5 h-5 mx-auto text-red-500/50" />
										) : (
											row.turnstile
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
