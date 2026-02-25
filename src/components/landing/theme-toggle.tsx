"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<button className="h-8 w-8 border border-border rounded-sm" aria-label="Toggle theme" />
		);
	}

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			aria-label="Toggle theme"
			className="h-8 w-8 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors text-sm"
		>
			{theme === "dark" ? "☀" : "◑"}
		</button>
	);
}
