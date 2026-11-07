import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { getSeo, safeJson } from '@/lib/seo';

export default function Seo() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  useEffect(() => {
    const seo = getSeo(pathname, language);
    document.title = seo.title;
    document.documentElement.lang = seo.language;
    const meta = (key: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.content = content;
    };
    meta('description', seo.description);
    meta('robots', seo.robots);
    meta('og:title', seo.title, true);
    meta('og:description', seo.description, true);
    meta('og:url', seo.url, true);
    meta('og:image', seo.image, true);
    meta('og:type', seo.type, true);
    meta('og:locale', seo.language === 'hu' ? 'hu_HU' : 'en_GB', true);
    meta('twitter:card', 'summary_large_image');
    meta('twitter:title', seo.title);
    meta('twitter:description', seo.description);
    meta('twitter:image', seo.image);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = seo.url;
    let schema = document.head.querySelector<HTMLScriptElement>('#page-schema');
    if (!schema) { schema = document.createElement('script'); schema.id = 'page-schema'; schema.type = 'application/ld+json'; document.head.append(schema); }
    schema.textContent = safeJson(seo.structuredData);
  }, [pathname, language]);
  return null;
}
