import { Gift, AlertTriangle, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function OffersSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="ajanlatok" className="py-16 sm:py-20 bg-gradient-to-b from-[#fefce8] to-[#fef9c3]" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className={`text-center mb-10 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-[#1e293b] font-bold text-3xl sm:text-4xl mb-3">
            <span className="mr-2">🎁</span>Speciális ajánlatok
          </h2>
          <p className="text-[#64748b] text-base max-w-xl mx-auto">
            Foglalj programokat és élvezd az extra kedvezményeket!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">

          {/* OFFER 1: Free Airport Transfer */}
          <div className={`bg-white rounded-2xl border-2 border-[#7dd3fc] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '100ms' }}>
            <div className="bg-[#e0f2fe] p-5">
              <h3 className="text-[#0369a1] font-extrabold text-xl leading-snug mb-2">
                <span className="mr-1.5">🚨</span>Ingyenes reptéri transzfer
              </h3>
              <p className="text-[#475569] text-sm">Ha nálunk foglalsz programot:</p>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-start gap-2.5">
                <Gift size={18} className="text-[#0284c7] mt-0.5 flex-shrink-0" />
                <p className="text-[#1e293b] font-semibold text-sm"><span className="font-extrabold text-[#0284c7]">INGYENES</span> transzfer a reptérről a hotelbe</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Gift size={18} className="text-[#0284c7] mt-0.5 flex-shrink-0" />
                <p className="text-[#1e293b] font-semibold text-sm"><span className="font-extrabold text-[#0284c7]">INGYENES</span> visszautazás a hotelből a reptérre</p>
              </div>
              <div className="space-y-2 pt-3 border-t border-[#f1f5f9]">
                <p className="text-[#64748b] text-sm">📍 A sofőr névtáblával vár a reptéren</p>
                <p className="text-[#64748b] text-sm">📍 Nincs alkudozás, nincs lehúzás</p>
              </div>
            </div>
            <div className="mx-5 mb-5 bg-[#0284c7] rounded-xl p-4 text-white">
              <p className="font-bold text-sm mb-2">🎁 Feltételek:</p>
              <ul className="space-y-1 text-sm">
                <li>– minimum 5 fő</li>
                <li>– minimum 4 program</li>
              </ul>
            </div>
          </div>

          {/* OFFER 2: 3+1 */}
          <div className={`bg-white rounded-2xl border-2 border-[#fca5a5] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '200ms' }}>
            <div className="bg-[#fef2f2] p-5">
              <h3 className="text-[#dc2626] font-extrabold text-xl leading-snug mb-2">
                <span className="mr-1.5">🎯</span>3+1 akció
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-[#dc2626] rounded-xl p-4 text-white text-center">
                <p className="font-extrabold text-lg">3 program = 4. INGYENES</p>
              </div>
              <p className="text-[#475569] text-sm text-center">Ha 3 programon részt veszel nálunk, a 4. programot <span className="font-bold text-[#dc2626]">INGYEN</span> kapod!</p>
            </div>
            <div className="mx-5 mb-5 bg-[#fef3c7] rounded-lg p-4 border border-[#fcd34d]">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-[#f59e0b] mt-0.5 flex-shrink-0" />
                <p className="text-[#92400e] text-xs leading-relaxed">A 4 program közül a <strong>legolcsóbb</strong> ingyenes</p>
              </div>
            </div>
          </div>

          {/* OFFER 3: 2 Program = Dolphin Show Ingyen */}
          <div className={`bg-white rounded-2xl border-2 border-[#a78bfa] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '300ms' }}>
            <div className="bg-[#ede9fe] p-5">
              <h3 className="text-[#7c3aed] font-extrabold text-xl leading-snug mb-2">
                <span className="mr-1.5">🎁</span>2 PROGRAM = DOLPHIN SHOW INGYEN
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-[#7c3aed] rounded-xl p-4 text-white text-center">
                <p className="font-extrabold text-base leading-snug">Bármely 2 különböző programon részt veszel = Dolphin Show INGYEN</p>
              </div>
              <p className="text-[#475569] text-sm text-center">Ha nálunk bármely 2 különböző programon részt veszel, ajándékba adjuk a Dolphin Show programunkat <span className="font-bold text-[#7c3aed]">teljesen ingyen</span>.</p>
              <div className="bg-[#f0fdf4] rounded-lg p-3 border border-[#86efac] text-center">
                <p className="text-[#15803d] font-bold text-sm">Dolphin Show ára ebben az esetben: <span className="text-lg">0 € / fő</span></p>
              </div>
            </div>
            <div className="mx-5 mb-5 bg-[#fef3c7] rounded-lg p-4 border border-[#fcd34d]">
              <div className="flex items-start gap-2">
                <Star size={16} className="text-[#f59e0b] mt-0.5 flex-shrink-0" />
                <p className="text-[#92400e] text-xs font-bold leading-relaxed">AKCIÓS IDŐSZAK: 2026.08.17–2026.09.30.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
