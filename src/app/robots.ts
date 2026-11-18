import type { MetadataRoute } from "next";

import { INDEX, SITE } from "@/lib/site";

// AI search and assistant crawlers are welcome by name, so the company can be found and quoted in their answers.
const AI = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Amazonbot", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  if (!INDEX) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI, allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
