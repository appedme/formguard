import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
	return (
		<div className="p-6 md:p-10 max-w-6xl mx-auto w-full space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="space-y-2">
					<Skeleton className="h-7 w-40" />
					<Skeleton className="h-4 w-56" />
				</div>
				<Skeleton className="h-10 w-32 rounded-xl" />
			</div>

			{/* Forms grid skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<div
						key={i}
						className="border border-border/40 rounded-2xl p-6 space-y-4"
					>
						<div className="flex items-start justify-between">
							<div className="space-y-2 flex-1">
								<Skeleton className="h-5 w-36" />
								<Skeleton className="h-3 w-24" />
							</div>
							<Skeleton className="h-5 w-16 rounded-full" />
						</div>
						<div className="space-y-1.5">
							<Skeleton className="h-3 w-full" />
							<Skeleton className="h-3 w-4/5" />
						</div>
						<div className="flex items-center gap-2 pt-2 border-t border-border/20">
							<Skeleton className="h-8 w-24 rounded-lg" />
							<Skeleton className="h-8 w-24 rounded-lg" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
