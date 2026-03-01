import Link from "next/link";

const links = [
	{ label: "Features", href: "/features" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "Blog", href: "/blog" },
	{ label: "Docs", href: "/docs" },
	{ label: "Contact", href: "/contact" },
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

					<div className="flex flex-col items-center sm:items-end gap-4">
						<a href="https://www.producthunt.com/products/formguard?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-formguard" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105">
							<img alt="FormGuard - AI Form Backend for Builders | Product Hunt" width="200" height="43" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1086617&amp;theme=neutral&amp;t=1772347025205" />
						</a>
						<p className="text-xs font-mono text-muted-foreground text-center sm:text-right">
							Powered by Cloudflare Edge
							<br />
							© {new Date().getFullYear()} FormGuard
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
