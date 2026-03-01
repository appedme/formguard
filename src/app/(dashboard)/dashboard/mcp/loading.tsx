import { Skeleton } from "@/components/ui/skeleton";

export default function McpLoading() {
	return (
		<div className="p-6 md:p-10 max-w-6xl mx-auto w-full space-y-6">
			<div className="space-y-2">
				<Skeleton className="h-7 w-52" />
				<Skeleton className="h-4 w-80" />
			</div>
			<div className="border border-border/40 rounded-2xl overflow-hidden">
				<div className="p-6 border-b border-border/40 space-y-3">
					<div className="flex items-center justify-between">
						<Skeleton className="h-5 w-32" />
						<Skeleton className="h-5 w-20 rounded-full" />
					</div>
					<Skeleton className="h-3 w-64" />
				</div>
				<div className="p-6 space-y-4">
					<Skeleton className="h-10 w-full rounded-xl" />
					<div className="grid grid-cols-2 gap-3">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className="border border-border/40 rounded-xl p-4 space-y-2">
								<Skeleton className="h-3 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
