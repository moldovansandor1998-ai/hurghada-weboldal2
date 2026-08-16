import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function TestimonialsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goPrev = () => setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  const goNext = () => setSelectedIndex((prev) => (prev !== null && prev < testimonials.length - 1 ? prev + 1 : prev));

  return (
    <section id="vendegvelemenyek" className="py-16 sm:py-20 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-10 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-[#1e293b] font-bold text-3xl sm:text-4xl mb-3">
            Vendég visszajelzések
          </h2>
        </div>

        {/* Image Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 transition-all duration-600 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] bg-gray-100"
            >
              <img
                src={t.image}
                alt={`Vendég visszajelzés ${t.id}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 transition-colors z-10"
          >
            <X size={32} />
          </button>

          {/* Prev button */}
          {selectedIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 transition-colors z-10"
            >
              <ChevronLeft size={40} />
            </button>
          )}

          {/* Next button */}
          {selectedIndex < testimonials.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 transition-colors z-10"
            >
              <ChevronRight size={40} />
            </button>
          )}

          {/* Image */}
          <img
            src={testimonials[selectedIndex].image}
            alt={`Vendég visszajelzés nagyítva`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {selectedIndex + 1} / {testimonials.length}
          </div>
        </div>
      )}
    </section>
  );
}
