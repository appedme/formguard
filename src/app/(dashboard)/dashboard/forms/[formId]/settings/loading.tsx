import { SettingsLoadingSkeleton } from "@/components/dashboard/loading-skeletons";

export default function SettingsLoading() {
	return (
		<div className="max-w-4xl mx-auto py-4">
			<div className="mb-8 space-y-2">
				<div className="h-6 w-40 bg-muted/60 rounded-lg animate-pulse" />
				<div className="h-3 w-72 bg-muted/40 rounded-md animate-pulse" />
			</div>
			<SettingsLoadingSkeleton />
		</div>
	);
}
