import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getUserForms } from "@/db/actions/form.actions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function DashboardPage() {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const userForms = await getUserForms(dbUser.id);

	const totalSubmissions = userForms.reduce((sum, f) => sum + f.submissions, 0);

	return (
		<div className="p-8">
			{/* Header */}
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-2xl font-black text-foreground">Your Forms</h1>
					<p className="text-muted-foreground text-sm mt-1">
						Create a form and get an edge endpoint in seconds.
					</p>
				</div>
				<Button asChild>
					<Link href="/dashboard/forms/new">+ Create Form</Link>
				</Button>
			</div>

			{/* Stats row */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
				{[
					{ label: "Total Forms", value: String(userForms.length) },
					{ label: "Total Submissions", value: String(totalSubmissions) },
					{ label: "Plan", value: dbUser.plan.charAt(0).toUpperCase() + dbUser.plan.slice(1) },
					{ label: "AI Insights Used", value: "0" },
				].map((stat) => (
					<Card key={stat.label} className="border-border">
						<CardHeader className="pb-1">
							<CardDescription className="text-xs font-mono uppercase tracking-wider">
								{stat.label}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-black text-foreground">{stat.value}</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Forms list / empty state */}
			{userForms.length === 0 ? (
				<Card className="border-border border-dashed">
					<CardContent className="flex flex-col items-center justify-center py-24 text-center">
						<p className="text-4xl mb-4">📋</p>
						<h3 className="text-lg font-bold text-foreground mb-2">No forms yet</h3>
						<p className="text-muted-foreground text-sm mb-6 max-w-sm">
							Create your first form and get a unique edge endpoint in under 30
							seconds.
						</p>
						<Button asChild>
							<Link href="/dashboard/forms/new">Create your first form</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-3">
					{userForms.map((form) => (
						<Card
							key={form.id}
							className="border-border hover:border-foreground/30 transition-colors"
						>
							<CardContent className="flex items-center justify-between p-6">
								<div>
									<div className="flex items-center gap-3 mb-1">
										<h3 className="font-bold text-foreground">{form.name}</h3>
										<Badge variant="secondary" className="font-mono text-xs">
											{form.endpointId}
										</Badge>
									</div>
									<p className="text-xs font-mono text-muted-foreground truncate max-w-md">
										/api/submit/{form.endpointId}
									</p>
								</div>
								<div className="flex items-center gap-6">
									<div className="text-right hidden sm:block">
										<p className="text-lg font-bold text-foreground">
											{form.submissions}
										</p>
										<p className="text-xs text-muted-foreground">submissions</p>
									</div>
									<Button variant="outline" size="sm" asChild>
										<Link href={`/dashboard/forms/${form.id}`}>View →</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
