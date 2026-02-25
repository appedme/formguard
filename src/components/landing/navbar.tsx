import Link from "next/link";

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-sm">
			<div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
				{/* Logo */}
				<Link href="/" className="text-lg font-black tracking-tight text-black">
					Form<span className="font-normal">Guard</span>
				</Link>

				{/* Nav Links */}
				<nav className="hidden md:flex items-center gap-8">
					<Link
						href="#features"
						className="text-sm text-gray-600 hover:text-black transition-colors"
					>
						Features
					</Link>
					<Link
						href="#pricing"
						className="text-sm text-gray-600 hover:text-black transition-colors"
					>
						Pricing
					</Link>
					<Link
						href="#"
						className="text-sm text-gray-600 hover:text-black transition-colors"
					>
						Docs
					</Link>
					<Link
						href="/handler/sign-in"
						className="text-sm text-gray-600 hover:text-black transition-colors"
					>
						Login
					</Link>
				</nav>

				{/* CTA */}
				<Link
					href="/handler/sign-up"
					data-cta="start-free-nav"
					className="inline-flex items-center justify-center h-9 px-5 text-sm font-semibold bg-black text-white rounded-none hover:bg-gray-800 transition-colors"
				>
					Start Free
				</Link>
			</div>
		</header>
	);
}
