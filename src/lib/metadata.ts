import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function constructMetadata({
	title,
	description = siteConfig.description,
	image = siteConfig.ogImage,
	noIndex = false,
}: {
	title: string;
	description?: string;
	image?: string;
	noIndex?: boolean;
}): Metadata {
	return {
		title: `${title} | ${siteConfig.name}`,
		description,
		keywords: siteConfig.keywords,
		openGraph: {
			title: `${title} | ${siteConfig.name}`,
			description,
			images: [{ url: image }],
			type: "website",
			siteName: siteConfig.name,
		},
		twitter: {
			card: "summary_large_image",
			title: `${title} | ${siteConfig.name}`,
			description,
			images: [image],
			creator: "@formguard",
		},
		icons: {
			icon: "/favicon.ico",
			shortcut: "/favicon-16x16.png",
			apple: "/apple-touch-icon.png",
		},
		metadataBase: new URL(siteConfig.url),
		...(noIndex && {
			robots: {
				index: false,
				follow: false,
			},
		}),
	};
}
