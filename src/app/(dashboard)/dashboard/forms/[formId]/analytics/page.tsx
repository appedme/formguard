import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { getFormAnalytics } from "@/db/actions/analytics.actions";
import { FormAnalyticsClient } from "@/components/dashboard/form-analytics-client";

export const dynamic = "force-dynamic";

interface Props {
	params: Promise<{ formId: string }>;
}

export default async function AnalyticsPage({ params }: Props) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);

	if (!form) return notFound();

	const analytics = await getFormAnalytics(formId);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-black tracking-tighter mb-1">Analytics</h2>
				<p className="text-xs text-muted-foreground font-medium">Insights into your form performance and submission trends.</p>
			</div>
			<FormAnalyticsClient analytics={analytics} />
		</div>
	);
}
