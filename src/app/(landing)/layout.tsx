import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "FormGuard — AI Form Backend for Builders",
	description:
		"Stop building form backends. FormGuard captures submissions, blocks spam, and turns raw responses into AI insights — powered by Cloudflare edge infrastructure.",
	keywords: [
		"form backend",
		"AI form insights",
		"spam protection",
		"Cloudflare Workers",
		"form API",
	],
	openGraph: {
		title: "FormGuard — AI Form Backend",
		description:
			"One endpoint. Clean dashboard. Instant AI summaries. Built for indie makers and fast-moving teams.",
		url: "https://formguard.strivio.world",
		siteName: "FormGuard",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "FormGuard — AI Form Backend",
		description:
			"Stop building form backends. Ship faster with a single endpoint.",
	},
	metadataBase: new URL("https://formguard.strivio.world"),
};

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`${inter.variable} font-sans`}>
			{children}
		</div>
	);
}
