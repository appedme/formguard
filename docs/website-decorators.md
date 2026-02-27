# Website Decorators & Metadata Checklist

This list covers standard, "well-known," and modern metadata files that enhance your website's discoverability, security, integration, and AI-readability.

## 🤖 AI & Bot Control
Files that specifically target LLMs, scrapers, and automated agents.

| File / Feature | Path | Description |
| :--- | :--- | :--- |
| **Robots.txt** | `/robots.txt` | The standard for allowing/disallowing crawlers. |
| **LLMs.txt** | `/llms.txt` | Context and documentation specifically optimized for LLMs to read. |
| **AI.txt** | `/ai.txt` | Emerging standard to explicitly grant/deny permission for AI model training. |
| **GPT Manifest** | `/.well-known/ai-plugin.json` | (If applicable) Defines how ChatGPT plugins interact with your API. |

## 🔍 Discovery & SEO
Files that help search engines and humans understand your site structure.

| File / Feature | Path | Description |
| :--- | :--- | :--- |
| **Sitemap** | `/sitemap.xml` | XML map of all crawlable URLs, priorities, and update frequencies. |
| **Sitemap Index** | `/sitemap_index.xml` | For large sites, an index pointing to multiple sub-sitemaps. |
| **Humans.txt** | `/humans.txt` | A text file crediting the people behind the website (fun easter egg). |
| **Ads.txt** | `/ads.txt` | Authorized Digital Sellers. Essential if you run programmatic ads. |
| **App-Ads.txt** | `/app-ads.txt` | The mobile app equivalent of `ads.txt`. |

## 📱 PWA & Mobile Integration
Enhances the "Install to Home Screen" experience.

| File / Feature | Path | Description |
| :--- | :--- | :--- |
| **Web Manifest** | `/manifest.json` or `.webmanifest` | JSON defining app name, icons, start URL, and theme colors for PWA installation. |
| **Service Worker** | `/sw.js` | Script for offline capabilities, caching, and push notifications. |
| **Apple Touch Icon** | `/apple-touch-icon.png` | Icon used when adding to home screen on iOS (180x180 recommended). |
| **Safari Pinned Tab** | `/safari-pinned-tab.svg` | SVG icon for pinned tabs in Safari (requires `mask-icon` meta tag). |
| **Browser Config** | `/browserconfig.xml` | Legacy configuration for Windows 8/10 start menu tiles. |

## 🔗 Social & Rich Media (Open Graph)
Technically `<meta>` tags, but often require specific static assets.

| File / Feature | Path | Description |
| :--- | :--- | :--- |
| **OG Image** | `/og-image.png` or `[slug]/opengraph-image.png` | The preview image shown on Twitter, LinkedIn, Facebook, etc. (1200x630). |
| **Twitter Image** | `/twitter-image.png` | Specific override for Twitter cards (often same as OG). |
| **Favicon** | `/favicon.ico` | Legacy 32x32 fallback icon. |
| **Icon (SVG)** | `/icon.svg` | Modern vector favicon supported by most browsers. |

## 📰 Feeds & Syndication
Allows users to subscribe to your content.

| File / Feature | Path | Description |
| :--- | :--- | :--- |
| **RSS Feed** | `/feed.xml` or `/rss.xml` | Standard RSS 2.0 feed for blog posts or changelogs. |
| **Atom Feed** | `/atom.xml` | Alternative XML format (often preferred for technical precision). |
| **JSON Feed** | `/feed.json` | Modern JSON-based alternative to RSS/Atom. |

## 🛡️ Security & Trust
Files used to verify ownership or disclose policies.

| File / Feature | Path | Description |
| :--- | :--- | :--- |
| **Security.txt** | `/.well-known/security.txt` | Standard for reporting security vulnerabilities (contact info, encryption keys). |
| **Change Password** | `/.well-known/change-password` | Redirects logged-in users directly to their password change page. |
| **Asset Links** | `/.well-known/assetlinks.json` | Android App Links verification (links web domain to Android app). |
| **Apple App Site** | `/.well-known/apple-app-site-association` | iOS Universal Links verification. |
| **Carbon.txt** | `/carbon.txt` | Evidence of the environmental impact of the digital service. |

## ⚙️ Cloudflare / Deployment Specific
Configuration files for the edge.

| File / Feature | Path | Description |
| :--- | :--- | :--- |
| **Headers** | `/_headers` | Cloudflare/Netlify specific file to set HTTP headers (CSP, CORS, Cache-Control). |
| **Redirects** | `/_redirects` | Cloudflare/Netlify specific file for edge-level redirects. |
| **Routes** | `/_routes.json` | Cloudflare Workers routing configuration (include/exclude patterns). |
