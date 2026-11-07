import { programs, WHATSAPP_NUMBER, FACEBOOK_URL } from '@/data/programs';
import { blogPosts } from '@/data/blog';
import { localizeProgram, type Language } from './i18n';

export const SITE_URL = 'https://www.hurghadaprogramok.hu';
const SITE_NAME = 'Hurghada Programok';
const HOME_IMAGE = `${SITE_URL}/images/hero.jpg`;
const staticPages: Record<string, { title: string; description: string; enTitle: string; enDescription: string }> = {
  '/': {
    title: 'Hurghada programok és fakultatív kirándulások',
    description: 'Hurghada fakultatív programok: Orange Bay, hajókirándulások, szafari, Kairó és Luxor. Árak, hoteltranszfer és magyar nyelvű ügyintézés WhatsAppon.',
    enTitle: 'Hurghada excursions and day trips',
    enDescription: 'Explore Hurghada boat trips, Orange Bay, desert safaris, Cairo and Luxor excursions. Compare prices and hotel transfer details. Book on WhatsApp.',
  },
  '/programok': {
    title: 'Hurghada fakultatív programok és árak',
    description: 'Hurghadai kirándulások és árak egy helyen: szigettúrák, sznorkelezés, szafari, Kairó, Luxor és családi programok. Útvonalak és transzferinformációk.',
    enTitle: 'Hurghada excursions and prices', enDescription: 'Compare Hurghada island trips, snorkelling, safaris, Cairo, Luxor and family activities with itineraries, prices and transfer information.',
  },
  '/kapcsolat': {
    title: 'Kapcsolat és foglalás', description: 'Kérdezz és egyeztess hurghadai programot WhatsAppon, magyarul. Elérhetőségek, programválasztás és a foglaláshoz szükséges tudnivalók.',
    enTitle: 'Contact and excursion booking', enDescription: 'Contact Hurghada Excursions on WhatsApp for programme recommendations, hotel transfer information and booking details.',
  },
  '/blog': {
    title: 'Hurghada útikalauz és utazási tippek', description: 'Hasznos tudnivalók hurghadai utazás előtt: időjárás, kirándulások és helyi tippek. Olvasd el útikalauzunk cikkeit.',
    enTitle: 'Hurghada travel guide and tips', enDescription: 'Read our Hungarian travel guides about Hurghada weather, excursions and useful local information before your holiday.',
  },
  '/ajanlatok': {
    title: 'Hurghadai programajánlatok és kedvezmények', description: 'Hurghadai programajánlatok: 3+1 akció és reptéri transzfer kedvezmény feltételekkel. Nézd meg az ajánlatok részleteit, majd egyeztess WhatsAppon.',
    enTitle: 'Hurghada excursion offers', enDescription: 'Explore current Hurghada excursion offers, the 3+1 promotion and airport transfer conditions. Check the details and contact us before booking.',
  },
  '/fontos-informaciok': {
    title: 'Foglalás előtt: transzfer és idegenvezetés', description: 'Fontos tudnivalók hurghadai programfoglalás előtt: hoteltranszfer, felvételi hely, idegenvezetés, indulási idő és fizetési információk.',
    enTitle: 'Before booking: transfers and guides', enDescription: 'Important information for Hurghada excursions: hotel transfers, pick-up points, guide languages, departure times and payment details.',
  },
  '/vendegeink-fotoi': {
    title: 'Vendégeink hurghadai élményfotói', description: 'Nézd meg vendégeink hurghadai programokon készült fotóit, és oszd meg saját élményeidet. A fotófeltöltés és kuponok részletes feltételei.',
    enTitle: 'Hurghada guest photos', enDescription: 'Browse photos from Hurghada excursions, share your own memories and read the guest photo voucher conditions.',
  },
  '/aszf': {
    title: 'Általános szerződési feltételek', description: 'A Hurghada Programok foglalási és részvételi feltételei. Programcsomagok, lemondási szabályok és további tudnivalók.',
    enTitle: 'Terms and conditions', enDescription: 'Read Hurghada Excursions booking and participation terms, package conditions and cancellation information.',
  },
};

export const indexablePaths = [
  ...Object.keys(staticPages),
  ...programs.map(program => `/program/${program.id}`),
  ...blogPosts.map(post => `/blog/${post.slug}`),
];

export function getSeo(pathname: string, language: Language = 'hu') {
  const path = pathname.replace(/\/+$/, '') || '/';
  const page = staticPages[path];
  const program = programs.find(item => path === `/program/${item.id}`);
  const post = blogPosts.find(item => path === `/blog/${item.slug}`);
  const en = language === 'en';
  const localized = program && localizeProgram(program, language);
  const exists = Boolean(page || program || post);
  const name = localized ? `${localized.name} ${en ? 'from Hurghada' : 'Hurghadából'}`
    : post ? post.title : page ? (en ? page.enTitle : page.title)
      : path === '/admin' ? 'Admin' : en ? 'Page not found' : 'Az oldal nem található';
  const description = localized ? `${localized.tagline} ${en ? 'Programme details and hotel transfer. Booking on WhatsApp.' : 'Programrészletek és hoteltranszfer. Egyeztetés WhatsAppon.'}`
    : post ? post.excerpt : page ? (en ? page.enDescription : page.description) : '';
  const title = `${name} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path === '/' ? '/' : path}`;
  const image = program ? `${SITE_URL}${program.image}` : post ? `${SITE_URL}${post.coverImage}` : HOME_IMAGE;
  const organization = { '@type': 'TravelAgency', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: `${SITE_URL}/`, telephone: WHATSAPP_NUMBER, sameAs: [FACEBOOK_URL], areaServed: { '@type': 'Place', name: 'Hurghada, Egyiptom' } };
  const graph: Record<string, unknown>[] = exists ? [organization, {
    '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, url: `${SITE_URL}/`, inLanguage: 'hu', publisher: { '@id': organization['@id'] },
  }, {
    '@type': post ? 'Article' : 'WebPage', '@id': `${url}#page`, url, name, ...(post ? { headline: post.title } : {}), description, image,
    inLanguage: post ? 'hu' : language, isPartOf: { '@id': `${SITE_URL}/#website` }, ...(post ? { publisher: { '@id': organization['@id'] } } : {}),
  }] : [];
  if (program) graph.push({ '@type': 'TouristTrip', '@id': `${url}#trip`, name: localized!.name, description: localized!.tagline, image, url, provider: { '@id': organization['@id'] } });
  if (path !== '/' && exists) {
    const crumbs = [{ name: en ? 'Home' : 'Főoldal', item: `${SITE_URL}/` }];
    if (program) crumbs.push({ name: en ? 'Excursions' : 'Programok', item: `${SITE_URL}/programok` });
    if (post) crumbs.push({ name: 'Blog', item: `${SITE_URL}/blog` });
    crumbs.push({ name: program ? localized!.name : name, item: url });
    graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, ...crumb })) });
  }
  return { title, description, url, image, type: post ? 'article' : 'website', language: post ? 'hu' : language, robots: exists ? 'index, follow, max-image-preview:large' : 'noindex, nofollow', structuredData: { '@context': 'https://schema.org', '@graph': graph } };
}

export function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
