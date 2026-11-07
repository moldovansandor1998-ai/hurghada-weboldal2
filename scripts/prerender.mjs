import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { render, indexablePaths } from '../dist-ssr/entry-server.js';

const template = await readFile('dist/index.html', 'utf8');
for (const path of [...indexablePaths, '/admin', '/404']) {
  const { head, html } = render(path);
  const output = template.replace('<!--seo-head-->', () => head).replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
  const filename = resolve('dist', path === '/' ? 'index.html' : `${path.slice(1)}.html`);
  await mkdir(dirname(filename), { recursive: true });
  await writeFile(filename, output);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePaths.map(path => `  <url><loc>https://www.hurghadaprogramok.hu${path}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile('dist/sitemap.xml', sitemap);
console.log(`Prerendered ${indexablePaths.length} public pages, admin and a noindex 404 page.`);
