# Organic search improvements

## Implemented

- Vite now renders the real React routes at build time. The build generates 40 public HTML documents from the existing program and blog data, plus noindex admin and 404 pages.
- Every public page has a distinct title, description, canonical URL, social preview and structured data derived from visible content. Client navigation updates the same metadata.
- Program, blog and navigation destinations are ordinary links. `/programok` and `/kapcsolat`, previously listed in the sitemap without matching routes, now have useful landing pages.
- Program detail routes are normal readable pages with an H1 and breadcrumb links. Existing WhatsApp booking and program information are preserved.
- `dist/sitemap.xml` is generated from the same route list at every build; do not maintain a second static sitemap under `public/`.
- Vercel clean URLs serve the individual HTML documents. Unknown URLs receive the static 404 document rather than a 200 homepage shell. API routing is left to Vercel's normal `/api` handling.
- Admin is noindex in HTML and HTTP headers. Robots permits fetching the page so crawlers can observe noindex; this does not replace authentication.
- Four existing base64 testimonial images were moved unchanged into cacheable image files, removing approximately 222 kB from the JavaScript bundle before compression (about 170 kB gzip). The remaining main bundle still triggers Vite's 500 kB advisory.
- Two pre-existing TypeScript problems were fixed: optional program candidate handling and an unused guest-photo state variable. No submission behavior was changed.

## Payment scope

The paused card-payment work is not included. This change starts from production commit `3e39fb8729ff8cedea3e2f7afb76b4f2ed9b64c9`, not the separate card-booking worktree. `SHOW_PREPAID_PACKAGES` remains false. No payment APIs, database migrations or payment-provider settings were added or changed.

## Verification

Run `npm ci`, `npm run check`, `npm run build`, `npm test` and `npm run test:seo`.

`test:seo` covers route metadata, client transitions and language changes, canonical uniqueness, schema JSON, programme links, all generated page headings and local links/images, sitemap completeness, private/404 noindex, hosting rules and paused payments. The output checks require a build first.

`node scripts/preview-static.mjs` serves the build locally with clean-URL/404 behavior on port 3199. It is only a development verification server, not the production deployment entry point.

The repository-wide lint command has 15 pre-existing errors in admin/newsletter and generic UI components. The SEO components, routes, navigation and tests pass focused lint. Do not describe this as a clean repository-wide lint pass.

## Remaining search work

- Submit `https://www.hurghadaprogramok.hu/sitemap.xml` in the verified Google Search Console property and inspect the homepage plus several programme/article URLs.
- Review Search Console indexing, impressions, clicks and query data after recrawling. Public search probes alone cannot establish a site's complete indexing or traffic history.
- Current language switching is a visitor preference on the same URLs. Hungarian is the static/indexable version. Do not add hreflang alternates until distinct fully translated URLs exist.
- Future useful content should answer actual visitor questions and remain consistent with current offers, transfer conditions and guide languages. Do not invent reviews, availability, business addresses or ranking promises.

Technical eligibility is not a guarantee of indexing, rankings, rich results or organic traffic.
