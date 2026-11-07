import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import InfoBar from '@/sections/InfoBar';
import ProgramsSection from '@/sections/ProgramsSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';
import BlogList from '@/sections/BlogList';
import BlogDetail from '@/sections/BlogDetail';
import OffersSection from '@/sections/OffersSection';
import FontosInformaciok from '@/pages/FontosInformaciok';
import ProgramPage from '@/pages/ProgramPage';
import Admin from '@/pages/Admin';
import NewsletterSection from '@/sections/NewsletterSection';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import ImportantInformationEn from '@/pages/ImportantInformationEn';
import GuestPhotos from '@/pages/GuestPhotos';
import Terms from '@/pages/Terms';
import Seo from '@/components/Seo';
import ProgramsPage from '@/pages/ProgramsPage';
import ContactPage from '@/pages/ContactPage';
import NotFound from '@/pages/NotFound';

function HomePage() {
  return (
    <>
      <Hero />
      <InfoBar />
      <ProgramsSection />
      <TestimonialsSection />
      <ContactSection />
      <NewsletterSection />
      <Footer />
    </>
  );
}

export function AppRoutes() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Seo />
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programok" element={<ProgramsPage />} />
        <Route path="/kapcsolat" element={<ContactPage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/ajanlatok" element={<OffersSection />} />
        <Route path="/fontos-informaciok" element={<LocalizedImportantInformation />} />
        <Route path="/program/:programId" element={<ProgramPage />} />
        <Route path="/vendegeink-fotoi" element={<GuestPhotos />} />
        <Route path="/aszf" element={<Terms />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  // A korábbi hash-alapú linkeket egyszer átvezetjük a tiszta URL-re.
  if (window.location.hash.startsWith('#/')) {
    window.history.replaceState(null, '', window.location.hash.slice(1))
  }

  return <LanguageProvider><BrowserRouter><AppRoutes /></BrowserRouter></LanguageProvider>;
}

function LocalizedImportantInformation() {
  const { language } = useLanguage()
  return language === 'en' ? <ImportantInformationEn /> : <FontosInformaciok />
}

export default App;
