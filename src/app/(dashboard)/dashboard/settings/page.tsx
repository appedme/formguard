import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { PLAN_LIMITS } from "@/lib/plans";
import { SettingsClient } from "@/components/dashboard/settings-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Settings",
};

export default async function SettingsPage() {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const currentPlan = PLAN_LIMITS[dbUser.plan];

	return (
		<SettingsClient
			user={{
				id: dbUser.id,
				email: dbUser.email,
				displayName: dbUser.displayName,
				plan: dbUser.plan,
			}}
			planLimits={currentPlan}
		/>
	);
}
