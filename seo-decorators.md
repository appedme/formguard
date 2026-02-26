# SEO & Search Engine Optimization Decorators

This list focuses specifically on files and configurations that impact Search Engine Optimization, indexing, and bot interactions.

## 🕷️ Crawling & Indexing Control
Fundamental files that tell search engines *what* to index and *how* to crawl.

| File / Feature | Path / Standard | Purpose & SEO Impact |
| :--- | :--- | :--- |
| **Robots.txt** | `/robots.txt` | **Critical.** Instructions for all bots. Prevents crawling of duplicate content, admin pages, orinfinite loops. Misconfiguration here can de-index your entire site. |
| **Sitemap XML** | `/sitemap.xml` | **Critical.** A roadmap of all pages you want indexed. Essential for discovering deep content and defining update frequency (`lastmod`). |
| **Sitemap Index** | `/sitemap_index.xml` | **Critical for Large Sites.** Groups multiple sitemaps (e.g., `post-sitemap.xml`, `page-sitemap.xml`) to overcome the 50k URL limit per file. |
| **Image Sitemap** | `image-sitemap.xml` | Increases visibility in Google Images. Definitions for image captions, titles, license, and geolocation. |
| **Video Sitemap** | `video-sitemap.xml` | Essential for video SEO. Defines thumbnails, duration, rating, and expiration date for video content. |
| **News Sitemap** | `news-sitemap.xml` | **Specific to Publishers.** Required to appear in Google News. Must only contain articles published in the last 48 hours. |

## 🤖 AI & LLM Optimization (AEO)
New standards to help AI models understand your content without hallucinating.

| File / Feature | Path / Standard | Purpose & SEO Impact |
| :--- | :--- | :--- |
| **LLMs.txt** | `/llms.txt` | **Emerging Standard.** Provides a summarized, markdown context of your site specifically for LLMs to read. Helps AI cite your content accurately. |
| **AI.txt** | `/ai.txt` | **Proposed.** A permission file to explicitly grant/deny AI model training (distinct from search indexing). |
| **GPT Manifest** | `/.well-known/ai-plugin.json` | Defines how ChatGPT interactions with your API/Plugin. |

## 🏢 Local SEO & Geo
Files that help search engines understand your physical location.

| File / Feature | Path / Standard | Purpose & SEO Impact |
| :--- | :--- | :--- |
| **KML / KMZ** | `/locations.kml` | **Keyhole Markup Language.** Used to verify business locations and display them in Google Earth/Maps. largely superseded by Schema, but still used for complex service areas. |
| **Geo Sitemap** | `geo-sitemap.xml` | An XML sitemap extension specifically for KML/GeoRSS content. |

## 💰 Ads & Commercial Trust
Files that verify your legitimacy as a publisher or seller.

| File / Feature | Path / Standard | Purpose & SEO Impact |
| :--- | :--- | :--- |
| **Ads.txt** | `/ads.txt` | **Authorized Digital Sellers.** Mandatory if you sell ad space. Prevents ad fraud and ensures you get paid. Missing this can kill ad revenue. |
| **App-Ads.txt** | `/app-ads.txt` | The mobile app equivalent of `ads.txt`. |
| **Sellers.json** | `/sellers.json` | **Supply-Side Transparency.** A public file allowing buyers to discover the direct sellers or intermediaries in the advertising opportunity. |

## 🛡️ Verification & Ownership
Files used to prove domain ownership to specific search engines.

| File / Feature | Path / Standard | Purpose & SEO Impact |
| :--- | :--- | :--- |
| **Google Verification** | `google[id].html` | Verifies ownership for Google Search Console. Essential for monitoring performance. |
| **Bing Verification** | `BingSiteAuth.xml` | Verifies ownership for Bing Webmaster Tools. |
| **Yandex Verification** | `yandex_[id].html` | Verifies ownership for Yandex (Russian Search Engine). |
| **Baidu Verification** | `baidu_verify_[id].html` | Verifies ownership for Baidu (Chinese Search Engine). |
| **Pinterest Verify** | `pinterest-[id].html` | Verifies domain for Pinterest business accounts (important for visual search). |

## 📱 Mobile & PWA (Indirect SEO)
Mobile-friendliness is a direct ranking factor.

| File / Feature | Path / Standard | Purpose & SEO Impact |
| :--- | :--- | :--- |
| **Web Manifest** | `/manifest.json` | **Required for PWA.** Defines the "Install App" experience. Google ranks PWAs higher for their speed and engagement. |
| **Asset Links** | `/.well-known/assetlinks.json` | **Android App Links.** Verifies the link between your website and Android app, enabling deep linking from search results. |
| **Apple App Site** | `/.well-known/apple-app-site-association` | **iOS Universal Links.** Verifies the link between your website and iOS app. |

## 🌍 Sustainability & Ethics
Emerging trust signals.

| File / Feature | Path / Standard | Purpose & SEO Impact |
| :--- | :--- | :--- |
| **Carbon.txt** | `/carbon.txt` | **Emerging.** Evidence that the digital infrastructure runs on green energy. May become a minor tie-breaker signal in the future. |
| **Security.txt** | `/.well-known/security.txt` | **Trust Signal.** Defines security policies and contact info. Validates your organization as a responsible web entity. |
| **Humans.txt** | `/humans.txt` | **Authorship.** Credits the development team. Adds to the "human" element of the site. |
