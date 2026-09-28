import { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { loadGuestPhoto, type GuestPhotoPhase } from '@/lib/guestPhotoLoader';

type Photo = {
  id: string;
  photo_url: string;
  program_id?: string | null;
  program_name?: string | null;
  guest_name?: string;
};

export function GuestPhotoImage({ src, alt, square = false }: {
  src: string;
  alt: string;
  square?: boolean;
}) {
  const { language } = useLanguage();
  const en = language === 'en';
  const image = useRef<HTMLImageElement>(null);
  const [phase, setPhase] = useState<GuestPhotoPhase>('waiting');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!image.current) return;
    return loadGuestPhoto(image.current, src, setPhase, { forceReload: retry > 0 });
  }, [src, retry]);

  return (
    <div className={`relative w-full overflow-hidden bg-slate-100 ${square ? 'aspect-square' : 'aspect-[3/4]'}`}
      data-photo-state={phase} aria-busy={phase === 'waiting' || phase === 'loading'}>
      <img ref={image} alt={alt} width={square ? 600 : 900} height={square ? 600 : 1200}
        decoding="async"
        className={`absolute inset-0 block h-full w-full object-contain ${phase === 'loaded' ? '' : 'invisible'}`} />
      {(phase === 'waiting' || phase === 'loading') && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 motion-safe:animate-pulse">
          <span className="px-2 text-center text-xs text-slate-500">{en ? 'Loading photo…' : 'Kép betöltése…'}</span>
        </div>
      )}
      {phase === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2 text-center">
          <p className="text-xs text-slate-600">{en ? 'The photo could not be loaded.' : 'A kép betöltése nem sikerült.'}</p>
          <button type="button" onClick={() => setRetry(value => value + 1)}
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl border border-sky-200 bg-white px-3 py-2 text-xs font-bold text-sky-700">
            <RefreshCw size={14} />{en ? 'Retry' : 'Újratöltés'}
          </button>
        </div>
      )}
    </div>
  );
}

const PAGE_SIZE = 12;
export default function GuestPhotoGallery({ photos }: { photos: Photo[] }) {
  const { language } = useLanguage();
  const en = language === 'en';
  const [limit, setLimit] = useState(PAGE_SIZE);
  const visible = photos.slice(0, limit);
  return (
    <div className="min-w-0" data-guest-photo-gallery="reliable-v2">
      <div className="grid grid-cols-2 items-start gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visible.map(photo => (
          <figure key={`${photo.id}:${photo.photo_url}`} className="min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <GuestPhotoImage src={photo.photo_url} alt={photo.program_name || (en ? 'Guest photo' : 'Vendégfotó')} />
            {photo.program_id && photo.program_name && <figcaption className="break-words p-3 text-xs font-bold">{photo.program_name}</figcaption>}
          </figure>
        ))}
      </div>
      {visible.length < photos.length && (
        <button type="button" onClick={() => setLimit(value => value + PAGE_SIZE)}
          className="mt-5 min-h-12 w-full rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 font-bold text-sky-700">
          {en ? 'Load more photos' : 'További képek betöltése'} · {photos.length - visible.length} {en ? 'remaining' : 'hátra'}
        </button>
      )}
    </div>
  );
}
