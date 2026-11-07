import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';

export default function Hero() {
  const { language } = useLanguage();
  const en = language === 'en';
  return (
    <section className="relative w-full overflow-hidden pt-16">
      <img src="/images/hero.jpg" alt="Hurghada Programok - Hurghada kirándulások és programok"
        fetchPriority="high" className="w-full h-auto object-cover object-center block" style={{ maxHeight: '75vh' }} />
      <div className="mx-auto max-w-[1200px] px-4 py-10 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {en ? 'Hurghada excursions and day trips' : 'Hurghada programok és fakultatív kirándulások'}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
          {en ? 'Explore Red Sea islands, desert safaris and day trips to Cairo and Luxor. Compare programmes, prices and transfer details, then contact us on WhatsApp.' : 'Hajós kirándulások a Vörös-tengeren, Orange Bay és szigettúrák, sivatagi szafarik, valamint kairói és luxori programok Hurghadából. Nézd meg az árakat és a transzfer részleteit, majd egyeztess velünk WhatsAppon, magyarul.'}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-4 font-semibold text-sky-700">
          <Link to="/programok">{en ? 'Explore excursions and prices' : 'Programok és árak'}</Link>
          <Link to="/fontos-informaciok">{en ? 'Transfer and guide information' : 'Transzfer és idegenvezetés'}</Link>
        </div>
      </div>
    </section>
  );
}
