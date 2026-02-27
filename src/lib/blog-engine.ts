/**
 * Blog engine for markdown posts.
 * 
 * This module imports pre-generated blog data (built at compile time by
 * scripts/generate-blog-data.mjs). No runtime `fs` calls — works on
 * Cloudflare Workers and all edge runtimes.
 */

import type { BlogPost } from "./blog";
import { mdPosts } from "./blog-md-data";

export type { BlogPost };

/**
 * Get all markdown blog posts, sorted by date (newest first)
 */
export async function getMarkdownPosts(): Promise<BlogPost[]> {
  return mdPosts;
}

/**
 * Get a single markdown post by slug
 */
export async function getMarkdownPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return mdPosts.find((p) => p.slug === slug);
}
