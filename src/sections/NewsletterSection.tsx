import { FormEvent, useState } from 'react'
import { CheckCircle2, Loader2, Mail } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const subscribe = async (event: FormEvent) => {
    event.preventDefault()
    const normalized = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setSuccess(false)
      setMessage('Kérjük, adj meg egy érvényes e-mail-címet.')
      return
    }

    setLoading(true)
    setMessage('')
    const { data, error } = await supabase.rpc('subscribe_hurghada_newsletter', {
      p_email: normalized,
    })
    setLoading(false)

    if (error) {
      setSuccess(false)
      setMessage('A feliratkozás most nem sikerült. Kérjük, próbáld meg újra.')
      return
    }

    setSuccess(true)
    setMessage(data === 'already_active'
      ? 'Ezzel az e-mail-címmel már feliratkoztál.'
      : 'Sikeresen feliratkoztál! Értesítünk az új programokról és ajánlatokról.')
    setEmail('')
  }

  return (
    <section className="bg-gradient-to-br from-sky-600 via-cyan-600 to-blue-700 py-16 text-white">
      <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur">
          <Mail size={28} />
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl">Ne maradj le a hurghadai élményekről!</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-sky-50 sm:text-lg">
          Iratkozz fel, és elsőként értesítünk az új programokról, különleges ajánlatokról és hasznos hurghadai tippekről.
        </p>

        <form onSubmit={subscribe} className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">E-mail-cím</label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-mail-címed"
            className="min-h-12 flex-1 rounded-full border border-white/30 bg-white px-5 text-base text-slate-900 outline-none ring-orange-400 placeholder:text-slate-400 focus:ring-4"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange-500 px-7 font-bold text-white shadow-lg transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 size={19} className="animate-spin" /> : <Mail size={19} />}
            Feliratkozom
          </button>
        </form>

        {message && (
          <p className={`mx-auto mt-4 flex max-w-xl items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm ${success ? 'bg-emerald-500/25 text-white' : 'bg-red-950/25 text-white'}`}>
            {success && <CheckCircle2 size={18} />}
            {message}
          </p>
        )}
        <p className="mt-4 text-xs leading-relaxed text-sky-100">
          A feliratkozással elfogadod, hogy híreket és ajánlatokat küldjünk. Bármikor egy kattintással leiratkozhatsz.
        </p>
      </div>
    </section>
  )
}
