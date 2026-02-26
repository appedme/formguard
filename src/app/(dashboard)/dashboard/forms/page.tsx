import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getPaginatedUserForms } from "@/db/actions/form.actions";
import { FormsListClient } from "@/components/dashboard/forms-list-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "All Forms",
};

export const dynamic = "force-dynamic";

interface Props {
	searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function FormsPage({ searchParams }: Props) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const params = await searchParams;
	const currentPage = Number(params.page) || 1;
	const searchQuery = params.search || "";

	const { forms, total, totalPages } = await getPaginatedUserForms(
		dbUser.id,
		currentPage,
		10,
		searchQuery
	);

	return (
		<FormsListClient
			forms={forms}
			total={total}
			currentPage={currentPage}
			totalPages={totalPages}
		/>
	);
}
