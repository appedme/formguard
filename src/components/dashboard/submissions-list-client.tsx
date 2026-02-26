"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
	Table, 
	TableBody, 
	TableCell, 
	TableHead, 
	TableHeader, 
	TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
	ChevronLeft, 
	ChevronRight, 
	Download, 
	Search, 
	Inbox,
	ArrowLeft
} from "lucide-react";
import type { Submission } from "@/db/schema";
import { toast } from "sonner";

interface SubmissionsListProps {
	form: {
		id: string;
		name: string;
	};
	submissions: Submission[];
	total: number;
	currentPage: number;
	totalPages: number;
}

export function SubmissionsListClient({
	form,
	submissions,
	total,
	currentPage,
	totalPages,
}: SubmissionsListProps) {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [exporting, setExporting] = useState(false);

	const filteredSubmissions = submissions.filter((sub) => {
		const payloadString = JSON.stringify(sub.payload).toLowerCase();
		return payloadString.includes(searchQuery.toLowerCase());
	});

	function handlePageChange(page: number) {
		router.push(`/dashboard/forms/${form.id}/submissions?page=${page}`);
	}

	async function handleExport() {
		setExporting(true);
		try {
			const res = await fetch(`/api/forms/${form.id}/submissions/export`);
			if (!res.ok) throw new Error("Export failed");
			
			const blob = await res.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${form.name.toLowerCase().replace(/\s+/g, "_")}_submissions.csv`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
			toast.success("Submissions exported successfully");
		} catch {
			toast.error("Failed to export submissions");
		} finally {
			setExporting(false);
		}
	}

	return (
		<div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
			<div className="flex flex-col gap-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Button 
							variant="ghost" 
							size="icon" 
							className="rounded-full"
							onClick={() => router.push(`/dashboard/forms/${form.id}`)}
						>
							<ArrowLeft className="w-5 h-5" />
						</Button>
						<div>
							<h1 className="text-2xl font-bold text-foreground">{form.name}</h1>
							<p className="text-sm text-muted-foreground">All submissions for this form</p>
						</div>
					</div>
					<Button 
						variant="outline" 
						size="sm" 
						onClick={handleExport}
						disabled={exporting || total === 0}
					>
						<Download className="w-4 h-4 mr-2" />
						{exporting ? "Exporting..." : "Export CSV"}
					</Button>
				</div>

				<Card className="border-border/60 shadow-none">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm font-semibold">Submissions ({total})</CardTitle>
							<div className="relative w-full max-w-xs">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
								<Input 
									placeholder="Search submissions..." 
									className="pl-9 h-9"
									value={searchQuery}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>
					</CardHeader>
					<CardContent className="p-0">
						{total === 0 ? (
							<div className="py-20 text-center">
								<Inbox className="w-10 h-10 text-muted-foreground/20 mx-auto mb-4" />
								<p className="text-sm text-muted-foreground">No submissions found</p>
							</div>
						) : (
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow className="hover:bg-transparent border-border/40">
											<TableHead className="w-[100px] text-[11px] uppercase tracking-wider font-bold">Status</TableHead>
											<TableHead className="text-[11px] uppercase tracking-wider font-bold">Data (JSON)</TableHead>
											<TableHead className="text-[11px] uppercase tracking-wider font-bold">IP Address</TableHead>
											<TableHead className="w-[180px] text-[11px] uppercase tracking-wider font-bold text-right">Date</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredSubmissions.map((sub) => (
											<TableRow key={sub.id} className="border-border/40 group">
												<TableCell>
													<Badge 
														variant={sub.isSpam ? "destructive" : "secondary"}
														className={`text-[10px] uppercase font-mono tracking-tighter ${!sub.isSpam && "bg-green-500/10 text-green-600 border-green-500/20 shadow-none"}`}
													>
														{sub.isSpam ? "SPAM" : "CLEAN"}
													</Badge>
												</TableCell>
												<TableCell className="max-w-md">
													<div className="font-mono text-[11px] bg-muted/30 rounded-lg p-3 overflow-x-auto whitespace-pre">
														{JSON.stringify(sub.payload, null, 2)}
													</div>
												</TableCell>
												<TableCell className="font-mono text-[11px] text-muted-foreground">
													{sub.ipAddress || "—"}
												</TableCell>
												<TableCell className="text-right text-[11px] text-muted-foreground">
													{new Date(sub.createdAt).toLocaleString()}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						)}
					</CardContent>
				</Card>

				{totalPages > 1 && (
					<div className="flex items-center justify-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage <= 1}
						>
							<ChevronLeft className="w-4 h-4 mr-1" />
							Previous
						</Button>
						<span className="text-sm text-muted-foreground px-4">
							Page {currentPage} of {totalPages}
						</span>
						<Button
							variant="outline"
							size="sm"
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage >= totalPages}
						>
							Next
							<ChevronRight className="w-4 h-4 ml-1" />
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
