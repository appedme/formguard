import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { getFormSubmissions } from "@/db/actions/submission.actions";
import { FormDetailClient } from "@/components/dashboard/form-detail-client";
import type { Metadata } from "next";

interface Props {
	params: Promise<{ formId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) return { title: "Form Details" };

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) return { title: "Form Details" };

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);
	if (!form) return { title: "Form Not Found" };

	return {
		title: form.name,
	};
}

export default async function FormDetailPage({
	params,
}: Props) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);
	if (!form) notFound();

	const { submissions, total, totalPages } = await getFormSubmissions(formId, 1, 20);

	return (
		<FormDetailClient
			form={form}
			initialSubmissions={JSON.parse(JSON.stringify(submissions))}
			totalSubmissions={total}
			totalPages={totalPages}
		/>
	);
}
