import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { PublicFormSettings } from "@/components/dashboard/public-form-settings";

export const dynamic = "force-dynamic";

interface Props {
	params: Promise<{ formId: string }>;
}

export default async function PublicFormSettingsPage({ params }: Props) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);

	if (!form) return notFound();

	return (
		<div className="max-w-4xl mx-auto">
			<PublicFormSettings form={form} userId={dbUser.id} />
		</div>
	);
}
