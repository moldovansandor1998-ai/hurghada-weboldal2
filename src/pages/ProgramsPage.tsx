import ProgramsSection from '@/sections/ProgramsSection';
import Footer from '@/sections/Footer';
import { useLanguage } from '@/lib/i18n';

export default function ProgramsPage() {
  const { language } = useLanguage();
  return <><main className="pt-24"><header className="mx-auto max-w-3xl px-4 text-center">
    <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{language === 'en' ? 'Hurghada excursions and prices' : 'Hurghada fakultatív programok és árak'}</h1>
    <p className="mt-4 leading-relaxed text-slate-600">{language === 'en' ? 'Compare sea trips, desert safaris, sightseeing and family activities. Each excursion includes details of the itinerary, price and hotel transfer.' : 'Hasonlítsd össze a tengeri kirándulásokat, sivatagi szafarikat, városnézéseket és családi programokat. Minden programnál megtalálod az útvonalat, az árat és a hoteltől hotelig transzfer tudnivalóit.'}</p>
  </header><ProgramsSection /></main><Footer /></>;
}
