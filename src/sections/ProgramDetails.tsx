import { X, MessageCircle, CreditCard, Ban, Clock, Calendar, Bus, AlertTriangle, Languages, Sparkles, Info } from 'lucide-react';
import type { Program } from '@/data/programs';
import { WHATSAPP_NUMBER, IMPORTANT_INFO } from '@/data/programs';

interface ProgramDetailsProps {
  program: Program | null;
  onClose: () => void;
}

export default function ProgramDetails({ program, onClose }: ProgramDetailsProps) {
  if (!program) return null;

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=Szia!+Érdekelne+a(z)+${encodeURIComponent(program.name)}+program.`;

  // Parse description: split by double newlines
  const blocks = program.fullDescription.split('\n\n');

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[520px] bg-[#fafafa] z-50 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-[#1e293b] p-2 rounded-full shadow-md transition-all hover:scale-110"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="relative h-52 sm:h-60">
          <img src={program.image} alt={program.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Price on image */}
          <div className="absolute bottom-4 left-5">
            <p className="text-white/70 text-xs font-medium mb-0.5">Már</p>
            <p className="text-white font-extrabold text-4xl leading-none">€{program.price}<span className="text-lg font-semibold">/fő</span></p>
            {program.childPrice && (
              <p className="text-white/80 text-xs mt-1">Gyermek: {program.childPrice}</p>
            )}
          </div>
        </div>

        {/* Hot Air Balloon Option */}
        {program.hasBalloonOption && program.balloonPrice && (
          <div className="mx-4 -mt-4 relative z-10">
            <div className="bg-gradient-to-r from-[#f59e0b] to-[#f97316] rounded-xl p-4 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">+ Hőlégballon opció: {program.balloonPrice}</p>
                <p className="text-white/80 text-xs">Repülj Luxor felett napfelkeltekor</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5 space-y-5">

          {/* Title & Tagline */}
          <div>
            <h2 className="text-[#1e293b] font-bold text-xl leading-snug">{program.name}</h2>
            <p className="text-[#64748b] text-sm mt-1.5 leading-relaxed">{program.tagline}</p>
          </div>

          {/* STRONG headline sentence */}
          <div className="bg-[#0284c7] rounded-xl p-4 text-center shadow-md">
            <p className="text-white font-bold text-base leading-snug">
              Nem kell előre fizetni – csak gyere és élvezd az utat.
            </p>
          </div>

          {/* Trust Badges - highlighted */}
          <div className="bg-white rounded-xl p-4 border border-[#e2e8f0] space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#e0f2fe] rounded-lg flex items-center justify-center flex-shrink-0">
                <Bus size={16} className="text-[#0284c7]" />
              </div>
              <div>
                <p className="text-[#1e293b] font-semibold text-sm">Hotel–hotel transzfer</p>
                <p className="text-[#64748b] text-xs">Az ajtód elől indulunk, oda is viszünk vissza</p>
              </div>
            </div>
            <div className="h-px bg-[#f1f5f9]" />
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#fee2e2] rounded-lg flex items-center justify-center flex-shrink-0">
                <Ban size={16} className="text-[#ef4444]" />
              </div>
              <div>
                <p className="text-[#1e293b] font-semibold text-sm">Nincs előrefizetés</p>
                <p className="text-[#64748b] text-xs">Nem kell előre fizetni</p>
              </div>
            </div>
            <div className="h-px bg-[#f1f5f9]" />
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#d1fae5] rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard size={16} className="text-[#10b981]" />
              </div>
              <div>
                <p className="text-[#1e293b] font-semibold text-sm">Fizetés a program indulásakor</p>
                <p className="text-[#64748b] text-xs">Revolut / Wise / EUR / USD készpénz</p>
              </div>
            </div>
          </div>

          {/* Duration & Availability */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3.5 border border-[#e2e8f0]">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock size={14} className="text-[#0284c7]" />
                <span className="text-[#64748b] text-xs font-medium">Időtartam</span>
              </div>
              <p className="text-[#1e293b] font-semibold text-sm">{program.duration}</p>
            </div>
            <div className="bg-white rounded-xl p-3.5 border border-[#e2e8f0]">
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar size={14} className="text-[#0284c7]" />
                <span className="text-[#64748b] text-xs font-medium">Elérhetőség</span>
              </div>
              <p className="text-[#1e293b] font-semibold text-sm">{program.availability}</p>
            </div>
          </div>

          {/* Guide Info - BIGGER, more prominent */}
          {program.guideInfo && (
            <div className="bg-gradient-to-br from-[#0284c7] to-[#0369a1] rounded-xl p-5 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Languages size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-2">Idegenvezetés</p>
                  {program.guideInfo.split('\n').map((line, i) => (
                    <p key={i} className="text-white/90 text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Full Description Blocks */}
          <div className="space-y-5">
            {blocks.map((block, idx) => {
              const lines = block.split('\n').filter(l => l.trim());
              if (lines.length === 0) return null;

              const firstLine = lines[0];
              const restLines = lines.slice(1);

              // Check for bullet points anywhere in block
              const hasBullets = block.includes('•');

              // Schedule change warning
              if (firstLine.includes('sorrendje változhat')) {
                return (
                  <div key={idx} className="bg-[#fef3c7] rounded-lg p-3.5 flex items-start gap-2.5 border border-[#fcd34d]">
                    <AlertTriangle size={18} className="text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <p className="text-[#92400e] text-sm leading-relaxed">{firstLine}</p>
                  </div>
                );
              }

              // Bullet highlight box → BLUE
              if (hasBullets) {
                return (
                  <div key={idx} className="bg-[#eff6ff] rounded-xl p-4 border border-[#93c5fd]">
                    <h3 className="text-[#1e40af] font-bold text-sm mb-3">{firstLine}</h3>
                    <ul className="space-y-2.5">
                      {restLines.map((line, lIdx) => (
                        line.trim() && (
                          <li key={lIdx} className="flex items-start gap-2.5 text-sm text-[#1d4ed8]">
                            <span className="w-2 h-2 rounded-full bg-[#3b82f6] mt-1.5 flex-shrink-0" />
                            <span>{line.replace('• ', '')}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                );
              }

              // "Az ár tartalmazza:" → GREEN
              if (firstLine.toLowerCase().startsWith('az ár tartalmaz')) {
                return (
                  <div key={idx} className="bg-[#f0fdf4] rounded-xl p-4 border border-[#10b981]/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={14} className="text-[#10b981]" />
                      <h3 className="text-[#1e293b] font-bold text-sm">{firstLine}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {restLines.map((line, lIdx) => (
                        line.trim() && (
                          <li key={lIdx} className="flex items-start gap-2.5 text-sm text-[#475569]">
                            <span className="w-2 h-2 rounded-full bg-[#10b981] mt-1.5 flex-shrink-0" />
                            <span>{line.replace('– ', '')}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                );
              }

              // "Az ár nem tartalmazza:" → GREEN (same as includes)
              if (firstLine.toLowerCase().startsWith('az ár nem tartalmaz')) {
                return (
                  <div key={idx} className="bg-[#f0fdf4] rounded-xl p-4 border border-[#10b981]/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Info size={14} className="text-[#059669]" />
                      <h3 className="text-[#1e293b] font-bold text-sm">{firstLine}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {restLines.map((line, lIdx) => (
                        line.trim() && (
                          <li key={lIdx} className="flex items-start gap-2.5 text-sm text-[#475569]">
                            <span className="w-2 h-2 rounded-full bg-[#10b981] mt-1.5 flex-shrink-0" />
                            <span>{line.replace('– ', '')}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                );
              }

              // "Gyermekek:" → RED box
              if (firstLine.toLowerCase().startsWith('gyermekek')) {
                return (
                  <div key={idx} className="bg-[#fef2f2] rounded-xl p-4 border border-[#fca5a5]">
                    <h3 className="text-[#dc2626] font-bold text-sm mb-3">{firstLine}</h3>
                    <ul className="space-y-2.5">
                      {restLines.map((line, lIdx) => (
                        line.trim() && (
                          <li key={lIdx} className="flex items-start gap-2.5 text-sm text-[#475569]">
                            <span className="w-2 h-2 rounded-full bg-[#ef4444] mt-1.5 flex-shrink-0" />
                            <span>{line.replace('– ', '')}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                );
              }

              // "Fontos információk:" → ORANGE box
              if (firstLine.toLowerCase().startsWith('fontos információk')) {
                return (
                  <div key={idx} className="bg-[#fff7ed] rounded-xl p-4 border border-[#fed7aa]">
                    <h3 className="text-[#c2410c] font-bold text-sm mb-3">{firstLine}</h3>
                    <ul className="space-y-2.5">
                      {restLines.map((line, lIdx) => (
                        line.trim() && (
                          <li key={lIdx} className="flex items-start gap-2.5 text-sm text-[#475569]">
                            <span className="w-2 h-2 rounded-full bg-[#f97316] mt-1.5 flex-shrink-0" />
                            <span>{line.replace('– ', '')}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                );
              }

              // Regular paragraph
              return (
                <div key={idx} className="text-[#475569] text-sm leading-relaxed space-y-1.5">
                  {lines.map((line, lIdx) => (
                    <p key={lIdx}>{line}</p>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Important Info */}
          <div className="bg-[#fff7ed] rounded-xl p-4 border border-[#fed7aa]">
            <h4 className="text-[#92400e] font-bold text-sm mb-3">Fontos információk</h4>
            <div className="text-[#a16207] text-sm leading-relaxed whitespace-pre-line">
              {IMPORTANT_INFO}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25d366] hover:bg-[#128c7e] text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg text-base"
          >
            <MessageCircle size={22} />
            Foglalás WhatsAppon
          </a>
        </div>
      </div>
    </>
  );
}
