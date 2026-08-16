import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function BlogList() {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 sm:py-20 bg-[#f8fafc] min-h-screen" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Back + Header */}
        <div className={`mb-8 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-[#64748b] hover:text-[#0284c7] text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={18} />
            Vissza a főoldalra
          </button>
          <h1 className="text-[#1e293b] font-bold text-3xl sm:text-4xl">Hasznos információk</h1>
          <p className="text-[#64748b] text-base mt-2">Minden, amit tudnod kell Hurghadáról</p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogPosts.map((post, idx) => (
            <div
              key={post.slug}
              className={`bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${150 + idx * 100}ms` }}
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              {/* Cover Image */}
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-[#1e293b] font-bold text-lg sm:text-xl mb-2 leading-snug group-hover:text-[#0284c7] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[#64748b] text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[#0284c7] font-semibold text-sm">
                  Tovább olvasom
                  <BookOpen size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
