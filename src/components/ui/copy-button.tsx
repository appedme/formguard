"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
	textToCopy: string;
	className?: string;
	iconClassName?: string;
	successMessage?: string;
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function CopyButton({
	textToCopy,
	className,
	iconClassName,
	successMessage = "Copied to clipboard",
	variant = "ghost",
}: CopyButtonProps) {
	const [hasCopied, setHasCopied] = useState(false);

	const handleCopy = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!textToCopy) return;

		navigator.clipboard.writeText(textToCopy);
		setHasCopied(true);
		toast.success(successMessage);

		setTimeout(() => setHasCopied(false), 2000);
	};

	return (
		<Button
			variant={variant}
			size="icon"
			onClick={handleCopy}
			className={cn("h-6 w-6 rounded-md", className)}
		>
			<span className="sr-only">Copy</span>
			{hasCopied ? (
				<Check className={cn("w-3 h-3 text-green-500", iconClassName)} />
			) : (
				<Copy className={cn("w-3 h-3", iconClassName)} />
			)}
		</Button>
	);
}
