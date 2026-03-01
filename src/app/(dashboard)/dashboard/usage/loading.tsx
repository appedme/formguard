import { Skeleton } from "@/components/ui/skeleton";

export default function UsageLoading() {
	return (
		<div className="p-6 md:p-10 max-w-6xl mx-auto w-full space-y-6">
			<div className="space-y-2">
				<Skeleton className="h-7 w-24" />
				<Skeleton className="h-4 w-56" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="border border-border/40 rounded-2xl p-6 space-y-3">
						<Skeleton className="h-3 w-20" />
						<Skeleton className="h-8 w-32" />
						<div className="h-2 bg-muted/30 rounded-full">
							<div className="h-2 bg-muted/60 rounded-full w-1/2 animate-pulse" />
						</div>
						<Skeleton className="h-3 w-40" />
					</div>
				))}
			</div>
		</div>
	);
}
