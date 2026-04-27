export const siteConfig = {
	name: "FormGuard",
	description: "Invisible AI-powered spam protection for modern forms.",
	url: process.env.NEXT_PUBLIC_APP_URL || "https://formguard.unstory.app",
	ogImage: "https://formguard.unstory.app/og-image.png",
	links: {
		twitter: "https://twitter.com/formguard",
		github: "https://github.com/sh20raj/formguard",
	},
	keywords: [
		"form spam protection",
		"captcha alternative",
		"recaptcha alternative",
		"turnstile alternative",
		"stop bot submissions",
		"headless form backend",
		"ai spam filter",
	],
};

export type SiteConfig = typeof siteConfig;
