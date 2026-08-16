import { MessageCircle, Info, Clock, Calendar } from 'lucide-react';
import type { Program } from '@/data/programs';
import { WHATSAPP_NUMBER } from '@/data/programs';

interface ProgramCardProps {
  program: Program;
  onDetails: (program: Program) => void;
  index: number;
}

export default function ProgramCard({ program, onDetails, index }: ProgramCardProps) {
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'tengeri': return 'Tengeri';
      case 'sivatagi': return 'Sivatagi';
      case 'varosnezes': return 'Városnézés';
      case 'csaldi': return 'Családi';
      default: return cat;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'tengeri': return 'bg-[#0284c7]';
      case 'sivatagi': return 'bg-[#f59e0b]';
      case 'varosnezes': return 'bg-[#8b5cf6]';
      case 'csaldi': return 'bg-[#10b981]';
      default: return 'bg-[#64748b]';
    }
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=Szia!+Érdekelne+a(z)+${encodeURIComponent(program.name)}+program.`;

  return (
    <div
      className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Badge */}
        <span className={`absolute top-3 left-3 ${getCategoryColor(program.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
          {getCategoryLabel(program.category)}
        </span>
        {/* Price badge on image */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
          <span className="text-[#f97316] font-extrabold text-xl">€{program.price}</span>
          <span className="text-[#64748b] text-xs ml-0.5">/ fő</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-[#1e293b] font-bold text-lg mb-1 leading-snug">
          {program.name}
        </h3>

        {/* Duration & Availability */}
        <div className="flex flex-wrap gap-2 mb-3 text-xs text-[#64748b]">
          <span className="inline-flex items-center gap-1 bg-[#f1f5f9] rounded-full px-2.5 py-1">
            <Clock size={12} />
            {program.duration}
          </span>
          <span className="inline-flex items-center gap-1 bg-[#f1f5f9] rounded-full px-2.5 py-1">
            <Calendar size={12} />
            {program.availability}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-[#64748b] text-sm leading-relaxed mb-2 line-clamp-3 flex-grow">
          {program.tagline}
        </p>

        {/* Highlight */}
        <p className="text-[#0284c7] font-semibold text-xs mb-4 bg-[#e0f2fe] rounded-lg px-3 py-1.5 inline-block">
          {program.highlight}
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[10px] font-semibold text-[#0284c7] bg-[#e0f2fe] rounded-full px-2 py-0.5">
            Hotel–hotel transzfer
          </span>
          <span className="text-[10px] font-semibold text-[#059669] bg-[#d1fae5] rounded-full px-2 py-0.5">
            Nincs előrefizetés
          </span>
          <span className="text-[10px] font-semibold text-[#d97706] bg-[#fef3c7] rounded-full px-2 py-0.5">
            Fizetés induláskor
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={() => onDetails(program)}
            className="inline-flex items-center justify-center gap-1.5 text-[#0284c7] hover:text-white hover:bg-[#0284c7] font-medium text-sm py-2.5 transition-all border border-[#0284c7]/30 rounded-lg hover:border-[#0284c7]"
          >
            <Info size={16} />
            Részletek megtekintése
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white font-semibold text-sm py-2.5 rounded-lg transition-all hover:scale-[1.02] shadow-sm"
          >
            <MessageCircle size={16} />
            Foglalás WhatsAppon
          </a>
        </div>
      </div>
    </div>
  );
}
