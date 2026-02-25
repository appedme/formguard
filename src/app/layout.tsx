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
	metadataBase: new URL("https://formguard.strivio.world"),
	title: {
		default: "FormGuard — AI Form Backend for Builders",
		template: "%s | FormGuard",
	},
	description: "Stop building form backends. FormGuard captures submissions, blocks spam, and turns raw responses into AI insights — powered by Cloudflare edge infrastructure.",
	keywords: [
		"form backend",
		"AI form insights",
		"spam protection",
		"Cloudflare forms",
		"serverless forms",
		"form builder API",
		"developer tools",
	],
	authors: [{ name: "FormGuard Team", url: "https://formguard.strivio.world" }],
	creator: "FormGuard",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://formguard.strivio.world",
		title: "FormGuard — AI Form Backend for Builders",
		description: "Capture submissions, block spam, and turn raw responses into AI insights — powered by Cloudflare edge infrastructure.",
		siteName: "FormGuard",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "FormGuard - AI Form Backend",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "FormGuard — AI Form Backend for Builders",
		description: "Capture submissions, block spam, and turn raw responses into AI insights.",
		images: ["/og-image.png"],
		creator: "@formguard",
	},
	icons: {
		icon: "/favicon.svg",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/manifest.webmanifest",
};

export const viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
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
