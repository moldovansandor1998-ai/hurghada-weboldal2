// @vitest-environment jsdom
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { MemoryRouter, Link } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Seo from '../../src/components/Seo';
import { LanguageProvider, useLanguage } from '../../src/lib/i18n';
import ProgramCard from '../../src/sections/ProgramCard';
import { programs } from '../../src/data/programs';

let root: Root;
let container: HTMLDivElement;
function LanguageButton() {
  const { setLanguage } = useLanguage();
  return <button id="english" onClick={() => setLanguage('en')}>English</button>;
}
beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  document.head.innerHTML = '';
  localStorage.clear();
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => { await act(async () => root.unmount()); container.remove(); });

describe('client navigation metadata', () => {
  it('updates canonical, title, schema and robots across navigation, including missing pages', async () => {
    await act(async () => root.render(<LanguageProvider><MemoryRouter><Seo /><Link to="/program/orange-bay" id="program">Program</Link><Link to="/blog/missing" id="missing">Missing</Link><Link to="/" id="home">Home</Link><LanguageButton /></MemoryRouter></LanguageProvider>));
    const click = async (selector: string) => act(async () => (container.querySelector(selector) as HTMLElement).click());
    await click('#program');
    expect(document.title).toContain('Orange Bay');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://www.hurghadaprogramok.hu/program/orange-bay');
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelectorAll('#page-schema')).toHaveLength(1);
    await click('#missing');
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('noindex');
    await click('#home');
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toMatch(/^index,/);
    await click('#english');
    expect(document.title).toContain('Hurghada excursions');
    expect(document.documentElement.lang).toBe('en');
  });
  it('renders a real detail link and keeps WhatsApp booking instead of activating payments', async () => {
    await act(async () => root.render(<LanguageProvider><MemoryRouter><ProgramCard program={programs[0]} index={0} /></MemoryRouter></LanguageProvider>));
    expect(container.querySelector(`a[href="/program/${programs[0].id}"]`)).not.toBeNull();
    expect(container.querySelector('a[href^="https://wa.me/"]')).not.toBeNull();
    expect(container.innerHTML).not.toContain('/foglalas');
  });
});
