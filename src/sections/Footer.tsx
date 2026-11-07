import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="bg-[#1e293b] py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="text-[#94a3b8] text-sm mb-2">
            &copy; {new Date().getFullYear()} {language === 'en' ? 'Hurghada Excursions — All rights reserved.' : 'Hurghada Programok — Minden jog fenntartva.'}
          </p>
          <div className="mb-3 flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link to="/programok" className="text-slate-300 hover:text-white">{language === 'en' ? 'Excursions' : 'Programok'}</Link>
            <Link to="/blog" className="text-slate-300 hover:text-white">Blog</Link>
            <Link to="/kapcsolat" className="text-slate-300 hover:text-white">{language === 'en' ? 'Contact' : 'Kapcsolat'}</Link>
            <Link to="/fontos-informaciok" className="text-slate-300 hover:text-white">{language === 'en' ? 'Important information' : 'Fontos információk'}</Link>
            <Link to="/aszf" className="text-slate-300 hover:text-white">{language === 'en' ? 'Terms' : 'ÁSZF'}</Link>
            <Link to="/admin" className="text-[#64748b] hover:text-white">Admin</Link>
          </div>
          <p className="text-[#64748b] text-xs flex items-center justify-center gap-1">
            Made with <Heart size={12} className="text-[#f43f5e] fill-current" /> for Hurghada travelers
          </p>
        </div>
      </div>
    </footer>
  );
}
