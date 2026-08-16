import { HashRouter, Routes, Route } from 'react-router-dom';
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
import FloatingPromotion from '@/components/FloatingPromotion';

function HomePage() {
  return (
    <>
      <Hero />
      <InfoBar />
      <ProgramsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-white font-sans antialiased">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/ajanlatok" element={<OffersSection />} />
          <Route path="/fontos-informaciok" element={<FontosInformaciok />} />
        </Routes>
        <FloatingPromotion />
      </div>
    </HashRouter>
  );
}

export default App;
