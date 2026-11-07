import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App';
import { LanguageProvider } from './lib/i18n';
import { getSeo, safeJson } from './lib/seo';
export { indexablePaths } from './lib/seo';

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function render(path: string) {
  const seo = getSeo(path);
  const head = [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    `<link rel="canonical" href="${escape(seo.url)}" />`,
    '<meta property="og:site_name" content="Hurghada Programok" />',
    ...Object.entries({ title: seo.title, description: seo.description, url: seo.url, image: seo.image, type: seo.type, locale: 'hu_HU' }).map(([key, value]) => `<meta property="og:${key}" content="${escape(value)}" />`),
    ...Object.entries({ card: 'summary_large_image', title: seo.title, description: seo.description, image: seo.image }).map(([key, value]) => `<meta name="twitter:${key}" content="${escape(value)}" />`),
    `<script id="page-schema" type="application/ld+json">${safeJson(seo.structuredData)}</script>`,
  ].join('\n    ');
  const html = renderToString(<LanguageProvider><StaticRouter location={path}><AppRoutes /></StaticRouter></LanguageProvider>);
  return { head, html };
}
