import Link from "next/link";

const links = [
	{ label: "Docs", href: "#" },
	{ label: "Privacy", href: "#" },
	{ label: "Terms", href: "#" },
	{ label: "Twitter", href: "https://twitter.com" },
	{ label: "Status", href: "#" },
];

export default function Footer() {
	return (
		<footer className="py-12 bg-black border-t border-white/5">
			<div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
				<Link
					href="/"
					className="text-sm font-black tracking-tight text-white"
				>
					Form<span className="font-normal text-gray-500">Guard</span>
				</Link>

				<nav className="flex flex-wrap items-center justify-center gap-6">
					{links.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className="text-xs font-mono text-gray-500 hover:text-white transition-colors"
						>
							{link.label}
						</Link>
					))}
				</nav>

				<p className="text-xs font-mono text-gray-600">
					© {new Date().getFullYear()} FormGuard
				</p>
			</div>
		</footer>
	);
}
