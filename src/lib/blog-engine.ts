import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  content: string;
  readTime: string;
  featured?: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Parse a single markdown file into a BlogPost
 */
async function parseMarkdownFile(fileName: string): Promise<BlogPost> {
  const filePath = path.join(CONTENT_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const result = await remark().use(html, { sanitize: false }).process(content);

  return {
    slug: fileName.replace(/\.md$/, ""),
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    author: data.author || "FormGuard Team",
    category: data.category || "General",
    readTime: data.readTime || "5 min read",
    featured: data.featured || false,
    content: result.toString(),
  };
}

/**
 * Get all markdown blog posts, sorted by date (newest first)
 */
export async function getMarkdownPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const posts = await Promise.all(files.map(parseMarkdownFile));

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single markdown post by slug
 */
export async function getMarkdownPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;
  return parseMarkdownFile(`${slug}.md`);
}
