import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { CheckCircle2, Loader2, Mail, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/lib/i18n'

function SignupForm({ compact = false, onSubscribed }: { compact?: boolean; onSubscribed?: () => void }) {
  const { language } = useLanguage()
  const en = language === 'en'
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const subscribe = async (event: FormEvent) => {
    event.preventDefault()
    const normalized = email.trim().toLowerCase()
    if (name.trim().length < 2 || phone.replace(/\\D/g, '').length < 7) { setSuccess(false); setMessage(en ? 'Please enter your name and WhatsApp number.' : 'Add meg a neved és a WhatsApp telefonszámod.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setSuccess(false)
      setMessage(en ? 'Please enter a valid email address.' : 'Kérjük, adj meg egy érvényes e-mail-címet.')
      return
    }
    setLoading(true)
    setMessage('')
    const { data, error } = await supabase.rpc('subscribe_newsletter', { p_email: normalized, p_name: name.trim(), p_phone: phone.trim() })
    setLoading(false)
    if (error) {
      setSuccess(false)
      setMessage(en ? 'Subscription failed. Please try again.' : 'A feliratkozás most nem sikerült. Kérjük, próbáld meg újra.')
      return
    }
    setSuccess(true)
    try { await fetch('/api/send-newsletter-coupon',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:normalized,name:name.trim(),code:data?.code,expires_at:data?.expires_at})}) } catch {}
    setMessage((en ? 'Your 5% coupon: ' : 'Az 5%-os kuponod: ') + (data?.code || ''))
    setEmail(''); setName(''); setPhone('')
    if (data !== 'already_active') window.setTimeout(() => onSubscribed?.(), 1600)
  }

  return (
    <form onSubmit={subscribe} className={compact ? 'mt-5' : 'mx-auto mt-7 max-w-xl'}>
      <div className={compact ? 'grid gap-3' : 'flex flex-col gap-3 sm:flex-row'}>
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={en ? 'Your name' : 'Neved'} className="min-h-12 flex-1 rounded-full border border-slate-200 bg-slate-50 px-5 text-base text-slate-900 outline-none ring-orange-400 focus:ring-4" />
        <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={en ? 'WhatsApp number' : 'WhatsApp telefonszám'} className="min-h-12 flex-1 rounded-full border border-slate-200 bg-slate-50 px-5 text-base text-slate-900 outline-none ring-orange-400 focus:ring-4" />
        <label className="sr-only" htmlFor={compact ? 'popup-newsletter-email' : 'newsletter-email'}>{en ? 'Email address' : 'E-mail-cím'}</label>
        <input
          id={compact ? 'popup-newsletter-email' : 'newsletter-email'}
          type="email" autoComplete="email" required value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={en ? 'Your email address' : 'E-mail-címed'}
          className={`min-h-12 flex-1 rounded-full border px-5 text-base text-slate-900 outline-none ring-orange-400 placeholder:text-slate-400 focus:ring-4 ${compact ? 'border-slate-200 bg-slate-50' : 'border-white/30 bg-white'}`}
        />
        <button type="submit" disabled={loading} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange-500 px-7 font-bold text-white shadow-lg transition hover:bg-orange-600 disabled:opacity-60">
          {loading ? <Loader2 size={19} className="animate-spin" /> : <Mail size={19} />} {en ? 'Subscribe' : 'Feliratkozom'}
        </button>
      </div>
      {message && <p className={`mt-3 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm ${compact ? (success ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700') : (success ? 'bg-emerald-500/25 text-white' : 'bg-red-950/25 text-white')}`}>{success && <CheckCircle2 size={18} />}{message}</p>}
    </form>
  )
}

export default function NewsletterSection() {
  const { language } = useLanguage()
  const en = language === 'en'
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('hurghada-newsletter-popup-seen')) return
    const timer = window.setTimeout(() => setPopupOpen(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  const closePopup = () => {
    sessionStorage.setItem('hurghada-newsletter-popup-seen', '1')
    setPopupOpen(false)
  }

  return (
    <>
      {popupOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/55 p-3 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-labelledby="newsletter-popup-title">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <button onClick={closePopup} aria-label={en ? 'Close' : 'Bezárás'} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"><X size={21} /></button>
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-sky-100 text-sky-700"><Mail size={28} /></div>
            <h2 id="newsletter-popup-title" className="pr-8 text-center text-2xl font-bold text-slate-900">{en ? 'Get 5% off your next excursion!' : '🎁 5% KEDVEZMÉNY AZONNAL!'}</h2>
            <p className="mt-3 text-center leading-relaxed text-slate-600">{en ? 'Subscribe and get 5% off your next excursion instantly. We will also send new programs and special offers.' : 'Iratkozz fel, és azonnal kapsz 5% kedvezményt a következő programodból! Emellett értesítünk az újdonságokról és ajánlatokról.'}</p>
            <SignupForm compact onSubscribed={closePopup} />
            <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">{en ? 'You can unsubscribe at any time.' : 'Bármikor egy kattintással leiratkozhatsz.'}</p>
          </div>
        </div>
      )}

      <section className="bg-gradient-to-br from-sky-600 via-cyan-600 to-blue-700 py-16 text-white">
        <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur"><Mail size={28} /></div>
          <h2 className="text-3xl font-bold sm:text-4xl">{en ? 'Do not miss the best Hurghada experiences!' : 'Ne maradj le a hurghadai élményekről!'}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-sky-50 sm:text-lg">{en ? 'Subscribe for new excursions, special offers and useful Hurghada tips.' : 'Iratkozz fel, és elsőként értesítünk az új programokról, különleges ajánlatokról és hasznos hurghadai tippekről.'}</p>
          <SignupForm />
          <p className="mt-4 text-xs leading-relaxed text-sky-100">{en ? 'By subscribing, you agree to receive news and offers. You can unsubscribe at any time.' : 'A feliratkozással elfogadod, hogy híreket és ajánlatokat küldjünk. Bármikor egy kattintással leiratkozhatsz.'}</p>
        </div>
      </section>
    </>
  )
}
