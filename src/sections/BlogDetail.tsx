import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { blogPosts } from '@/data/blog';

export default function BlogDetail() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="py-16 sm:py-20 bg-white min-h-screen">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-[#1e293b] font-bold text-2xl mb-4">Cikk nem található</h1>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-[#0284c7] hover:text-[#0369a1] font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Vissza a bloghoz
          </button>
        </div>
      </section>
    );
  }

  // Parse content: split by double newlines for sections
  const sections = post.content.split('\n\n');

  return (
    <section className="py-16 sm:py-20 bg-[#f8fafc] min-h-screen">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">

        {/* Back buttons */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-[#64748b] hover:text-[#0284c7] text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Főoldal
          </button>
          <span className="text-[#cbd5e1]">|</span>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-1.5 text-[#64748b] hover:text-[#0284c7] text-sm font-medium transition-colors"
          >
            <BookOpen size={16} />
            Blog
          </button>
        </div>

        {/* Article */}
        <article className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">

          {/* Cover Image */}
          <div className="aspect-[21/9] sm:aspect-[3/1] overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Title */}
            <h1 className="text-[#1e293b] font-bold text-2xl sm:text-3xl mb-6 leading-snug">
              {post.title}
            </h1>

            {/* Sections */}
            <div className="space-y-5">
              {sections.map((section, idx) => {
                const lines = section.split('\n').filter((l) => l.trim());
                if (lines.length === 0) return null;

                const firstLine = lines[0];

                // Check if this is a list section
                if (firstLine === 'Fontos:') {
                  return (
                    <div key={idx}>
                      <h3 className="text-[#1e293b] font-bold text-base mb-2">{firstLine}</h3>
                      <ul className="space-y-1.5">
                        {lines.slice(1).map((line, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-2.5 text-[#475569] text-sm sm:text-base leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] mt-2 flex-shrink-0" />
                            <span>{line.replace(/^–\s*/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                // Check for list items
                const isList = lines.some((l) => l.startsWith('–'));
                if (isList) {
                  return (
                    <div key={idx}>
                      {lines[0] && !lines[0].startsWith('–') && (
                        <h3 className="text-[#1e293b] font-bold text-base mb-2">{lines[0]}</h3>
                      )}
                      <ul className="space-y-1.5">
                        {lines.filter((l) => l.startsWith('–')).map((line, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-2.5 text-[#475569] text-sm sm:text-base leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-2 flex-shrink-0" />
                            <span>{line.replace(/^–\s*/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                // Regular paragraph with heading
                if (firstLine.endsWith(':')) {
                  return (
                    <div key={idx}>
                      <h3 className="text-[#1e293b] font-bold text-base mb-2">{firstLine}</h3>
                      {lines.slice(1).map((line, lIdx) => (
                        <p key={lIdx} className="text-[#475569] text-sm sm:text-base leading-relaxed mb-1">{line}</p>
                      ))}
                    </div>
                  );
                }

                // Regular paragraph
                return (
                  <div key={idx}>
                    {lines.map((line, lIdx) => (
                      <p key={lIdx} className="text-[#475569] text-sm sm:text-base leading-relaxed mb-1">{line}</p>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-[#e2e8f0]">
              <p className="text-[#64748b] text-sm mb-3">Kérdésed van a témával kapcsolatban?</p>
              <a
                href={`https://wa.me/201276551571?text=Szia!+A+${encodeURIComponent(post.title)}+cikkel+kapcsolatban+lenne+kerdesem.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#25d366] hover:bg-[#128c7e] text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-[1.02]"
              >
                Írj nekünk WhatsAppon!
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
