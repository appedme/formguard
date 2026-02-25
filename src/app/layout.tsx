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
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://formguard.strivio.world",
		title: "FormGuard — AI Form Backend for Builders",
		description: "Capture submissions, block spam, and turn raw responses into AI insights — powered by Cloudflare edge infrastructure.",
		siteName: "FormGuard",
		images: [
			{
				url: "/og-image-1.png",
				width: 1200,
				height: 630,
				alt: "FormGuard - AI Form Backend Overview",
			},
			{
				url: "/og-image-2.png",
				width: 1200,
				height: 630,
				alt: "FormGuard - Dashboard and AI Insights",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "FormGuard — AI Form Backend for Builders",
		description: "Capture submissions, block spam, and turn raw responses into AI insights.",
		images: ["/og-image-1.png"],
		creator: "@formguard",
	},
	icons: {
		icon: [
			{ url: "/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon.png", type: "image/png" },
		],
		apple: "/apple-touch-icon.png",
	},
	manifest: "/manifest.webmanifest",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
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
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Organization",
							"name": "FormGuard",
							"url": "https://formguard.strivio.world",
							"logo": "https://formguard.strivio.world/favicon.svg",
							"description": "Stop building form backends. FormGuard captures submissions, blocks spam, and turns raw responses into AI insights — powered by Cloudflare edge infrastructure.",
							"sameAs": [
								"https://twitter.com/formguard",
								"https://github.com/formguard"
							]
						}),
					}}
				/>
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
