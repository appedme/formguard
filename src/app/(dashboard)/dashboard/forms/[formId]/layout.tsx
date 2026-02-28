import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { getSubmissionCount } from "@/db/actions/submission.actions";
import { FormDashboardNav } from "@/components/dashboard/form-dashboard-nav";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
	params: Promise<{ formId: string }>;
	children: React.ReactNode;
}

export default async function FormLayout({ params, children }: Props) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) redirect("/handler/sign-in");

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) redirect("/handler/sign-in");

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);

	if (!form) return notFound();

	const submissionCount = await getSubmissionCount(form.id);

	return (
		<div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
			{/* Breadcrumb / Back */}
			<div className="flex items-center gap-4 mb-8">
				<Link href="/dashboard">
					<Button 
						variant="ghost" 
						size="icon" 
						className="rounded-full h-9 w-9 shrink-0 border border-border/40 hover:bg-muted"
					>
						<ChevronLeft className="w-5 h-5" />
					</Button>
				</Link>
				<div>
					<div className="flex items-center gap-3">
						<h1 className="text-2xl font-black tracking-tighter text-foreground">{form.name}</h1>
						{form.isPublic && (
							<div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20 text-[9px] font-mono font-black uppercase tracking-widest">
								<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
								Live
							</div>
						)}
					</div>
					<div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono font-medium uppercase tracking-widest">
						<span>ID: {form.endpointId}</span>
						<span>•</span>
						<span>Created {new Date(form.createdAt).toLocaleDateString()}</span>
					</div>
				</div>
			</div>

			{/* Navigation Tabs */}
			<FormDashboardNav formId={form.id} isPublic={form.isPublic} submissionCount={submissionCount} />

			{/* Content */}
			<div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
				{children}
			</div>
		</div>
	);
}
