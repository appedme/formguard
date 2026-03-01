import { GenericPageLoadingSkeleton } from "@/components/dashboard/loading-skeletons";

export default function PlaygroundLoading() {
	return (
		<div className="max-w-4xl mx-auto py-4">
			<div className="mb-8 space-y-2">
				<div className="h-6 w-40 bg-muted/60 rounded-lg animate-pulse" />
				<div className="h-3 w-72 bg-muted/40 rounded-md animate-pulse" />
			</div>
			<div className="border border-border/40 rounded-2xl p-6 space-y-4">
				<div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
				<div className="h-64 w-full bg-muted/30 rounded-xl animate-pulse" />
			</div>
		</div>
	);
}
