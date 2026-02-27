import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { mdPosts } from "@/lib/blog-md-data";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://formguard.strivio.world";
	const lastModified = new Date();

	const staticRoutes = [
		"",
		"/features",
		"/pricing",
		"/docs",
		"/blog",
		"/contact",
		"/privacy",
		"/terms",
		"/status",
	].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified,
		changeFrequency: "weekly" as const,
		priority: route === "" ? 1 : 0.8,
	}));

	const allPosts = [...blogPosts, ...mdPosts];

	const blogRoutes = allPosts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: "monthly" as const,
		priority: 0.6,
	}));

	return [...staticRoutes, ...blogRoutes];
}
