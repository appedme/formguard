import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { getOrCreateUser } from "@/db/actions/user.actions";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	// Ensure user exists in our DB
	const dbUser = await getOrCreateUser({
		id: stackUser.id,
		primaryEmail: stackUser.primaryEmail,
		displayName: stackUser.displayName,
	});

	return (
		<div className="flex h-screen bg-background text-foreground overflow-hidden">
			<DashboardSidebar
				user={{
					displayName: dbUser.displayName,
					primaryEmail: dbUser.email,
				}}
			/>
			<main className="flex-1 overflow-y-auto relative">
				{/* Subtle mesh background */}
				<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:16px_16px]"></div>
				<div className="min-h-full flex flex-col backdrop-blur-[2px]">
					{children}
				</div>
			</main>
		</div>
	);
}
