import { describe, it, expect } from 'vitest';
import { getSeo, indexablePaths, safeJson, SITE_URL } from '../../src/lib/seo';
import { programs } from '../../src/data/programs';
import { blogPosts } from '../../src/data/blog';

describe('SEO metadata', () => {
  it('has unique paths, titles and self-referencing canonical URLs for every public page', () => {
    expect(new Set(indexablePaths).size).toBe(indexablePaths.length);
    expect(new Set(indexablePaths.map(path => getSeo(path).title)).size).toBe(indexablePaths.length);
    for (const path of indexablePaths) {
      const seo = getSeo(path);
      expect(seo.url).toBe(SITE_URL + path);
      expect(seo.description.length).toBeGreaterThan(40);
      expect(seo.robots).toMatch(/^index,/);
      expect(seo.structuredData['@graph'].length).toBeGreaterThanOrEqual(3);
    }
  });
  it('contains every programme and article and excludes private and missing pages', () => {
    for (const program of programs) expect(indexablePaths).toContain(`/program/${program.id}`);
    for (const post of blogPosts) expect(indexablePaths).toContain(`/blog/${post.slug}`);
    for (const path of ['/admin', '/foglalas', '/404', '/program/missing', '/blog/missing']) {
      expect(indexablePaths).not.toContain(path);
      expect(getSeo(path).robots).toMatch(/^noindex,/);
      expect(getSeo(path).structuredData['@graph']).toEqual([]);
    }
  });
  it('normalizes trailing slashes and uses the actual programme and article content', () => {
    expect(getSeo('/programok/').url).toBe(SITE_URL + '/programok');
    expect(getSeo('/program/orange-bay').title).toContain(programs.find(p => p.id === 'orange-bay')!.name);
    expect(getSeo(`/blog/${blogPosts[0].slug}`).description).toBe(blogPosts[0].excerpt);
    expect(getSeo(`/blog/${blogPosts[0].slug}`, 'en').language).toBe('hu');
    expect(getSeo('/programok', 'en').title).toContain('Hurghada excursions and prices');
  });
  it('escapes embedded JSON so page data cannot end a script element', () => {
    const input = { text: '</script><script>alert(1)</script>' };
    expect(safeJson(input)).not.toContain('<');
    expect(JSON.parse(safeJson(input))).toEqual(input);
  });
});
