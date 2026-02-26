import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { DashboardSidebar, MobileSidebar } from "@/components/dashboard/sidebar";
import { getOrCreateUser } from "@/db/actions/user.actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Dashboard",
		template: "%s | Dashboard",
	},
	robots: {
		index: false,
		follow: false,
	},
};

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

	const userData = {
		displayName: dbUser.displayName,
		primaryEmail: dbUser.email,
		plan: dbUser.plan,
	};

	return (
		<div className="flex h-screen bg-background text-foreground overflow-hidden">
			<DashboardSidebar user={userData} />
			
			<main className="flex-1 overflow-y-auto relative scroll-smooth flex flex-col">
				{/* Mobile Header */}
				<div className="md:hidden flex items-center p-4 border-b border-border bg-background sticky top-0 z-20 shrink-0">
					<MobileSidebar user={userData} />
					<span className="ml-3 font-semibold text-lg">FormGuard</span>
				</div>

				{/* Refined grid background */}
				<div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
				<div className="min-h-full flex flex-col relative flex-1">
					{children}
				</div>
			</main>
		</div>
	);
}
