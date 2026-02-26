export default function Loading() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
			<div className="flex flex-col items-center gap-4">
				<div className="relative">
					<div className="h-12 w-12 rounded-full border-4 border-muted" />
					<div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-primary" />
				</div>
				<p className="text-sm font-medium text-muted-foreground animate-pulse">Loading…</p>
			</div>
		</div>
	);
}
