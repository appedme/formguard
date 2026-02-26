"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
	Copy,
	Check,
	Eye,
	ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";

interface SubmissionsListProps {
	initialData: {
		submissions: any[];
		total: number;
		page: number;
		totalPages: number;
	};
	userId: string;
}

export function SubmissionsListClient({
	initialData,
	userId,
}: SubmissionsListProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState("");
	const [exporting, setExporting] = useState(false);
	const [copiedId, setCopiedId] = useState<string | null>(null);

	const { submissions, total, page, totalPages } = initialData;

	const filteredSubmissions = submissions.filter((item) => {
		const payloadString = JSON.stringify(item.submission.payload).toLowerCase();
		const formNameString = item.formName.toLowerCase();
		return payloadString.includes(searchQuery.toLowerCase()) || formNameString.includes(searchQuery.toLowerCase());
	});

	function handlePageChange(newPage: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage.toString());
		router.push(`/dashboard/submissions?${params.toString()}`);
	}

	function copyPayload(payload: any, id: string) {
		navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
		setCopiedId(id);
		toast.success("Payload copied to clipboard");
		setTimeout(() => setCopiedId(null), 2000);
	}

	async function handleExport(formatType: "csv" | "json" = "csv") {
		setExporting(true);
		try {
			// This would need a global export endpoint, for now we'll just show a toast
            // or we can implement it if critical. Given the "google forms" req, 
            // the user might want this.
			toast.info("Global export coming soon! For now, export from individual form settings.");
		} catch {
			toast.error("Failed to export submissions");
		} finally {
			setExporting(false);
		}
	}

	return (
		<div className="flex flex-col gap-6 w-full">
			{/* Table Container */}
			<Card className="border-border/40 shadow-none overflow-hidden bg-card/30 backdrop-blur-sm rounded-2xl">
				<CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-5">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<Inbox className="w-4 h-4 text-primary" />
							<CardTitle className="text-sm font-bold tracking-tight">Recent Activity ({total})</CardTitle>
						</div>
						<div className="relative w-full sm:max-w-xs group">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
							<Input 
								placeholder="Search name or payload..." 
								className="pl-10 h-10 bg-background/50 border-border/40 rounded-xl focus-visible:ring-primary/20 text-xs"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
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
							<p className="text-sm text-muted-foreground max-w-xs mx-auto">Once your forms start receiving entries, they will appear here in real-time.</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<Table>
								<TableHeader className="bg-muted/30">
									<TableRow className="hover:bg-transparent border-border/40">
										<TableHead className="w-[180px] py-4 pl-6 text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground">Form</TableHead>
										<TableHead className="min-w-[400px] text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground">Submission Data</TableHead>
										<TableHead className="w-[120px] text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground">Status</TableHead>
										<TableHead className="w-[180px] text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground text-right pr-6">Date</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredSubmissions.map((item) => (
										<TableRow key={item.submission.id} className="border-border/40 group hover:bg-muted/10 transition-colors">
											<TableCell className="pl-6">
												<Link 
                                                    href={`/dashboard/forms/${item.submission.formId}`}
                                                    className="flex flex-col hover:underline group/link"
                                                >
													<span className="text-xs font-black tracking-tight flex items-center gap-1.5">
                                                        {item.formName}
                                                        <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                    </span>
                                                    <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">{item.endpointId}</span>
												</Link>
											</TableCell>
											<TableCell>
												<div className="relative group/payload p-4 bg-muted/20 border border-border/20 rounded-xl transition-all hover:border-primary/20">
													<div className="absolute top-3 right-3 opacity-0 group-hover/payload:opacity-100 transition-opacity flex gap-2">
														<Button
															variant="outline"
															size="icon"
															className="h-7 w-7 rounded-lg border-border/40 bg-background/50 hover:bg-background"
															onClick={() => copyPayload(item.submission.payload, item.submission.id)}
														>
															{copiedId === item.submission.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
														</Button>
														<Button
															variant="outline"
															size="icon"
															className="h-7 w-7 rounded-lg border-border/40 bg-background/50 hover:bg-background"
														>
															<Eye className="w-3 h-3" />
														</Button>
													</div>
													<pre className="font-mono text-[11px] text-foreground/80 overflow-hidden leading-relaxed max-h-[120px]">
														{JSON.stringify(item.submission.payload, null, 2)}
													</pre>
												</div>
											</TableCell>
                                            <TableCell>
												<Badge 
													variant={item.submission.isSpam ? "destructive" : "outline"}
													className={`text-[9px] uppercase font-mono tracking-tighter px-2 py-0.5 rounded-md ${!item.submission.isSpam && "bg-green-500/5 text-green-600 border-green-500/20"}`}
												>
													{item.submission.isSpam ? "SPAM" : "CLEAN"}
												</Badge>
											</TableCell>
											<TableCell className="text-right pr-6 text-[11px] font-mono text-muted-foreground">
												{format(new Date(item.submission.createdAt), "MMM d, yyyy")}
												<br />
												<span className="text-[10px] text-muted-foreground/40 italic">
													{format(new Date(item.submission.createdAt), "HH:mm")}
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
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
					<p className="text-xs font-mono text-muted-foreground font-medium">
						Page <span className="text-foreground font-black">{page}</span> of <span className="text-foreground font-black">{totalPages}</span>
					</p>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							className="rounded-xl border-border/40 h-10 px-4 font-bold active:scale-95 transition-all disabled:opacity-30"
							onClick={() => handlePageChange(page - 1)}
							disabled={page <= 1}
						>
							<ChevronLeft className="w-4 h-4 mr-2" />
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="rounded-xl border-border/40 h-10 px-4 font-bold active:scale-95 transition-all disabled:opacity-30"
							onClick={() => handlePageChange(page + 1)}
							disabled={page >= totalPages}
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
