import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-10">
			{/* Header Skeleton */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div className="space-y-2">
					<Skeleton className="h-8 w-48 rounded-lg" />
					<Skeleton className="h-4 w-64 rounded-md" />
				</div>
				<Skeleton className="h-9 w-32 rounded-full" />
			</div>

			{/* Stats Grid Skeleton */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{[1, 2, 3, 4].map((i) => (
					<Skeleton key={i} className="h-24 w-full rounded-2xl" />
				))}
			</div>

			{/* Main Content Skeleton */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
				<div className="lg:col-span-2 space-y-4">
					<div className="flex items-center justify-between">
						<Skeleton className="h-5 w-32 rounded-md" />
						<Skeleton className="h-4 w-20 rounded-md" />
					</div>
					<div className="space-y-3">
						{[1, 2, 3].map((i) => (
							<Skeleton key={i} className="h-20 w-full rounded-2xl" />
						))}
					</div>
				</div>

				<div className="space-y-6">
					<Skeleton className="h-5 w-40 rounded-md" />
					<Skeleton className="h-64 w-full rounded-2xl" />
					<Skeleton className="h-40 w-full rounded-2xl" />
				</div>
			</div>
		</div>
	);
}
