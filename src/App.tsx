import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  // A korábbi hash-alapú linkeket egyszer átvezetjük a tiszta URL-re.
  if (window.location.hash.startsWith('#/')) {
    window.history.replaceState(null, '', window.location.hash.slice(1))
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans antialiased">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/ajanlatok" element={<OffersSection />} />
          <Route path="/fontos-informaciok" element={<FontosInformaciok />} />
          <Route path="/program/:programId" element={<ProgramPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
