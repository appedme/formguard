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
	ArrowLeft,
	Copy,
	Check,
	Filter,
	Eye
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
	const [copiedId, setCopiedId] = useState<string | null>(null);

	const filteredSubmissions = submissions.filter((sub) => {
		const payloadString = JSON.stringify(sub.payload).toLowerCase();
		return payloadString.includes(searchQuery.toLowerCase());
	});

	function handlePageChange(page: number) {
		router.push(`/dashboard/forms/${form.id}/submissions?page=${page}`);
	}

	function copyPayload(payload: any, id: string) {
		navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
		setCopiedId(id);
		toast.success("Payload copied to clipboard");
		setTimeout(() => setCopiedId(null), 2000);
	}

	async function handleExport(format: "csv" | "json" = "csv") {
		setExporting(true);
		try {
			const res = await fetch(`/api/forms/${form.id}/submissions/export?format=${format}`);
			if (!res.ok) throw new Error("Export failed");
			
			const blob = await res.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${form.name.toLowerCase().replace(/\s+/g, "_")}_submissions.${format}`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
			toast.success(`Submissions exported as ${format.toUpperCase()}`);
		} catch {
			toast.error("Failed to export submissions");
		} finally {
			setExporting(false);
		}
	}

	return (
		<div className="flex flex-col gap-8 w-full">
			{/* Submissions Stats/Header */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
				<div>
					<h2 className="text-xl font-black tracking-tighter mb-1">Submissions</h2>
					<p className="text-xs text-muted-foreground font-medium">Manage and export all data collected via your form endpoint.</p>
				</div>
				<div className="flex items-center gap-3">
					<Button 
						variant="outline"
						className="rounded-xl font-black text-xs px-6 bg-foreground text-background hover:bg-foreground/90 transition-transform active:scale-95" 
						onClick={() => handleExport("csv")}
						disabled={exporting || total === 0}
					>
						<Download className="w-3.5 h-3.5 mr-2" />
						{exporting ? "Preparing..." : "Export CSV"}
					</Button>
					<Button 
						variant="outline"
						className="rounded-xl font-black text-xs px-6 border-border/40 transition-transform active:scale-95" 
						onClick={() => handleExport("json")}
						disabled={exporting || total === 0}
					>
						<Download className="w-3.5 h-3.5 mr-2" />
						Export JSON
					</Button>
				</div>
			</div>

				{/* Table Container */}
				<Card className="border-border/40 shadow-2xl shadow-primary/5 overflow-hidden bg-card/30 backdrop-blur-sm rounded-2xl">
					<CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-5">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<Inbox className="w-4 h-4 text-primary" />
								<CardTitle className="text-sm font-bold tracking-tight">Recent Activity ({total})</CardTitle>
							</div>
							<div className="relative w-full sm:max-w-xs group">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
								<Input 
									placeholder="Search by payload content..." 
									className="pl-10 h-10 bg-background/50 border-border/40 rounded-xl focus-visible:ring-primary/20 text-xs"
									value={searchQuery}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>
					</CardHeader>
					<CardContent className="p-0">
						{total === 0 ? (
							<div className="py-32 text-center">
								<div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
									<Inbox className="w-8 h-8 text-muted-foreground/30" />
								</div>
								<h3 className="text-lg font-bold text-foreground mb-2">No data yet</h3>
								<p className="text-sm text-muted-foreground max-w-xs mx-auto">Once your form starts receiving entries, they will appear here in real-time.</p>
							</div>
						) : (
							<div className="overflow-x-auto">
								<Table>
									<TableHeader className="bg-muted/30">
										<TableRow className="hover:bg-transparent border-border/40">
											<TableHead className="w-[120px] py-4 pl-6 text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground">Status</TableHead>
											<TableHead className="min-w-[400px] text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground">Submission Data</TableHead>
											<TableHead className="w-[150px] text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground">Origin IP</TableHead>
											<TableHead className="w-[200px] text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground text-right pr-6">Observed At</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredSubmissions.map((sub) => (
											<TableRow key={sub.id} className="border-border/40 group hover:bg-muted/10 transition-colors">
												<TableCell className="pl-6">
													<Badge 
														variant={sub.isSpam ? "destructive" : "outline"}
														className={`text-[9px] uppercase font-mono tracking-tighter px-2 py-0.5 rounded-md ${!sub.isSpam && "bg-green-500/5 text-green-600 border-green-500/20"}`}
													>
														{sub.isSpam ? "SPAM BLOCK" : "CLEAN ENTRY"}
													</Badge>
												</TableCell>
												<TableCell>
													<div className="relative group/payload p-4 bg-muted/20 border border-border/20 rounded-xl transition-all hover:border-primary/20">
														<div className="absolute top-3 right-3 opacity-0 group-hover/payload:opacity-100 transition-opacity flex gap-2">
															<Button
																variant="outline"
																size="icon"
																className="h-7 w-7 rounded-lg border-border/40 bg-background/50 hover:bg-background"
																onClick={() => copyPayload(sub.payload, sub.id)}
															>
																{copiedId === sub.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
															</Button>
															<Button
																variant="outline"
																size="icon"
																className="h-7 w-7 rounded-lg border-border/40 bg-background/50 hover:bg-background"
															>
																<Eye className="w-3 h-3" />
															</Button>
														</div>
														<pre className="font-mono text-[11px] text-foreground/80 overflow-hidden leading-relaxed max-h-[150px]">
															{JSON.stringify(sub.payload, null, 2)}
														</pre>
													</div>
												</TableCell>
												<TableCell className="font-mono text-[11px] text-muted-foreground font-medium">
													{sub.ipAddress || "No IP logged"}
												</TableCell>
												<TableCell className="text-right pr-6 text-[11px] font-mono text-muted-foreground">
													{new Date(sub.createdAt).toLocaleDateString()}
													<br />
													<span className="text-[10px] text-muted-foreground/40 italic">
														{new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
													</span>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 pb-10">
						<p className="text-xs font-mono text-muted-foreground">
							Displaying page <span className="text-foreground font-bold">{currentPage}</span> of <span className="text-foreground font-bold">{totalPages}</span>
						</p>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								className="rounded-xl border-border/40 h-10 px-4 font-bold active:scale-95 transition-all disabled:opacity-30"
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage <= 1}
							>
								<ChevronLeft className="w-4 h-4 mr-2" />
								Previous
							</Button>
							<div className="flex items-center gap-1 mx-2">
								{Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
									<div 
										key={i} 
										className={`h-1.5 rounded-full transition-all ${i + 1 === currentPage ? 'w-8 bg-primary' : 'w-1.5 bg-muted-foreground/20'}`}
									/>
								))}
							</div>
							<Button
								variant="outline"
								size="sm"
								className="rounded-xl border-border/40 h-10 px-4 font-bold active:scale-95 transition-all disabled:opacity-30"
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage >= totalPages}
							>
								Next
								<ChevronRight className="w-4 h-4 ml-2" />
							</Button>
						</div>
					</div>
				)}
			</div>
	);
}
