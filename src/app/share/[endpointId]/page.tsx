import { notFound } from "next/navigation";
import { getFormByEndpointIdPublic } from "@/db/actions/form.actions";
import { PublicFormClient } from "@/components/public-form-client";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ endpointId: string }> }): Promise<Metadata> {
	const { endpointId } = await params;
	const form = await getFormByEndpointIdPublic(endpointId);

	if (!form) return { title: "Form Not Found" };

	return {
		title: `${form.name} | FormGuard`,
		description: form.publicFormDescription || `Submit your response to ${form.name}.`,
	};
}

export default async function PublicFormPage({
	params,
}: {
	params: Promise<{ endpointId: string }>;
}) {
	const { endpointId } = await params;
	const form = await getFormByEndpointIdPublic(endpointId);

	if (!form) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
			{/* Grid background */}
			<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
			
			<PublicFormClient form={form} />
			
			<footer className="mt-12 text-[10px] text-muted-foreground font-mono flex items-center gap-2">
				<span>Powered by</span>
				<div className="bg-foreground text-background px-1.5 py-0.5 rounded text-[8px] font-black tracking-tighter uppercase">
					FormGuard
				</div>
			</footer>
		</div>
	);
}
