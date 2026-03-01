import { SubmissionsLoadingSkeleton } from "@/components/dashboard/loading-skeletons";

export default function SubmissionsLoading() {
	return (
		<div className="max-w-4xl mx-auto py-4">
			<SubmissionsLoadingSkeleton />
		</div>
	);
}
