import { Phone, Facebook, Check, MessageCircle, Users } from 'lucide-react';
import { WHATSAPP_NUMBER, FACEBOOK_URL } from '@/data/programs';

export default function ContactSection() {
  const importantNotes = [
    'Nincs szükség előre foglalásra',
    'Elég 1 nappal előtte jelezni',
    'Fizetés a program indulásakor: Revolut / Wise / EUR / USD készpénz',
    'A pontos indulási időt előző este küldjük',
    'Makadi, Sahl Hasheesh és Safaga területéről transzferdíj / program (egyszeri díj): 4 főig +10 €, 6 főig +15 €, 6 fő felett +25 €.',
    'Csak WhatsAppon vagyunk elérhetőek 0–24',
  ];

  return (
    <section
      id="kapcsolat"
      className="py-16 sm:py-20 bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#0c4a6e]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-white font-bold text-3xl sm:text-4xl mb-3">
            Kapcsolat
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto">
            Írj nekünk bátran, segítünk kiválasztani a legjobb programot!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* WhatsApp */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={28} className="text-white" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-1">WhatsApp</h3>
            <p className="text-white/80 text-sm mb-4">{WHATSAPP_NUMBER}</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white font-medium px-6 py-2.5 rounded-full transition-all hover:scale-105"
            >
              <MessageCircle size={18} />
              Írj nekünk!
            </a>
          </div>

          {/* Facebook Page */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="w-14 h-14 bg-[#1877f2] rounded-full flex items-center justify-center mx-auto mb-4">
              <Facebook size={28} className="text-white" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-1">Facebook</h3>
            <p className="text-white/80 text-sm mb-4">Kövess minket!</p>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1877f2] hover:bg-[#166fe5] text-white font-medium px-6 py-2.5 rounded-full transition-all hover:scale-105"
            >
              <Facebook size={18} />
              Facebook oldal
            </a>
          </div>

          {/* Facebook Group */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="w-14 h-14 bg-[#1877f2] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={28} className="text-white" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-1">Facebook Csoport</h3>
            <p className="text-white/80 text-sm mb-4">Csatlakozz a közösségünkhöz!</p>
            <a
              href="https://www.facebook.com/groups/2154604278614127"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-2.5 rounded-full transition-all hover:scale-105 border border-white/30"
            >
              <Users size={18} />
              Csatlakozom
            </a>
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
          <h3 className="text-white font-bold text-lg mb-4 text-center">
            Fontos tudnivalók
          </h3>
          <ul className="space-y-3">
            {importantNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-white/90 text-sm">
                <Check size={16} className="text-[#fbbf24] mt-0.5 flex-shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
