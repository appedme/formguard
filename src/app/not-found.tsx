import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
			<div className="mx-auto max-w-md text-center">
				{/* Glitch-style 404 number */}
				<div className="relative mb-8 select-none">
					<h1 className="text-[12rem] font-black leading-none tracking-tighter text-foreground/5">
						404
					</h1>
					<h1 className="absolute inset-0 text-[12rem] font-black leading-none tracking-tighter text-foreground animate-pulse">
						404
					</h1>
				</div>

				<h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
					Page not found
				</h2>
				<p className="mb-8 text-sm text-muted-foreground leading-relaxed">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
					<br />
					Let&apos;s get you back on track.
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
					<Link
						href="/"
						className="inline-flex items-center justify-center rounded-xl bg-foreground px-6 py-2.5 text-sm font-bold text-background transition-transform hover:bg-foreground/90 active:scale-95"
					>
						Go Home
					</Link>
					<Link
						href="/dashboard"
						className="inline-flex items-center justify-center rounded-xl border border-border/60 bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
					>
						Dashboard
					</Link>
				</div>

				{/* Subtle decorative element */}
				<div className="mt-16 flex items-center justify-center gap-1.5">
					<div className="h-1 w-1 rounded-full bg-primary/40" />
					<div className="h-1 w-6 rounded-full bg-primary/20" />
					<div className="h-1 w-1 rounded-full bg-primary/40" />
				</div>
				<p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
					FormGuard
				</p>
			</div>
		</div>
	);
}
