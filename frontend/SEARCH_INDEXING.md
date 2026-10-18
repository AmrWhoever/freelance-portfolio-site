# AmroTech search indexing

The deployed frontend is built from this directory, separately from the Laravel application in the repository root.

The build includes the existing Arabic homepage markup in the initial HTML. Vue replaces this snapshot when it mounts, preserving the interactive bilingual site and animation. Snapshot controls are disabled until the JavaScript application starts. Refresh `src/home-content.html` from the actual public Vue content whenever homepage copy changes; do not add search-only text or claims.

One canonical URL is used: `https://amrotech.pages.dev/`. The language toggle shares that URL, so there are no invented English paths or hreflang alternates. Metadata descriptions follow the chosen language at runtime. Separate static language URLs can be added later if needed.

The build emits a real robots.txt, a one-URL XML sitemap, a top-level 404.html, WebSite/Organization JSON-LD, canonical and social metadata. Existing root robots/sitemap requests previously returned the HTML app shell. A top-level 404 page also disables the Pages default catch-all SPA fallback for nonexistent paths; section anchors continue working on the homepage.

## Google Search Console: account step

No Search Console property has been verified or sitemap submitted by this source change.

1. Open https://search.google.com/search-console/welcome using the Google account that should own the site.
2. Add a **URL prefix** property for `https://amrotech.pages.dev/` (not a Domain property for pages.dev).
3. Select **HTML tag** verification and copy the `google-site-verification` meta tag.
4. Put only its `content` value into `src/search-verification.json` under `google`. This is a public ownership-verification value, not a Google password or API credential. Never replace another owner's tag without review.
5. Build/test and deploy through the existing GitHub Actions workflow. Confirm the exact tag is present in the live HTML head, then click Verify in Search Console.
6. Submit `https://amrotech.pages.dev/sitemap.xml` in Sitemaps. Inspect the homepage URL, use Test live URL, and request indexing if eligible.

The empty verification value emits no placeholder tag. Keep the real verification value in future releases; Google periodically rechecks it. Search engines choose whether and when to index the site; publishing these files does not prove indexing or ranking.

For Bing, the same canonical URL and sitemap apply. Search Console account verification is required before using any account-import workflow; none has been performed here.

