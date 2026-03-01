import { AnalyticsLoadingSkeleton } from "@/components/dashboard/loading-skeletons";

export default function DashboardInsightsLoading() {
	return (
		<div className="p-6 md:p-10 max-w-6xl mx-auto w-full space-y-6">
			<div className="space-y-2">
				<div className="h-6 w-40 bg-muted/60 rounded-lg animate-pulse" />
				<div className="h-3 w-72 bg-muted/40 rounded-md animate-pulse" />
			</div>
			<AnalyticsLoadingSkeleton />
		</div>
	);
}
