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
	Search, 
	LayoutDashboard,
	Plus,
	ChevronRight as ChevronRightIcon
} from "lucide-react";
import Link from "next/link";

interface FormsListProps {
	forms: any[];
	total: number;
	currentPage: number;
	totalPages: number;
}

export function FormsListClient({
	forms,
	total,
	currentPage,
	totalPages,
}: FormsListProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

	function handlePageChange(page: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`/dashboard/forms?${params.toString()}`);
	}

	function handleSearch(e: React.FormEvent) {
		e.preventDefault();
		const params = new URLSearchParams(searchParams.toString());
		if (searchQuery) {
			params.set("search", searchQuery);
		} else {
			params.delete("search");
		}
		params.set("page", "1");
		router.push(`/dashboard/forms?${params.toString()}`);
	}

	return (
		<div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
			<div className="flex flex-col gap-8">
				{/* Top Bar */}
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div>
						<h1 className="text-3xl font-black tracking-tight text-foreground">All Forms</h1>
						<p className="text-sm text-muted-foreground font-medium">Browse and manage all your form endpoints.</p>
					</div>
					<Button asChild className="rounded-xl font-black text-xs px-6">
						<Link href="/dashboard/forms/new">
							<Plus className="w-4 h-4 mr-2" />
							Create New Form
						</Link>
					</Button>
				</div>

				{/* Table Container */}
				<Card className="border-border/40 shadow-2xl shadow-primary/5 overflow-hidden bg-card/30 backdrop-blur-sm rounded-2xl">
					<CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-5">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<LayoutDashboard className="w-4 h-4 text-primary" />
								<CardTitle className="text-sm font-bold tracking-tight">Your Forms ({total})</CardTitle>
							</div>
							<form onSubmit={handleSearch} className="relative w-full sm:max-w-xs group">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
								<Input 
									placeholder="Search forms by name..." 
									className="pl-10 h-10 bg-background/50 border-border/40 rounded-xl focus-visible:ring-primary/20 text-xs"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</form>
						</div>
					</CardHeader>
					<CardContent className="p-0">
						{forms.length === 0 ? (
							<div className="py-24 text-center">
								<div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
									<LayoutDashboard className="w-8 h-8 text-muted-foreground/30" />
								</div>
								<h3 className="text-lg font-bold text-foreground mb-2">No forms found</h3>
								<p className="text-sm text-muted-foreground max-w-xs mx-auto">
									{searchQuery ? "Try adjusting your search query." : "You haven't created any forms yet."}
								</p>
							</div>
						) : (
							<div className="overflow-x-auto">
								<Table>
									<TableHeader className="bg-muted/30">
										<TableRow className="hover:bg-transparent border-border/40">
											<TableHead className="py-4 pl-6 text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground">Form Name</TableHead>
											<TableHead className="text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground">Endpoint ID</TableHead>
											<TableHead className="text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground text-center">Submissions</TableHead>
											<TableHead className="text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground">Created At</TableHead>
											<TableHead className="w-[100px] text-right pr-6"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{forms.map((form) => (
											<TableRow key={form.id} className="border-border/40 group hover:bg-muted/10 transition-colors">
												<TableCell className="pl-6 py-5">
													<Link href={`/dashboard/forms/${form.id}`} className="font-bold text-sm text-foreground hover:text-primary transition-colors">
														{form.name}
													</Link>
												</TableCell>
												<TableCell>
													<Badge variant="outline" className="text-[10px] font-mono px-2 py-0 h-5 border-border/60 bg-background/50">
														{form.endpointId}
													</Badge>
												</TableCell>
												<TableCell className="text-center font-bold text-sm">
													{form.submissions}
												</TableCell>
												<TableCell className="text-[11px] font-mono text-muted-foreground">
													{new Date(form.createdAt).toLocaleDateString()}
												</TableCell>
												<TableCell className="text-right pr-6">
													<Link href={`/dashboard/forms/${form.id}`}>
														<Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
															<ChevronRightIcon className="w-4 h-4" />
														</Button>
													</Link>
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
		</div>
	);
}
