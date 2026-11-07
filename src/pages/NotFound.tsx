import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';

export default function NotFound() {
  const { language } = useLanguage();
  return <main className="mx-auto max-w-3xl px-4 pb-16 pt-28 text-center">
    <h1 className="text-3xl font-bold">{language === 'en' ? 'Page not found' : 'Az oldal nem található'}</h1>
    <p className="my-5 text-slate-600">{language === 'en' ? 'The link may be outdated. Browse our current excursions below.' : 'Lehet, hogy a hivatkozás már nem aktuális. Nézd meg az elérhető programjainkat.'}</p>
    <Link to="/programok" className="font-semibold text-sky-700">{language === 'en' ? 'Explore excursions' : 'Programok és árak'}</Link>
  </main>;
}
