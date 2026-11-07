import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';
import { useLanguage } from '@/lib/i18n';

export default function ContactPage() {
  const { language } = useLanguage();
  return <><main className="pt-24"><h1 className="mb-8 px-4 text-center text-3xl font-extrabold text-slate-900">{language === 'en' ? 'Contact Hurghada Excursions' : 'Kapcsolat és programfoglalás Hurghadában'}</h1><ContactSection /></main><Footer /></>;
}
