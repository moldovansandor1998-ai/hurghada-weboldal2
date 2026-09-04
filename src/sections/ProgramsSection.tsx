import { useState } from 'react';
import { Anchor, Sun, Landmark, Users, LayoutGrid } from 'lucide-react';
import { programs, categories } from '@/data/programs';
import type { Program } from '@/data/programs';
import ProgramCard from './ProgramCard';
import ProgramDetails from './ProgramDetails';

const iconMap: Record<string, React.ElementType> = {
  Anchor,
  Sun,
  Landmark,
  Users,
};

// Pick first category with programs for initial state
const getInitialCategory = (): string => {
  for (const cat of categories) {
    if (programs.some((p) => p.category === cat.id)) {
      return cat.id;
    }
  }
  return categories[0].id;
};

export default function ProgramsSection() {
  const [activeCategory, setActiveCategory] = useState<string>(getInitialCategory());
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const filteredPrograms = activeCategory === 'all'
    ? programs
    : programs.filter((p) => p.category === activeCategory);

  return (
    <section id="programok" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-[#1e293b] font-bold text-3xl sm:text-4xl mb-3">
            Programjaink
          </h2>
          <p className="text-[#64748b] text-base sm:text-lg max-w-xl mx-auto">
            Válassz a kategóriák közül és találd meg a tökéletes programot
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-[#0284c7] text-white shadow-md'
                : 'bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#1e293b]'
            }`}
          >
            <LayoutGrid size={16} />
            Összes program
          </button>
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon];
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0284c7] text-white shadow-md'
                    : 'bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#1e293b]'
                }`}
              >
                {Icon && <Icon size={16} />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Program Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program, idx) => (
            <ProgramCard
              key={program.id}
              program={program}
              onDetails={setSelectedProgram}
              index={idx}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-12 text-[#64748b]">
            Ebben a kategóriában jelenleg nincsenek programok.
          </div>
        )}
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <ProgramDetails
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </section>
  );
}
