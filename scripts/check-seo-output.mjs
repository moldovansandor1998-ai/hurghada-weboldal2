import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { indexablePaths } from '../dist-ssr/entry-server.js';

const readPage = path => readFile(`dist/${path === '/' ? 'index' : path.slice(1)}.html`, 'utf8');

test('every public route is readable HTML with one H1 and page-specific search metadata', async () => {
  for (const path of indexablePaths) {
    const html = await readPage(path);
    const { document } = new JSDOM(html).window;
    assert.equal(document.querySelectorAll('title').length, 1, path);
    assert.equal(document.querySelectorAll('h1').length, 1, path);
    assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1, path);
    assert.equal(document.querySelector('link[rel="canonical"]').href, `https://www.hurghadaprogramok.hu${path}`, path);
    assert.ok(document.querySelector('#root').textContent.trim().length > 200, path);
    assert.match(document.querySelector('meta[name="robots"]').content, /^index,/, path);
    assert.equal(document.querySelectorAll('script[type="application/ld+json"]').length, 1, path);
    JSON.parse(document.querySelector('#page-schema').textContent);
    for (const anchor of document.querySelectorAll('a[href^="/"]')) {
      const target = anchor.getAttribute('href').split(/[?#]/)[0];
      assert.ok(indexablePaths.includes(target) || target === '/admin', `${path}: broken link ${target}`);
    }
    for (const image of document.querySelectorAll('img[src^="/images/"]')) {
      await access(`public${image.getAttribute('src')}`);
    }
  }
});
test('sitemap matches public routes and never includes admin or 404', async () => {
  const xml = await readFile('dist/sitemap.xml', 'utf8');
  const { document } = new JSDOM(xml, { contentType: 'text/xml' }).window;
  assert.deepEqual([...document.querySelectorAll('loc')].map(node => node.textContent), indexablePaths.map(path => `https://www.hurghadaprogramok.hu${path}`));
  assert.doesNotMatch(xml, /admin|foglalas|404/);
});
test('private and missing pages have noindex without public structured data', async () => {
  for (const path of ['/admin', '/404']) {
    const { document } = new JSDOM(await readPage(path)).window;
    assert.match(document.querySelector('meta[name="robots"]').content, /^noindex,/);
    assert.deepEqual(JSON.parse(document.querySelector('#page-schema').textContent)['@graph'], []);
  }
});
test('hosting serves static documents and leaves API routes out of SPA fallbacks', async () => {
  const config = JSON.parse(await readFile('vercel.json', 'utf8'));
  assert.equal(config.cleanUrls, true);
  assert.equal(config.trailingSlash, false);
  assert.equal(config.rewrites, undefined);
  assert.ok(config.headers.find(rule => rule.source === '/admin').headers.some(header => header.key === 'X-Robots-Tag' && header.value.includes('noindex')));
});
test('paid packages and checkout stay disabled, and testimonial assets retain their bytes', async () => {
  const offers = await readPage('/ajanlatok');
  assert.doesNotMatch(offers, /Teljes előrefizetés szükséges|Csomag foglalása|\/foglalas\//);
  assert.match(await readFile('src/sections/OffersSection.tsx', 'utf8'), /SHOW_PREPAID_PACKAGES = false/);
  const homepage = await readPage('/');
  assert.doesNotMatch(homepage, /data:image\/webp;base64/);
});
