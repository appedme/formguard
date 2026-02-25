import Link from "next/link";

const links = [
	{ label: "Docs", href: "/docs" },
	{ label: "Privacy", href: "/privacy" },
	{ label: "Terms", href: "/terms" },
	{ label: "Twitter", href: "https://twitter.com" },
	{ label: "Status", href: "/status" },
];

export default function Footer() {
	return (
		// Always-dark section
		<div className="dark">
			<footer className="py-12 bg-background border-t border-border">
				<div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
					<Link href="/" className="text-sm font-black tracking-tight text-foreground">
						Form<span className="font-normal text-muted-foreground">Guard</span>
					</Link>

					<nav className="flex flex-wrap items-center justify-center gap-6">
						{links.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
							>
								{link.label}
							</Link>
						))}
					</nav>

					<p className="text-xs font-mono text-muted-foreground">
						© {new Date().getFullYear()} FormGuard
					</p>
				</div>
			</footer>
		</div>
	);
}
