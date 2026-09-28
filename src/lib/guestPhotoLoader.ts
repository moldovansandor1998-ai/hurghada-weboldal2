export type GuestPhotoPhase = 'waiting' | 'loading' | 'loaded' | 'error';

type Options = {
  forceReload?: boolean;
  timeoutMs?: number;
  retryDelayMs?: number;
};

// Change only our public image URLs; never alter signed/private URL parameters.
function photoUrl(source: string, retry: string | null): string {
  const url = new URL(source, window.location.href);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('Unsupported image URL');
  }
  const manual = url.origin === window.location.origin &&
    url.pathname.startsWith('/images/guest-photos/manual/');
  const publicStorage = url.pathname.startsWith('/storage/v1/object/public/guest-photos/');
  if (manual) url.searchParams.set('photo_version', '20260928-2');
  if (retry && (manual || publicStorage)) url.searchParams.set('photo_retry', retry);
  return url.href;
}

/** Fetch only near the viewport. One automatic retry, then explicit user recovery. */
export function loadGuestPhoto(
  image: HTMLImageElement,
  source: string,
  onPhase: (phase: GuestPhotoPhase) => void,
  options: Options = {},
): () => void {
  let active = true;
  let started = false;
  let attempt = 0;
  let generation = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let observer: IntersectionObserver | undefined;
  let pending: HTMLImageElement | undefined;
  const nonce = Date.now().toString(36);
  const clearTimer = () => { if (timer !== undefined) clearTimeout(timer); timer = undefined; };
  const cancelPending = () => {
    if (!pending) return;
    pending.onload = null;
    pending.onerror = null;
    pending.src = '';
    pending = undefined;
  };

  function request() {
    if (!active) return;
    clearTimer();
    cancelPending();
    const current = ++generation;
    onPhase('loading');
    let requested: string;
    try {
      requested = photoUrl(source, attempt > 0 || options.forceReload ? `${nonce}-${attempt}` : null);
    } catch {
      onPhase('error');
      return;
    }
    const candidate = new Image();
    pending = candidate;
    candidate.decoding = 'async';
    let settled = false;
    const finish = (ok: boolean) => {
      if (!active || settled || current !== generation) return;
      settled = true;
      clearTimer();
      candidate.onload = null;
      candidate.onerror = null;
      if (ok && candidate.naturalWidth > 0) {
        // Reuse the decoded/cached resource, rather than showing a half-loaded JPEG.
        image.src = requested;
        pending = undefined;
        onPhase('loaded');
      } else {
        cancelPending();
        if (attempt === 0) {
          attempt = 1;
          timer = setTimeout(request, options.retryDelayMs ?? 750);
        } else {
          onPhase('error');
        }
      }
    };
    candidate.onload = () => finish(true);
    candidate.onerror = () => finish(false);
    timer = setTimeout(() => finish(false), options.timeoutMs ?? 25000);
    candidate.src = requested;
    if (candidate.complete && candidate.naturalWidth > 0) finish(true);
  }

  function start() {
    if (started || !active) return;
    started = true;
    observer?.disconnect();
    request();
  }

  image.removeAttribute('src');
  onPhase('waiting');
  // The observed frame has a reserved aspect ratio. Native lazy loading in a
  // rebalancing CSS multi-column layout used to leave some cards blank.
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) start();
    }, { rootMargin: '600px 0px', threshold: 0 });
    observer.observe(image.parentElement ?? image);
  } else {
    start();
  }

  return () => {
    active = false;
    generation++;
    observer?.disconnect();
    clearTimer();
    cancelPending();
  };
}
