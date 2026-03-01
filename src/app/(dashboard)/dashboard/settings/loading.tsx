import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSettingsLoading() {
	return (
		<div className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-12">
			{/* Header */}
			<div className="space-y-2">
				<Skeleton className="h-7 w-24" />
				<Skeleton className="h-4 w-72" />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
				<div className="space-y-6">
					{[1, 2].map((i) => (
						<div key={i} className="border border-border/60 rounded-2xl p-6 space-y-4">
							<Skeleton className="h-4 w-20" />
							<div className="space-y-2">
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-4 w-36" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-4 w-48" />
							</div>
						</div>
					))}
				</div>
				<div className="lg:col-span-2 space-y-4">
					{[1, 2, 3].map((i) => (
						<div key={i} className="border border-border/60 rounded-2xl overflow-hidden">
							<div className="p-5 border-b border-border/40 flex items-center justify-between">
								<div className="space-y-2">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-3 w-40" />
								</div>
								<Skeleton className="h-8 w-24 rounded-full" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
