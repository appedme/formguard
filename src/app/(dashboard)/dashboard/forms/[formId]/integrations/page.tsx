import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { IntegrationsClient } from "@/components/dashboard/integrations-client";

export const dynamic = "force-dynamic";

export default async function IntegrationsPage({ params }: { params: Promise<{ formId: string }> }) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);

	if (!form) return notFound();

	return (
		<div className="max-w-4xl mx-auto py-4">
			<div className="mb-8">
				<h2 className="text-xl font-black tracking-tighter mb-1">App Integrations</h2>
				<p className="text-xs text-muted-foreground font-medium">Connect your form to Google Sheets, Telegram, Notion, and more.</p>
			</div>
			<IntegrationsClient form={form} />
		</div>
	);
}
