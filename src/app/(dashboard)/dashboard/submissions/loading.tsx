import { SubmissionsLoadingSkeleton } from "@/components/dashboard/loading-skeletons";

export default function DashboardSubmissionsLoading() {
	return (
		<div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
			<SubmissionsLoadingSkeleton />
		</div>
	);
}
