import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://formguard.strivio.world";
	const lastModified = new Date();

	const routes = [
		"",
		"/features",
		"/pricing",
		"/docs",
		"/privacy",
		"/terms",
		"/status",
	].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified,
		changeFrequency: "weekly" as const,
		priority: route === "" ? 1 : 0.8,
	}));

	return routes;
}
