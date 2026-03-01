/**
 * Script to automatically cross-post all local blog posts to multiple platforms.
 * Supports: DEV.to, Hashnode, Medium
 * 
 * Usage: 
 * DEVTO_API_KEY=your_key HASHNODE_API_KEY=your_key MEDIUM_API_KEY=your_key bun run scripts/cross-post-blogs.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const BASE_URL = "https://formguard.strivio.world/blog";

// Dev.to config
const DEVTO_API_URL = "https://dev.to/api/articles";

// Hashnode config (Requires Publication ID to be set in ENV if used)
const HASHNODE_API_URL = "https://gql.hashnode.com";

// Medium config (Requires User ID to be set in ENV if used)
// To get your Medium User ID, hit GET https://api.medium.com/v1/me with your integration token
const MEDIUM_API_URL = "https://api.medium.com/v1";

interface BlogPost {
	slug: string;
	title: string;
	description: string;
	content: string;
	tags: string[];
	canonicalUrl: string;
}

// 1. Read all blog posts
function getAllBlogPosts(): BlogPost[] {
	if (!fs.existsSync(BLOG_DIR)) return [];

	const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

	return files.map((fileName) => {
		const fullPath = path.join(BLOG_DIR, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const slug = fileName.replace(/\.md$/, "");

		const { data, content } = matter(fileContents);

		// Append a canonical link and "originally published at" footer
		const canonicalUrl = `${BASE_URL}/${slug}`;
		const contentWithFooter = `${content}\n\n---\n*This article was originally published on the [FormGuard Blog](${canonicalUrl}).*`;

		return {
			slug,
			title: data.title || "Untitled",
			description: data.description || "",
			content: contentWithFooter,
			tags: data.tags || ["webdev", "saas"], // fallback tags
			canonicalUrl,
		};
	});
}

// 2. Dev.to Poster
async function postToDevTo(post: BlogPost, apiKey: string) {
	console.log(`[Dev.to] Posting: ${post.title}`);
	try {
		const response = await fetch(DEVTO_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"api-key": apiKey,
			},
			body: JSON.stringify({
				article: {
					title: post.title,
					published: false, // Default to draft for safety
					body_markdown: post.content,
					tags: post.tags.slice(0, 4), // dev.to allows max 4 tags
					canonical_url: post.canonicalUrl,
				},
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error(`[Dev.to] Error posting ${post.title}: ${response.status} - ${errorText}`);
			return false;
		}

		const data = await response.json() as any;
		console.log(`[Dev.to] ✅ Success! URL: ${data.url}`);
		return true;
	} catch (error) {
		console.error(`[Dev.to] Exception:`, error);
		return false;
	}
}

// 3. Hashnode Poster
async function postToHashnode(post: BlogPost, apiKey: string, publicationId: string) {
	console.log(`[Hashnode] Posting: ${post.title}`);
	
	const query = `
		mutation PublishPost($input: PublishPostInput!) {
			publishPost(input: $input) {
				post {
					url
				}
			}
		}
	`;

	const variables = {
		input: {
			title: post.title,
			contentMarkdown: post.content,
			publicationId: publicationId,
			tags: post.tags.map(tag => ({ slug: tag, name: tag })).slice(0, 5),
			originalArticleURL: post.canonicalUrl,
		}
	};

	try {
		const response = await fetch(HASHNODE_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": apiKey,
			},
			body: JSON.stringify({ query, variables }),
		});

		if (!response.ok) {
			console.error(`[Hashnode] Error posting ${post.title}: ${response.status}`);
			return false;
		}

		const data = await response.json() as any;
		if (data.errors) {
			console.error(`[Hashnode] GraphQL Error:`, data.errors);
			return false;
		}

		console.log(`[Hashnode] ✅ Success! URL: ${data.data.publishPost.post.url}`);
		return true;
	} catch (error) {
		console.error(`[Hashnode] Exception:`, error);
		return false;
	}
}

// 4. Medium Poster
async function postToMedium(post: BlogPost, apiKey: string, authorId: string) {
	console.log(`[Medium] Posting: ${post.title}`);
	try {
		const response = await fetch(`${MEDIUM_API_URL}/users/${authorId}/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				title: post.title,
				contentFormat: "markdown",
				content: post.content,
				tags: post.tags.slice(0, 5),
				publishStatus: "draft", // Default to draft for safety
				canonicalUrl: post.canonicalUrl,
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error(`[Medium] Error posting ${post.title}: ${response.status} - ${errorText}`);
			return false;
		}

		const data = await response.json() as any;
		console.log(`[Medium] ✅ Success! URL: ${data.data.url}`);
		return true;
	} catch (error) {
		console.error(`[Medium] Exception:`, error);
		return false;
	}
}

// Main execution
async function main() {
	const devtoKey = process.env.DEVTO_API_KEY;
	const hashnodeKey = process.env.HASHNODE_API_KEY;
	const hashnodePubId = process.env.HASHNODE_PUB_ID;
	const mediumKey = process.env.MEDIUM_API_KEY;
	const mediumAuthorId = process.env.MEDIUM_AUTHOR_ID;

	if (!devtoKey && !hashnodeKey && !mediumKey) {
		console.error("❌ No API keys provided. Please provide at least one API key.");
		console.log("Usage: DEVTO_API_KEY=your_key bun run scripts/cross-post-blogs.ts");
		process.exit(1);
	}

	console.log("📖 Reading blog posts...");
	const posts = getAllBlogPosts();
	console.log(`Found ${posts.length} blog posts to publish.\n`);

	for (const post of posts) {
		console.log(`----------------------------------------`);
		console.log(`🚀 Processing: ${post.title}`);
		console.log(`----------------------------------------`);

		if (devtoKey) {
			await postToDevTo(post, devtoKey);
		}

		if (hashnodeKey && hashnodePubId) {
			await postToHashnode(post, hashnodeKey, hashnodePubId);
		} else if (hashnodeKey && !hashnodePubId) {
			console.log("⚠️ Scalping Hashnode: HASHNODE_PUB_ID is missing.");
		}

		if (mediumKey && mediumAuthorId) {
			await postToMedium(post, mediumKey, mediumAuthorId);
		} else if (mediumKey && !mediumAuthorId) {
			console.log("⚠️ Scalping Medium: MEDIUM_AUTHOR_ID is missing.");
		}
		
		console.log("\n");
	}

	console.log("🎉 Cross-posting script completed.");
}

main();
