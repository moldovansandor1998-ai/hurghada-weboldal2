import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, BookOpen, Gift, AlertTriangle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/programs';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
            Hurghada Programok
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('programok')}
              className="text-[#1e293b] hover:text-[#0284c7] font-medium text-sm transition-colors"
            >
              Programok
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
              Ajánlatok
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
              Kapcsolat
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
              Fontos infók
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold text-sm px-4 py-2.5 rounded-full transition-all hover:scale-105 shadow-md"
            >
              <Phone size={14} />
              Foglalás WhatsAppon
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
              Programok
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
              Ajánlatok
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
              Kapcsolat
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
              Fontos infók
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold px-4 py-2.5 rounded-full transition-all shadow-md"
            >
              <Phone size={16} />
              Foglalás WhatsAppon
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
