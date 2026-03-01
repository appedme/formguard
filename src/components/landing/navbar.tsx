import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { User } from "@stackframe/stack";

interface NavbarProps {
	user?: User | null;
}

export default function Navbar({ user }: NavbarProps) {
	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
			<div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
				{/* Logo */}
				<Link href="/" className="text-lg font-black tracking-tight text-foreground" aria-label="FormGuard Home">
					Form<span className="font-normal text-muted-foreground">Guard</span>
				</Link>

				{/* Nav Links */}
				<nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
					<Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
						Features
					</Link>
					<Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
						Pricing
					</Link>
					<Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
						Blog
					</Link>
					<Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
						Tools
					</Link>
					<Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
						Docs
					</Link>
					{!user && (
						<Link href="/handler/sign-in" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Login
						</Link>
					)}
				</nav>

				{/* Right: toggle + CTA */}
				<div className="flex items-center gap-3">
					<ThemeToggle />
					{user ? (
						<Link
							href="/dashboard"
							className="inline-flex items-center justify-center h-9 px-5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
							aria-label="Go to Dashboard"
						>
							Dashboard
						</Link>
					) : (
						<Link
							href="/handler/sign-up"
							data-cta="start-free-nav"
							className="inline-flex items-center justify-center h-9 px-5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
							aria-label="Sign up for free"
						>
							Start Free
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
