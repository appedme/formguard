"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
			<Toaster position="top-right" richColors />
			<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "8f08b788d2b847829001105bef8b347a"}'></script>
		</ThemeProvider>
	);
}
