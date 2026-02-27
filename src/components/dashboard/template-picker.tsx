"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formTemplates } from "@/lib/templates";
import { createFormFromTemplate } from "@/db/actions/form.actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface TemplatePickerProps {
	userId: string;
}

export function TemplatePicker({ userId }: TemplatePickerProps) {
	const router = useRouter();
	const [creating, setCreating] = useState<string | null>(null);

	const handleUseTemplate = async (templateId: string) => {
		setCreating(templateId);
		try {
			const form = await createFormFromTemplate(userId, templateId);
			toast.success("Form created from template!");
			router.push(`/dashboard/forms/${form.id}/public`);
		} catch (error) {
			toast.error("Failed to create form from template.");
		} finally {
			setCreating(null);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-sm font-black tracking-tighter">Quick Start Templates</h3>
					<p className="text-[10px] text-muted-foreground font-medium">Clone a pre-built template to get started in seconds.</p>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{formTemplates.map((t) => (
					<div 
						key={t.id} 
						className="border border-border/40 rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all group bg-card flex flex-col"
					>
						<div className="flex items-start justify-between mb-3">
							<span className="text-2xl">{t.icon}</span>
							<Badge variant="secondary" className="text-[8px] uppercase tracking-widest font-black">{t.category}</Badge>
						</div>
						<h4 className="text-sm font-bold mb-1 text-foreground">{t.name}</h4>
						<p className="text-[10px] text-muted-foreground leading-relaxed mb-4 flex-1">{t.description}</p>
						<div className="flex items-center justify-between">
							<span className="text-[10px] text-muted-foreground font-mono">{t.fields.length} fields</span>
							<Button
								size="sm"
								variant="ghost"
								className="h-7 text-[10px] font-bold uppercase tracking-wider hover:bg-primary/10 hover:text-primary rounded-lg px-3"
								disabled={creating === t.id}
								onClick={() => handleUseTemplate(t.id)}
							>
								{creating === t.id ? (
									<Loader2 className="w-3 h-3 animate-spin" />
								) : (
									<>Use <ArrowRight className="w-3 h-3 ml-1" /></>
								)}
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
