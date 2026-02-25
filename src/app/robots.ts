import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/", "/handler/"],
    },
    sitemap: "https://formguard.strivio.world/sitemap.xml",
  };
}
