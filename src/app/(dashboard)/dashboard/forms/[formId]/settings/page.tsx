import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { FormSettingsClient } from "@/components/dashboard/form-settings-client";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ formId: string }> }): Promise<Metadata> {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) return { title: "Settings" };

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) return { title: "Settings" };

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);
	if (!form) return { title: "Form Not Found" };

	return {
		title: `${form.name} - Settings`,
	};
}

export default async function SettingsPage({ params }: { params: Promise<{ formId: string }> }) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);

	if (!form) return notFound();

	return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Form Settings</h2>
            </div>
            <FormSettingsClient form={form} />
        </div>
    );
}
