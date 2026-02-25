import Link from "next/link";

const links = [
	{ label: "Features", href: "/features" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "Blog", href: "/blog" },
	{ label: "Docs", href: "/docs" },
	{ label: "Privacy", href: "/privacy" },
	{ label: "Terms", href: "/terms" },
	{ label: "Status", href: "/status" },
];

export default function Footer() {
	return (
		// Always-dark section
		<div className="dark">
			<footer className="py-12 bg-background border-t border-border">
				<div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
					<Link href="/" className="text-sm font-black tracking-tight text-foreground" aria-label="FormGuard Home">
						Form<span className="font-normal text-muted-foreground">Guard</span>
					</Link>

					<nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer Navigation">
						{links.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
								aria-label={link.label}
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
