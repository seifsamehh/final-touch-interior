// The public address. Set NEXT_PUBLIC_SITE_URL once the final domain is known; until then Vercel's own address is used.
export const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

// Only the live site may appear in search. Vercel preview builds are kept out.
export const INDEX = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
export const ROBOTS = INDEX ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" : "noindex, nofollow";
