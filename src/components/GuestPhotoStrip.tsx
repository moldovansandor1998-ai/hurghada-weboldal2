import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { manualGuestPhotos } from '@/data/manualGuestPhotos';
import { GuestPhotoImage } from '@/components/GuestPhotoGallery';
import { useLanguage } from '@/lib/i18n';

type Photo = { id: string; photo_url: string; guest_name?: string };
export default function GuestPhotoStrip({ programId }: { programId: string }) {
  const { language } = useLanguage();
  const en = language === 'en';
  const manual = useMemo(() => manualGuestPhotos.filter(photo => photo.program_id === programId), [programId]);
  const [result, setResult] = useState<{ programId: string; photos: Photo[] } | null>(null);
  useEffect(() => {
    let active = true;
    supabase.from('guest_photos').select('id,photo_url,guest_name')
      .eq('status', 'approved').eq('publish_approved', true).eq('program_id', programId)
      .order('created_at', { ascending: false }).limit(8).then(({ data }) => {
        if (active) setResult({ programId, photos: (data || []) as Photo[] });
      });
    return () => { active = false; };
  }, [programId]);
  // Static photos remain available while the database request is in progress.
  const photos = [...manual, ...(result?.programId === programId ? result.photos : [])].slice(0, 8);
  if (!photos.length) return null;
  return (
    <section className="rounded-xl border bg-white p-4">
      <h3 className="mb-3 font-bold">📸 {en ? 'Photos from our guests' : 'Vendégeink fotói'}</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {photos.map(photo => <div key={`${photo.id}:${photo.photo_url}`} className="min-w-0 overflow-hidden rounded-lg">
          <GuestPhotoImage src={photo.photo_url} alt={en ? 'Guest excursion photo' : 'Vendégfotó a programról'} square />
        </div>)}
      </div>
      <Link to="/vendegeink-fotoi" className="mt-3 block text-sm font-semibold text-sky-600">
        {en ? 'All guest photos' : 'Összes vendégfotó'} →
      </Link>
    </section>
  );
}
