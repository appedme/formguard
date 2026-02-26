import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { getFormAnalytics } from "@/db/actions/analytics.actions";
import { FormAnalyticsClient } from "@/components/dashboard/form-analytics-client";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ formId: string }> }): Promise<Metadata> {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) return { title: "Insights" };

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) return { title: "Insights" };

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);
	if (!form) return { title: "Form Not Found" };

	return {
		title: `${form.name} - Insights`,
	};
}

export default async function InsightsPage({ params }: { params: Promise<{ formId: string }> }) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);
	if (!form) return notFound();

	const analytics = await getFormAnalytics(formId);

	return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Form Insights</h2>
            </div>
            <FormAnalyticsClient analytics={analytics} />
        </div>
    );
}
