import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { FormPlaygroundView } from "@/components/dashboard/form-playground-view";

export const dynamic = "force-dynamic";

interface Props {
	params: Promise<{ formId: string }>;
}

export default async function PlaygroundPage({ params }: Props) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);

	if (!form) return notFound();

	return (
		<FormPlaygroundView
			form={{
				id: form.id,
				endpointId: form.endpointId
			}}
		/>
	);
}
