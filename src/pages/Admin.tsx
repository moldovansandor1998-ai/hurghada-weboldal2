import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Download, KeyRound, Loader2, LogIn, LogOut, Mail, RefreshCw, Search, Send, Upload, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Subscriber = {
  email: string
  status: 'active' | 'unsubscribed'
  source: string
  consent_at: string
  unsubscribed_at: string | null
  created_at: string
  last_campaign_at: string | null
}

const campaignEndpoint = '/api/send-newsletter'
const adminEmail = 'moldovansandor1998@gmail.com'

const extractEmails = (text: string) => [...new Set(
  (text.match(/[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+/gi) ?? [])
    .map((email) => email.trim().toLowerCase().replace(/[.)]+$/, ''))
    .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
)]

export default function Admin() {
  const [sessionReady, setSessionReady] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loginEmail, setLoginEmail] = useState(adminEmail)
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [subject, setSubject] = useState('Új hurghadai programok és ajánlatok')
  const [message, setMessage] = useState('Szia!\n\nÚj élményekkel és hasznos információkkal frissült a Hurghada Programok oldala. Nézd meg az aktuális kirándulásokat, válaszd ki a kedvencedet, és érdeklődj egyszerűen WhatsAppon!\n\nSzeretettel várunk Hurghadában! ☀️')
  const [testEmail, setTestEmail] = useState('')
  const [sending, setSending] = useState<'test' | 'broadcast' | 'selected' | null>(null)
  const [sendProgress, setSendProgress] = useState({ sent: 0, total: 0 })
  const [notice, setNotice] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [importing, setImporting] = useState(false)
  const [importConsent, setImportConsent] = useState(false)
  const [importPreview, setImportPreview] = useState<string[]>([])
  const [importText, setImportText] = useState('')
  const [importFileName, setImportFileName] = useState('')

  const checkAdmin = useCallback(async () => {
    // A böngészőben korábbról megmaradhatott egy másik projekt munkamenete.
    // A getUser hálózaton, a Hurghada saját Auth szerverén ellenőrzi a tokent.
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setIsAdmin(false)
      setSessionReady(true)
      return
    }

    const { data: userData, error: userError } = await supabase.auth.getUser()
    const validAdmin = !userError && userData.user?.app_metadata?.is_admin === true
    if (!validAdmin) {
      await supabase.auth.signOut({ scope: 'local' })
      setIsAdmin(false)
      setNotice('A korábbi, másik oldalhoz tartozó munkamenetet töröltük. Jelentkezz be a Hurghada adminfiókkal.')
    } else {
      setIsAdmin(true)
    }
    setSessionReady(true)
  }, [])

  useEffect(() => {
    void checkAdmin()
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) setIsAdmin(false)
      else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setIsAdmin(session.user.app_metadata?.is_admin === true)
      }
      setSessionReady(true)
    })
    return () => data.subscription.unsubscribe()
  }, [checkAdmin])

  const load = useCallback(async () => {
    if (!isAdmin) return
    setLoading(true)
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('email,status,source,consent_at,unsubscribed_at,created_at,last_campaign_at')
      .order('created_at', { ascending: false })
      .limit(10000)
    setLoading(false)
    if (error) {
      setNotice('A feliratkozók betöltése nem sikerült.')
      return
    }
    setSubscribers((data ?? []) as Subscriber[])
  }, [isAdmin])

  useEffect(() => { void load() }, [load])

  const login = async (event: FormEvent) => {
    event.preventDefault()
    setLoginError('')
    if (loginEmail.trim().toLowerCase() !== adminEmail) {
      setLoginError('Ezen az oldalon csak a megadott adminfiókkal lehet belépni.')
      return
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: loginPassword,
    })
    if (error) setLoginError('Hibás e-mail-cím vagy jelszó.')
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return term ? subscribers.filter((item) => item.email.includes(term)) : subscribers
  }, [search, subscribers])

  const activeCount = subscribers.filter((item) => item.status === 'active').length
  const unsubscribedCount = subscribers.length - activeCount
  const visibleActive = filtered.filter((item) => item.status === 'active')

  const toggleAll = () => {
    const visibleEmails = visibleActive.map((item) => item.email)
    const allSelected = visibleEmails.length > 0 && visibleEmails.every((email) => selected.has(email))
    setSelected((current) => {
      const next = new Set(current)
      visibleEmails.forEach((email) => allSelected ? next.delete(email) : next.add(email))
      return next
    })
  }

  const changeStatus = async (email: string, status: Subscriber['status']) => {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({
        status,
        unsubscribed_at: status === 'unsubscribed' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('email', email)
    if (error) setNotice('A módosítás nem sikerült.')
    else void load()
  }

  const sendCampaign = async (mode: 'test' | 'broadcast' | 'selected') => {
    setNotice('')
    if (!subject.trim() || !message.trim()) {
      setNotice('A tárgy és az üzenet kitöltése kötelező.')
      return
    }
    if (mode === 'test' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail.trim())) {
      setNotice('Adj meg egy érvényes tesztcímet.')
      return
    }
    if (mode === 'selected' && selected.size === 0) {
      setNotice('Előbb jelölj ki legalább egy aktív feliratkozót.')
      return
    }
    if (mode === 'broadcast' && !window.confirm(`Biztosan elküldöd ${activeCount} aktív feliratkozónak?`)) return
    if (mode === 'selected' && !window.confirm(`Biztosan elküldöd ${selected.size} kijelölt feliratkozónak?`)) return

    const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession()
    let session = refreshed.session ?? (await supabase.auth.getSession()).data.session
    if (refreshError || !session?.access_token) {
      await supabase.auth.signOut({ scope: 'local' })
      setIsAdmin(false)
      setNotice('Az admin munkamenet lejárt. Jelentkezz be újra a Hurghada adminfiókkal.')
      return
    }

    setSending(mode)
    const selectedEmails = mode === 'selected' ? [...selected] : []
    const batches = mode === 'selected'
      ? Array.from({ length: Math.ceil(selectedEmails.length / 100) }, (_, index) => selectedEmails.slice(index * 100, index * 100 + 100))
      : [[]]
    setSendProgress({ sent: 0, total: mode === 'selected' ? selectedEmails.length : mode === 'broadcast' ? activeCount : 1 })

    let totalSent = 0
    try {
      for (const emails of batches) {
        const controller = new AbortController()
        const timeout = window.setTimeout(() => controller.abort(), 55_000)
        const requestBody = JSON.stringify({
          mode,
          subject: subject.trim(),
          message: message.trim(),
          email: testEmail.trim().toLowerCase(),
          emails,
        })
        const sendRequest = (accessToken: string) => fetch(campaignEndpoint, {
          method: 'POST',
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: requestBody,
        })

        try {
          let response = await sendRequest(session.access_token)
          if (response.status === 401) {
            const renewed = await supabase.auth.refreshSession()
            if (renewed.error || !renewed.data.session?.access_token) {
              await supabase.auth.signOut()
              setIsAdmin(false)
              setNotice('A korábbi belépés lejárt. Jelentkezz be újra az adminfiókkal.')
              return
            }
            session = renewed.data.session
            response = await sendRequest(session.access_token)
          }

          const result = await response.json().catch(() => ({}))
          if (!response.ok) {
            setNotice(`${totalSent} e-mail sikeresen elment, majd a küldés megállt: ${result.error || 'ismeretlen hiba'}`)
            return
          }
          totalSent += Number(result.sent || 0)
          setSendProgress({ sent: totalSent, total: mode === 'selected' ? selectedEmails.length : totalSent })
          setNotice(`Küldés folyamatban: ${totalSent} / ${mode === 'selected' ? selectedEmails.length : totalSent} e-mail.`)
        } finally {
          window.clearTimeout(timeout)
        }
      }

      setNotice(`Sikeres küldés: ${totalSent} e-mail.`)
      void load()
    } catch (error) {
      setNotice(error instanceof DOMException && error.name === 'AbortError'
        ? `A küldés ${totalSent} cím után időtúllépés miatt megállt. Innen újraindítható.`
        : `A küldés ${totalSent} cím után kapcsolódási hiba miatt megállt.`)
    } finally {
      setSending(null)
    }
  }

  const changePassword = async (event: FormEvent) => {
    event.preventDefault()
    setNotice('')
    if (newPassword.length < 10) {
      setNotice('Az új jelszó legalább 10 karakter legyen.')
      return
    }
    if (newPassword !== newPasswordAgain) {
      setNotice('A két új jelszó nem egyezik.')
      return
    }
    setPasswordSaving(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPasswordSaving(false)
    if (error) {
      setNotice('A jelszó módosítása nem sikerült.')
      return
    }
    setNewPassword('')
    setNewPasswordAgain('')
    setNotice('A jelszó sikeresen megváltozott.')
  }

  const updateImportText = (value: string) => {
    setImportText(value)
    const emails = extractEmails(value)
    setImportPreview(emails.slice(0, 10000))
    setImportConsent(false)
    if (emails.length > 10000) {
      setNotice(`A lista ${emails.length} egyedi címet tartalmaz. Egyszerre legfeljebb 10 000 küldhető.`)
    } else if (value.trim()) {
      setNotice(`${emails.length} érvényes, egyedi e-mail-cím van a listában.`)
    } else {
      setNotice('')
    }
  }

  const chooseImportFile = async (file: File | undefined) => {
    setNotice('')
    setImportPreview([])
    setImportText('')
    setImportFileName('')
    if (!file) return
    setImportFileName(file.name)
    if (!/\.(csv|txt)$/i.test(file.name)) {
      setNotice('Csak CSV vagy TXT fájl tölthető fel.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setNotice('A fájl legfeljebb 10 MB lehet.')
      return
    }
    let fileText = ''
    try {
      fileText = await file.text()
    } catch {
      setNotice('A fájlt a böngésző nem tudta beolvasni. Töltsd le a telefonra, majd válaszd ki újra.')
      return
    }
    const emails = extractEmails(fileText)
    if (!emails.length) {
      setNotice('A fájlban nem található érvényes e-mail-cím.')
      return
    }
    if (emails.length > 10000) {
      setNotice(`A fájl ${emails.length} egyedi címet tartalmaz. Egyszerre legfeljebb 10 000 tölthető fel.`)
      return
    }
    setImportText(emails.join('\n'))
    setImportPreview(emails)
    setNotice(`${emails.length} egyedi, érvényes e-mail-címet találtam. A listát lent szerkesztheted.`)
  }

  const importEmails = async () => {
    if (!importPreview.length || !importConsent) {
      setNotice('A küldés előtt erősítsd meg, hogy a címzettek hozzájárultak.')
      return
    }
    setImporting(true)
    setSelected(new Set(importPreview))
    setNotice(`${importPreview.length} címzett készen áll a küldésre. Ezek még nem feliratkozók; csak akkor kerülnek a feliratkozók közé, ha az e-mailben a feliratkozási linkre kattintanak.`)
    setImporting(false)
  }

  const exportCsv = () => {
    const rows = ['email,status,feliratkozas,utolso_kampany', ...subscribers.map((item) =>
      [item.email, item.status, item.consent_at, item.last_campaign_at ?? ''].join(','),
    )]
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'hurghada-feliratkozok.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!sessionReady) return <div className="grid min-h-[60vh] place-items-center"><Loader2 className="animate-spin text-sky-600" /></div>

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-md px-4 py-20">
        <form onSubmit={login} className="rounded-3xl border bg-white p-7 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-sky-700"><LogIn /></div>
            <h1 className="text-2xl font-bold text-slate-900">Hurghada admin</h1>
            <p className="mt-2 text-sm text-slate-500">Jelentkezz be a Hurghada Programok adminfiókoddal.</p>
          </div>
          <input type="email" required readOnly value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="E-mail-cím" className="mb-3 min-h-12 w-full rounded-xl border bg-slate-50 px-4 text-slate-600" />
          <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Jelszó" className="mb-3 min-h-12 w-full rounded-xl border px-4" />
          {loginError && <p className="mb-3 text-sm text-red-600">{loginError}</p>}
          <button className="min-h-12 w-full rounded-xl bg-sky-600 font-bold text-white hover:bg-sky-700">Belépés</button>
        </form>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-bold text-slate-900">Hírlevél admin</h1><p className="text-slate-500">Feliratkozók és e-mail-kampányok kezelése</p></div>
        <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm"><LogOut size={17} /> Kilépés</button>
      </div>

      <div className="mb-7 grid gap-4 sm:grid-cols-3">
        <Stat icon={<Users />} label="Összes feliratkozó" value={subscribers.length} />
        <Stat icon={<Mail />} label="Aktív feliratkozó" value={activeCount} accent />
        <Stat icon={<LogOut />} label="Leiratkozott" value={unsubscribedCount} />
      </div>

      <section className="mb-8 rounded-3xl border bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-center gap-2"><KeyRound className="text-sky-600" /><h2 className="text-xl font-bold text-slate-900">Admin jelszó módosítása</h2></div>
        <form onSubmit={changePassword} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input type="password" autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Új jelszó (legalább 10 karakter)" className="min-h-11 rounded-xl border px-4" />
          <input type="password" autoComplete="new-password" value={newPasswordAgain} onChange={(e) => setNewPasswordAgain(e.target.value)} placeholder="Új jelszó még egyszer" className="min-h-11 rounded-xl border px-4" />
          <button disabled={passwordSaving} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-800 px-5 font-semibold text-white disabled:opacity-50">
            {passwordSaving ? <Loader2 className="animate-spin" size={18} /> : <KeyRound size={18} />} Mentés
          </button>
        </form>
      </section>

      <section className="mb-8 rounded-3xl border bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-xl font-bold text-slate-900">E-mail-kampány készítő</h2>
        <div className="mt-5 grid gap-4">
          <label className="text-sm font-semibold">Tárgy
            <input value={subject} maxLength={120} onChange={(e) => setSubject(e.target.value)} className="mt-1 min-h-12 w-full rounded-xl border px-4 font-normal" />
          </label>
          <label className="text-sm font-semibold">Üzenet
            <textarea value={message} maxLength={6000} onChange={(e) => setMessage(e.target.value)} rows={8} className="mt-1 w-full rounded-xl border p-4 font-normal leading-relaxed" />
          </label>
          <div className="rounded-2xl border border-dashed border-sky-300 bg-sky-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-4 font-semibold text-sky-700 shadow-sm ring-1 ring-sky-200">
                <Upload size={18} /> CSV vagy TXT kiválasztása
                <input type="file" accept=".csv,.txt,text/csv,text/plain" className="hidden" onChange={(e) => void chooseImportFile(e.target.files?.[0])} />
              </label>
              <span className="text-sm text-slate-600">{importFileName ? `Kiválasztva: ${importFileName}` : 'Maximum 10 000 egyedi e-mail-cím fájlonként.'}</span>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-800">
                Címzettek szerkesztése
                <span className="ml-2 font-normal text-sky-700">{importPreview.length} / 10 000 érvényes, egyedi cím</span>
                <textarea
                  value={importText}
                  onChange={(event) => updateImportText(event.target.value)}
                  rows={10}
                  spellCheck={false}
                  placeholder={'pelda@gmail.com\npelda2@gmail.com'}
                  className="mt-2 w-full rounded-xl border bg-white p-4 font-mono text-sm font-normal leading-6 text-slate-800"
                />
              </label>
              <p className="mt-2 text-xs text-slate-500">Egy sorba egy e-mail-cím kerüljön. Innen törölhetsz, illetve kézzel új címet is hozzáadhatsz.</p>
            </div>
            {importPreview.length > 0 && (
              <div className="mt-4">
                <label className="flex items-start gap-2 text-sm text-slate-700">
                  <input type="checkbox" checked={importConsent} onChange={(e) => setImportConsent(e.target.checked)} className="mt-1" />
                  Megerősítem, hogy a feltöltött {importPreview.length} cím tulajdonosai hozzájárultak promóciós e-mailek fogadásához.
                </label>
                <button type="button" disabled={!importConsent || importing} onClick={importEmails} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl bg-emerald-600 px-5 font-semibold text-white disabled:opacity-50">
                  {importing ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />} {importPreview.length} címzett előkészítése
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 lg:flex-row">
            <input type="email" value={testEmail} onChange={(e) => setTestEmail(e.target.value)} placeholder="Teszt e-mail-cím" className="min-h-11 flex-1 rounded-xl border px-4" />
            <button disabled={sending !== null} onClick={() => sendCampaign('test')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-5 font-semibold">
              {sending === 'test' ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Próba küldése
            </button>
            <button disabled={sending !== null || selected.size === 0} onClick={() => sendCampaign('selected')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 font-semibold text-white disabled:opacity-50">
              {sending === 'selected' ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} {sending === 'selected' ? `Küldés ${sendProgress.sent} / ${sendProgress.total}` : `Kijelölteknek (${selected.size})`}
            </button>
            <button disabled={sending !== null || activeCount === 0} onClick={() => sendCampaign('broadcast')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 font-semibold text-white disabled:opacity-50">
              {sending === 'broadcast' ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Minden aktívnak ({activeCount})
            </button>
          </div>
          {notice && <p className="rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-800">{notice}</p>}
        </div>
      </section>

      <section className="rounded-3xl border bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900">Feliratkozók</h2>
          <div className="flex gap-2">
            <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"><Download size={16} /> CSV</button>
            <button onClick={load} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"><RefreshCw size={16} /> Frissítés</button>
          </div>
        </div>
        <label className="relative mb-4 block">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Keresés e-mail-cím alapján" className="min-h-11 w-full rounded-xl border pl-10 pr-4" />
        </label>
        <div className="overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50"><tr>
              <th className="p-3"><input type="checkbox" onChange={toggleAll} checked={visibleActive.length > 0 && visibleActive.every((item) => selected.has(item.email))} /></th>
              <th className="p-3">E-mail-cím</th><th className="p-3">Állapot</th><th className="p-3">Feliratkozás</th><th className="p-3">Utolsó kampány</th><th className="p-3">Művelet</th>
            </tr></thead>
            <tbody>
              {filtered.map((item) => <tr key={item.email} className="border-t">
                <td className="p-3"><input type="checkbox" disabled={item.status !== 'active'} checked={selected.has(item.email)} onChange={() => setSelected((current) => { const next = new Set(current); next.has(item.email) ? next.delete(item.email) : next.add(item.email); return next })} /></td>
                <td className="p-3 font-medium">{item.email}</td>
                <td className="p-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{item.status === 'active' ? 'Aktív' : 'Leiratkozott'}</span></td>
                <td className="p-3 text-slate-500">{new Date(item.consent_at).toLocaleString('hu-HU')}</td>
                <td className="p-3 text-slate-500">{item.last_campaign_at ? new Date(item.last_campaign_at).toLocaleString('hu-HU') : '–'}</td>
                <td className="p-3"><button onClick={() => changeStatus(item.email, item.status === 'active' ? 'unsubscribed' : 'active')} className="rounded-lg border px-3 py-1.5">{item.status === 'active' ? 'Leiratás' : 'Újraaktiválás'}</button></td>
              </tr>)}
              {!loading && filtered.length === 0 && <tr><td colSpan={6} className="p-10 text-center text-slate-500">Nincs megjeleníthető feliratkozó.</td></tr>}
              {loading && <tr><td colSpan={6} className="p-10 text-center"><Loader2 className="mx-auto animate-spin text-sky-600" /></td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

function Stat({ icon, label, value, accent = false }: { icon: React.ReactNode; label: string; value: number; accent?: boolean }) {
  return <div className={`rounded-2xl border p-5 shadow-sm ${accent ? 'border-sky-200 bg-sky-50' : 'bg-white'}`}><div className="flex items-center gap-3 text-slate-500">{icon}<span>{label}</span></div><div className="mt-2 text-3xl font-bold text-slate-900">{value}</div></div>
}
