import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { getFormSubmissions } from "@/db/actions/submission.actions";
import { SubmissionsListClient } from "@/components/dashboard/submissions-list-client";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
	params: Promise<{ formId: string }>;
	searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) return { title: "Submissions" };

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) return { title: "Submissions" };

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);
	if (!form) return { title: "Form Not Found" };

	return {
		title: `Submissions - ${form.name}`,
	};
}

export default async function FormSubmissionsPage({
	params,
	searchParams,
}: Props) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const { formId } = await params;
	const { page } = await searchParams;
	const currentPage = Number(page) || 1;

	const form = await getFormById(formId, dbUser.id);
	if (!form) notFound();

	const { submissions, total, totalPages } = await getFormSubmissions(formId, currentPage, 50);

	return (
		<SubmissionsListClient
			initialData={{
				submissions: JSON.parse(JSON.stringify(submissions)),
				total,
				page: currentPage,
				totalPages
			}}
			userId={dbUser.id}
		/>
	);
}
