import { Suspense } from "react";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getUserApiKeys } from "@/db/actions/api-key.actions";
import { McpClient } from "@/components/dashboard/mcp-client";
import { Skeleton } from "@/components/ui/skeleton";

export default async function McpPage() {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) {
		redirect(stackServerApp.urls.signIn);
	}

	const user = await getUserByStackAuthId(stackUser.id);
	if (!user) {
		redirect(stackServerApp.urls.signIn);
	}

	const initialKeys = await getUserApiKeys(user.id);

	return (
		<div className="max-w-5xl mx-auto space-y-8">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-black tracking-tight text-foreground">MCP Integration</h1>
				<p className="text-muted-foreground text-sm font-medium"> Connect FormGuard to your AI agents (Cursor, VSCode, Windsurf) using the Model Context Protocol.</p>
			</div>

			<Suspense fallback={<McpSkeleton />}>
				<McpClient initialKeys={initialKeys} userId={user.id} />
			</Suspense>
		</div>
	);
}

function McpSkeleton() {
	return (
		<div className="space-y-6">
			<Skeleton className="h-[200px] w-full rounded-2xl" />
			<Skeleton className="h-[400px] w-full rounded-2xl" />
		</div>
	);
}
