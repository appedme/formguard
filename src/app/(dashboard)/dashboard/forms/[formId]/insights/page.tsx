import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { FormInsightsView } from "@/components/dashboard/form-insights-view";

export const dynamic = "force-dynamic";

export default async function InsightsPage({ params }: { params: Promise<{ formId: string }> }) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);
	if (!form) return notFound();

	return (
		<FormInsightsView
			form={{
				id: form.id,
				submissions: form.submissions,
				insights: form.insights as any,
			}}
		/>
	);
}
