import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "FormGuard — AI Form Backend for Builders",
	description: "Stop building form backends. FormGuard captures submissions, blocks spam, and turns raw responses into AI insights — powered by Cloudflare edge infrastructure.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
				<Providers>
					<StackProvider app={stackClientApp}>
						<StackTheme>{children}</StackTheme>
					</StackProvider>
				</Providers>
			</body>
		</html>
	);
}
