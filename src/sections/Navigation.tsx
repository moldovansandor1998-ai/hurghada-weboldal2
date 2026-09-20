import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, BookOpen, Gift, AlertTriangle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/programs';
import { useLanguage } from '@/lib/i18n';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const en = language === 'en';
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 shadow-md'
          : 'bg-white/95 shadow-sm'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-[#0284c7] font-bold text-xl tracking-tight hover:text-[#0369a1] transition-colors"
          >
            {en ? 'Hurghada Excursions' : 'Hurghada Programok'}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('programok')}
              className="text-[#1e293b] hover:text-[#0284c7] font-medium text-sm transition-colors"
            >
              {en ? 'Excursions' : 'Programok'}
            </button>
            <button
              onClick={() => { navigate('/ajanlatok'); }}
              className={`font-medium text-sm transition-colors inline-flex items-center gap-1 ${
                location.pathname === '/ajanlatok'
                  ? 'text-[#0284c7]'
                  : 'text-[#1e293b] hover:text-[#0284c7]'
              }`}
            >
              <Gift size={14} />
              {en ? 'Offers' : 'Ajánlatok'}
            </button>
            <button
              onClick={() => { navigate('/blog'); }}
              className={`font-medium text-sm transition-colors inline-flex items-center gap-1 ${
                location.pathname.startsWith('/blog')
                  ? 'text-[#0284c7]'
                  : 'text-[#1e293b] hover:text-[#0284c7]'
              }`}
            >
              <BookOpen size={14} />
              Blog
            </button>
            <button
              onClick={() => scrollToSection('kapcsolat')}
              className={`font-medium text-sm transition-colors ${location.pathname === '/kapcsolat' ? 'text-[#0284c7]' : 'text-[#1e293b] hover:text-[#0284c7]'}`}
            >
              {en ? 'Contact' : 'Kapcsolat'}
            </button>
            <button
              onClick={() => { navigate('/fontos-informaciok'); }}
              className={`font-medium text-sm transition-colors inline-flex items-center gap-1 px-3 py-1.5 rounded-full ${
                location.pathname === '/fontos-informaciok'
                  ? 'bg-[#f59e0b] text-white'
                  : 'bg-[#fef3c7] text-[#92400e] hover:bg-[#f59e0b] hover:text-white'
              }`}
            >
              <AlertTriangle size={14} />
              {en ? 'Important info' : 'Fontos infók'}
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold text-sm px-4 py-2.5 rounded-full transition-all hover:scale-105 shadow-md"
            >
              <Phone size={14} />
              {en ? 'Book on WhatsApp' : 'Foglalás WhatsAppon'}
            </a>
            <div className="inline-flex rounded-full border bg-slate-50 p-1 text-xs font-bold" aria-label="Language selector"><button onClick={() => setLanguage('hu')} className={`rounded-full px-2.5 py-1.5 ${language === 'hu' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}>HU</button><button onClick={() => setLanguage('en')} className={`rounded-full px-2.5 py-1.5 ${language === 'en' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}>EN</button></div>
          </div>

          {/* Mobile language switcher — always visible, not hidden in the menu. */}
          <button
            type="button"
            onClick={() => setLanguage(en ? 'hu' : 'en')}
            aria-label={en ? 'Váltás magyar nyelvre' : 'Switch to English'}
            className="ml-auto mr-1 inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-sky-200 bg-sky-50 px-3 text-sm font-black text-sky-700 shadow-sm md:hidden"
          >
            {en ? 'HU' : 'EN'}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? (en ? 'Close menu' : 'Menü bezárása') : (en ? 'Open menu' : 'Menü megnyitása')}
            className="md:hidden text-[#1e293b] p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('programok')}
              className="block w-full text-left text-[#1e293b] hover:text-[#0284c7] font-medium py-2 transition-colors"
            >
              {en ? 'Excursions' : 'Programok'}
            </button>
            <button
              onClick={() => { navigate('/ajanlatok'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left font-medium py-2 transition-colors inline-flex items-center gap-2 ${
                location.pathname === '/ajanlatok'
                  ? 'text-[#0284c7]'
                  : 'text-[#1e293b] hover:text-[#0284c7]'
              }`}
            >
              <Gift size={16} />
              {en ? 'Offers' : 'Ajánlatok'}
            </button>
            <button
              onClick={() => { navigate('/blog'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left font-medium py-2 transition-colors inline-flex items-center gap-2 ${
                location.pathname.startsWith('/blog')
                  ? 'text-[#0284c7]'
                  : 'text-[#1e293b] hover:text-[#0284c7]'
              }`}
            >
              <BookOpen size={16} />
              Blog
            </button>
            <button
              onClick={() => scrollToSection('kapcsolat')}
              className={`block w-full text-left font-medium py-2 transition-colors ${location.pathname === '/kapcsolat' ? 'text-[#0284c7]' : 'text-[#1e293b] hover:text-[#0284c7]'}`}
            >
              {en ? 'Contact' : 'Kapcsolat'}
            </button>
            <button
              onClick={() => { navigate('/fontos-informaciok'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left font-medium py-2 transition-colors inline-flex items-center gap-2 px-3 rounded-lg ${
                location.pathname === '/fontos-informaciok'
                  ? 'bg-[#f59e0b] text-white'
                  : 'bg-[#fef3c7] text-[#92400e]'
              }`}
            >
              <AlertTriangle size={16} />
              {en ? 'Important info' : 'Fontos infók'}
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold px-4 py-2.5 rounded-full transition-all shadow-md"
            >
              <Phone size={16} />
              {en ? 'Book on WhatsApp' : 'Foglalás WhatsAppon'}
            </a>
            <div className="flex items-center gap-2 border-t pt-3"><span className="text-sm font-semibold text-slate-500">Language:</span><button onClick={() => setLanguage('hu')} className={`rounded-lg px-3 py-2 text-sm font-bold ${language === 'hu' ? 'bg-sky-600 text-white' : 'bg-slate-100'}`}>Magyar</button><button onClick={() => setLanguage('en')} className={`rounded-lg px-3 py-2 text-sm font-bold ${language === 'en' ? 'bg-sky-600 text-white' : 'bg-slate-100'}`}>English</button></div>
          </div>
        </div>
      )}
    </nav>
  );
}
