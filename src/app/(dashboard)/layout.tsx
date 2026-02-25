import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await stackServerApp.getUser();
	if (!user) redirect("/handler/sign-in");

	return (
		<div className="flex h-screen bg-background text-foreground overflow-hidden">
			<DashboardSidebar user={{ displayName: user.displayName, primaryEmail: user.primaryEmail }} />
			<main className="flex-1 overflow-y-auto">
				{children}
			</main>
		</div>
	);
}
