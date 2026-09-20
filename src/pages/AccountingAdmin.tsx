import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Banknote, CalendarDays, Edit3, Loader2, Plus, RefreshCw, Search, Trash2, TrendingUp, Users, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Booking = {
  id: string
  booking_code: string | null
  excursion_date: string
  program_name: string
  hotel_name: string | null
  room_number: string | null
  guest_names: string | null
  phone: string | null
  adults: number
  children: number
  infants: number
  payment_method: 'card' | 'cash_collect' | 'bank_transfer' | 'other'
  revenue_eur: number
  supplier_cost_eur: number
  supplier_cost_usd: number
  supplier_cost_egp: number
  collected_eur: number
  collected_usd: number
  profit_eur: number
  revenue_basis: string | null
  status: 'planned' | 'completed' | 'cancelled'
  notes: string | null
  revenue_known: boolean
}

type Settlement = {
  id: string
  period_start: string
  period_end: string
  opening_balance_eur: number
  supplier_total_usd: number
  supplier_total_egp: number
  collected_eur: number
  collected_usd: number
  supplier_net_eur: number
  period_change_eur: number
  closing_balance_eur: number
  notes: string | null
}

const emptyForm = {
  excursion_date: new Date().toISOString().slice(0, 10), program_name: '', hotel_name: '', room_number: '',
  guest_names: '', phone: '', adults: '1', children: '0', infants: '0', payment_method: 'card',
  revenue_eur: '', supplier_cost_eur: '', supplier_cost_usd: '0', supplier_cost_egp: '0', collected_eur: '0',
  collected_usd: '0', revenue_basis: '', status: 'completed', notes: '', revenue_known: true,
}

const money = (value: number) => new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(value)
const number = (value: number) => new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 2 }).format(value)
const people = (booking: Booking) => booking.adults + booking.children + booking.infants

export default function AccountingAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [settlements, setSettlements] = useState<Settlement[]>([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState('')
  const [search, setSearch] = useState('')
  const [month, setMonth] = useState('2026-09')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const load = useCallback(async () => {
    setLoading(true)
    const [bookingResult, settlementResult] = await Promise.all([
      supabase.from('excursion_bookings').select('*').order('excursion_date', { ascending: false }).limit(2000),
      supabase.from('excursion_settlements').select('*').order('period_end', { ascending: false }).limit(100),
    ])
    setLoading(false)
    if (bookingResult.error || settlementResult.error) {
      setNotice('Az elszámolási adatok betöltése nem sikerült.')
      return
    }
    setBookings((bookingResult.data ?? []).map((row) => ({ ...row, revenue_eur: Number(row.revenue_eur), supplier_cost_eur: Number(row.supplier_cost_eur), supplier_cost_usd: Number(row.supplier_cost_usd), supplier_cost_egp: Number(row.supplier_cost_egp), collected_eur: Number(row.collected_eur), collected_usd: Number(row.collected_usd), profit_eur: Number(row.profit_eur) })) as Booking[])
    setSettlements((settlementResult.data ?? []).map((row) => ({ ...row, opening_balance_eur: Number(row.opening_balance_eur), supplier_total_usd: Number(row.supplier_total_usd), supplier_total_egp: Number(row.supplier_total_egp), collected_eur: Number(row.collected_eur), collected_usd: Number(row.collected_usd), supplier_net_eur: Number(row.supplier_net_eur), period_change_eur: Number(row.period_change_eur), closing_balance_eur: Number(row.closing_balance_eur) })) as Settlement[])
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(timer)
  }, [load])

  const months = useMemo(() => [...new Set(bookings.map((b) => b.excursion_date.slice(0, 7)))].sort().reverse(), [bookings])
  const monthRows = useMemo(() => bookings.filter((b) => b.excursion_date.startsWith(month) && b.status !== 'cancelled'), [bookings, month])
  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('hu-HU')
    if (!term) return monthRows
    return monthRows.filter((b) => [b.program_name, b.hotel_name, b.room_number, b.guest_names, b.phone, b.booking_code].some((value) => value?.toLocaleLowerCase('hu-HU').includes(term)))
  }, [monthRows, search])

  const totals = useMemo(() => monthRows.reduce((sum, b) => ({
    revenue: sum.revenue + (b.revenue_known ? b.revenue_eur : 0), cost: sum.cost + b.supplier_cost_eur,
    profit: sum.profit + (b.revenue_known ? b.profit_eur : 0), people: sum.people + people(b),
  }), { revenue: 0, cost: 0, profit: 0, people: 0 }), [monthRows])

  const ranking = useMemo(() => {
    const grouped = new Map<string, { program: string; bookings: number; people: number; revenue: number; profit: number }>()
    monthRows.forEach((b) => {
      const current = grouped.get(b.program_name) ?? { program: b.program_name, bookings: 0, people: 0, revenue: 0, profit: 0 }
      current.bookings += 1; current.people += people(b); current.revenue += b.revenue_known ? b.revenue_eur : 0; current.profit += b.revenue_known ? b.profit_eur : 0
      grouped.set(b.program_name, current)
    })
    return [...grouped.values()].sort((a, b) => b.profit - a.profit)
  }, [monthRows])

  const openNew = () => { setEditingId(null); setForm({ ...emptyForm, excursion_date: new Date().toISOString().slice(0, 10) }); setShowForm(true) }
  const openEdit = (b: Booking) => {
    setEditingId(b.id)
    setForm({ excursion_date: b.excursion_date, program_name: b.program_name, hotel_name: b.hotel_name ?? '', room_number: b.room_number ?? '', guest_names: b.guest_names ?? '', phone: b.phone ?? '', adults: String(b.adults), children: String(b.children), infants: String(b.infants), payment_method: b.payment_method, revenue_eur: String(b.revenue_eur), supplier_cost_eur: String(b.supplier_cost_eur), supplier_cost_usd: String(b.supplier_cost_usd), supplier_cost_egp: String(b.supplier_cost_egp), collected_eur: String(b.collected_eur), collected_usd: String(b.collected_usd), revenue_basis: b.revenue_basis ?? '', status: b.status, notes: b.notes ?? '', revenue_known: b.revenue_known })
    setShowForm(true)
  }

  const save = async (event: FormEvent) => {
    event.preventDefault(); setSaving(true); setNotice('')
    const payload = { ...form, adults: Number(form.adults), children: Number(form.children), infants: Number(form.infants), revenue_eur: Number(form.revenue_eur || 0), supplier_cost_eur: Number(form.supplier_cost_eur || 0), supplier_cost_usd: Number(form.supplier_cost_usd || 0), supplier_cost_egp: Number(form.supplier_cost_egp || 0), collected_eur: Number(form.collected_eur || 0), collected_usd: Number(form.collected_usd || 0), hotel_name: form.hotel_name || null, room_number: form.room_number || null, guest_names: form.guest_names || null, phone: form.phone || null, revenue_basis: form.revenue_basis || null, notes: form.notes || null, updated_at: new Date().toISOString() }
    const result = editingId ? await supabase.from('excursion_bookings').update(payload).eq('id', editingId) : await supabase.from('excursion_bookings').insert(payload)
    setSaving(false)
    if (result.error) { setNotice('A foglalás mentése nem sikerült.'); return }
    setShowForm(false); setNotice(editingId ? 'A foglalás frissítve.' : 'Az új foglalás rögzítve.'); void load()
  }

  const remove = async (b: Booking) => {
    if (!window.confirm(`Biztosan törlöd ezt a foglalást: ${b.program_name}, ${b.excursion_date}?`)) return
    const { error } = await supabase.from('excursion_bookings').delete().eq('id', b.id)
    if (error) setNotice('A törlés nem sikerült.'); else { setNotice('A foglalás törölve.'); void load() }
  }

  const latestSettlement = settlements[0]
  const maxProfit = Math.max(...ranking.map((item) => item.profit), 1)

  return <div>
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div><h2 className="text-2xl font-bold text-slate-900">Elszámolás</h2><p className="mt-1 text-sm text-slate-500">Foglalások, havi eredmények és partneri egyenleg</p></div>
      <div className="flex gap-2"><button onClick={() => void load()} className="inline-flex min-h-11 items-center gap-2 rounded-xl border bg-white px-4 text-sm font-semibold"><RefreshCw size={17} /> Frissítés</button><button onClick={openNew} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white"><Plus size={18} /> Új foglalás</button></div>
    </div>

    <div className="mb-5 flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row">
      <label className="flex-1 text-sm font-semibold text-slate-700">Hónap<select value={month} onChange={(e) => setMonth(e.target.value)} className="mt-1 min-h-11 w-full rounded-xl border px-3 font-normal">{months.map((item) => <option key={item} value={item}>{new Date(`${item}-01T12:00:00`).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long' })}</option>)}</select></label>
      <label className="relative flex-[2] text-sm font-semibold text-slate-700">Keresés<Search size={17} className="absolute bottom-3 left-3 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Név, telefon, hotel, szoba vagy program" className="mt-1 min-h-11 w-full rounded-xl border pl-10 pr-3 font-normal" /></label>
    </div>

    <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <Kpi icon={<Banknote />} label="Havi bevétel" value={money(totals.revenue)} tone="sky" />
      <Kpi icon={<Banknote />} label="Partnerköltség" value={money(totals.cost)} tone="slate" />
      <Kpi icon={<TrendingUp />} label="Havi profit" value={money(totals.profit)} tone="emerald" />
      <Kpi icon={<CalendarDays />} label="Programok" value={String(monthRows.length)} tone="amber" />
      <Kpi icon={<Users />} label="Résztvevők" value={String(totals.people)} tone="violet" />
    </div>

    {latestSettlement && <section className="mb-6 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-sm">
      <div className="grid gap-5 p-5 lg:grid-cols-[1.1fr_2fr] lg:p-7">
        <div><p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Partnernél maradt egyenleg</p><div className="mt-2 text-4xl font-black text-slate-900">{money(latestSettlement.closing_balance_eur)}</div><p className="mt-2 text-sm text-slate-500">{latestSettlement.period_end} napján</p></div>
        <div className="grid gap-3 sm:grid-cols-4"><Mini label="Nyitó egyenleg" value={money(latestSettlement.opening_balance_eur)} /><Mini label="EUR Collect" value={`+ ${money(latestSettlement.collected_eur)}`} /><Mini label="Nettó partnerköltség" value={`− ${money(latestSettlement.supplier_net_eur)}`} /><Mini label="Időszaki változás" value={`${latestSettlement.period_change_eur >= 0 ? '+' : ''}${money(latestSettlement.period_change_eur)}`} /></div>
      </div>
      <div className="border-t border-amber-200 bg-white/70 px-5 py-4 text-sm text-slate-700 lg:px-7"><strong>{latestSettlement.period_start}–{latestSettlement.period_end}:</strong> {number(latestSettlement.supplier_total_usd)} USD − {number(latestSettlement.collected_usd)} USD Collect = 1 296 €, ehhez hozzáadódik {number(latestSettlement.supplier_total_egp)} EGP = 107 € költség. Így a nettó partnerköltség 1 403 €, az időszaki növekmény pedig 112 €.</div>
    </section>}

    <div className="mb-6 grid gap-6 xl:grid-cols-[1fr_1.45fr]">
      <section className="rounded-3xl border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">Programok profit szerint</h3><p className="mb-5 mt-1 text-sm text-slate-500">A kiválasztott hónap eredménye</p>
        <div className="space-y-4">{ranking.slice(0, 10).map((item, index) => <div key={item.program}><div className="mb-1.5 flex items-start justify-between gap-3 text-sm"><span className="font-semibold text-slate-800">{index + 1}. {item.program}</span><span className="whitespace-nowrap font-bold text-emerald-700">{money(item.profit)}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500" style={{ width: `${Math.max(4, item.profit / maxProfit * 100)}%` }} /></div><p className="mt-1 text-xs text-slate-500">{item.bookings} foglalás · {item.people} fő · {money(item.revenue)} bevétel</p></div>)}</div>
      </section>
      <section className="rounded-3xl border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">Elszámolási időszakok</h3><p className="mb-4 mt-1 text-sm text-slate-500">Nyitó és záró partneri egyenlegek</p>
        <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="text-xs uppercase text-slate-500"><tr><th className="pb-3">Időszak</th><th className="pb-3">Nyitó</th><th className="pb-3">Collect</th><th className="pb-3">Költség</th><th className="pb-3 text-right">Záró</th></tr></thead><tbody>{settlements.map((s) => <tr key={s.id} className="border-t"><td className="py-3 font-medium">{s.period_start}<br />{s.period_end}</td><td>{money(s.opening_balance_eur)}</td><td className="text-emerald-700">{money(s.collected_eur)}</td><td className="text-rose-700">{money(s.supplier_net_eur)}</td><td className="text-right font-bold">{money(s.closing_balance_eur)}</td></tr>)}</tbody></table></div>
      </section>
    </div>

    <section className="rounded-3xl border bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between"><div><h3 className="text-lg font-bold text-slate-900">Foglalások</h3><p className="text-sm text-slate-500">{filtered.length} tétel látható</p></div></div>
      <div className="overflow-x-auto rounded-2xl border"><table className="w-full min-w-[1180px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-3">Dátum / program</th><th className="p-3">Résztvevők</th><th className="p-3">Elérhetőség</th><th className="p-3">Hotel / szoba</th><th className="p-3 text-right">Bevétel</th><th className="p-3 text-right">Költség</th><th className="p-3 text-right">Profit</th><th className="p-3">Művelet</th></tr></thead><tbody>
        {filtered.map((b) => <tr key={b.id} className="border-t align-top hover:bg-slate-50/70"><td className="p-3"><div className="font-semibold text-slate-900">{b.program_name}</div><div className="mt-1 text-slate-500">{b.excursion_date}{b.booking_code ? ` · kód: ${b.booking_code}` : ''}</div></td><td className="p-3"><div className="max-w-[220px] whitespace-pre-line">{b.guest_names || 'Név nincs megadva'}</div><div className="mt-1 text-xs font-semibold text-sky-700">{people(b)} fő{b.children ? ` · ${b.children} gyermek` : ''}</div></td><td className="p-3">{b.phone ? <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="font-medium text-sky-700 hover:underline">{b.phone}</a> : '–'}</td><td className="p-3"><div>{b.hotel_name || '–'}</div><div className="mt-1 text-slate-500">Szoba: {b.room_number || '–'}</div></td><td className="p-3 text-right font-medium">{b.revenue_known ? money(b.revenue_eur) : <span className="text-amber-700">Hiányzik</span>}</td><td className="p-3 text-right">{money(b.supplier_cost_eur)}</td><td className={`p-3 text-right font-bold ${b.profit_eur >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{b.revenue_known ? money(b.profit_eur) : '–'}</td><td className="p-3"><div className="flex gap-1"><button onClick={() => openEdit(b)} aria-label="Szerkesztés" className="rounded-lg border p-2 hover:bg-white"><Edit3 size={16} /></button><button onClick={() => void remove(b)} aria-label="Törlés" className="rounded-lg border p-2 text-rose-600 hover:bg-rose-50"><Trash2 size={16} /></button></div></td></tr>)}
        {!loading && filtered.length === 0 && <tr><td colSpan={8} className="p-10 text-center text-slate-500">Nincs találat ebben a hónapban.</td></tr>}{loading && <tr><td colSpan={8} className="p-10 text-center"><Loader2 className="mx-auto animate-spin text-sky-600" /></td></tr>}
      </tbody></table></div>
    </section>

    {notice && <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-xl">{notice}</div>}
    {showForm && <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/55 p-3 sm:p-6"><form onSubmit={save} className="mx-auto my-3 max-w-4xl rounded-3xl bg-white p-5 shadow-2xl sm:p-7"><div className="mb-5 flex items-center justify-between"><div><h3 className="text-xl font-bold">{editingId ? 'Foglalás szerkesztése' : 'Új foglalás'}</h3><p className="text-sm text-slate-500">A profit automatikusan a bevétel és a partnerköltség különbsége.</p></div><button type="button" onClick={() => setShowForm(false)} className="rounded-xl border p-2"><X /></button></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Field label="Program"><input required value={form.program_name} onChange={(e) => setForm({ ...form, program_name: e.target.value })} className="control" /></Field><Field label="Dátum"><input required type="date" value={form.excursion_date} onChange={(e) => setForm({ ...form, excursion_date: e.target.value })} className="control" /></Field><Field label="Fizetési mód"><select value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })} className="control"><option value="card">Bankkártya / előre fizetve</option><option value="cash_collect">Collect</option><option value="bank_transfer">Banki utalás</option><option value="other">Egyéb</option></select></Field>
      <Field label="Hotel"><input value={form.hotel_name} onChange={(e) => setForm({ ...form, hotel_name: e.target.value })} className="control" /></Field><Field label="Szobaszám"><input value={form.room_number} onChange={(e) => setForm({ ...form, room_number: e.target.value })} className="control" /></Field><Field label="Telefonszám"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="control" /></Field>
      <Field label="Felnőtt"><input min="0" type="number" value={form.adults} onChange={(e) => setForm({ ...form, adults: e.target.value })} className="control" /></Field><Field label="Gyermek"><input min="0" type="number" value={form.children} onChange={(e) => setForm({ ...form, children: e.target.value })} className="control" /></Field><Field label="Csecsemő"><input min="0" type="number" value={form.infants} onChange={(e) => setForm({ ...form, infants: e.target.value })} className="control" /></Field>
      <Field label="Bevétel (€)"><input step="0.01" min="0" type="number" value={form.revenue_eur} onChange={(e) => setForm({ ...form, revenue_eur: e.target.value })} className="control" /></Field><Field label="Partnerköltség (€)"><input required step="0.01" min="0" type="number" value={form.supplier_cost_eur} onChange={(e) => setForm({ ...form, supplier_cost_eur: e.target.value })} className="control" /></Field><Field label="Collect (€)"><input step="0.01" min="0" type="number" value={form.collected_eur} onChange={(e) => setForm({ ...form, collected_eur: e.target.value })} className="control" /></Field>
      <Field label="Eredeti költség (USD)"><input step="0.01" min="0" type="number" value={form.supplier_cost_usd} onChange={(e) => setForm({ ...form, supplier_cost_usd: e.target.value })} className="control" /></Field><Field label="Eredeti költség (EGP)"><input step="0.01" min="0" type="number" value={form.supplier_cost_egp} onChange={(e) => setForm({ ...form, supplier_cost_egp: e.target.value })} className="control" /></Field><Field label="Collect (USD)"><input step="0.01" min="0" type="number" value={form.collected_usd} onChange={(e) => setForm({ ...form, collected_usd: e.target.value })} className="control" /></Field>
      <Field label="Résztvevők neve" wide><textarea rows={5} value={form.guest_names} onChange={(e) => setForm({ ...form, guest_names: e.target.value })} className="control" placeholder="Egy név soronként" /></Field><Field label="Megjegyzés" wide><textarea rows={5} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="control" /></Field>
    </div><label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={form.revenue_known} onChange={(e) => setForm({ ...form, revenue_known: e.target.checked })} /> Az eladási ár ismert, számítson bele a bevételbe és profitba</label><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setShowForm(false)} className="min-h-11 rounded-xl border px-5 font-semibold">Mégse</button><button disabled={saving} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-600 px-6 font-semibold text-white disabled:opacity-50">{saving && <Loader2 size={17} className="animate-spin" />} Mentés</button></div></form></div>}
  </div>
}

function Kpi({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: 'sky' | 'slate' | 'emerald' | 'amber' | 'violet' }) {
  const colors = { sky: 'bg-sky-50 text-sky-700 border-sky-200', slate: 'bg-slate-50 text-slate-700', emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200', amber: 'bg-amber-50 text-amber-700 border-amber-200', violet: 'bg-violet-50 text-violet-700 border-violet-200' }
  return <div className={`rounded-2xl border p-4 shadow-sm ${colors[tone]}`}><div className="flex items-center gap-2 text-sm font-medium">{icon}<span>{label}</span></div><div className="mt-2 text-2xl font-black text-slate-900">{value}</div></div>
}
function Mini({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border bg-white p-3"><div className="text-xs text-slate-500">{label}</div><div className="mt-1 font-bold text-slate-900">{value}</div></div> }
function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) { return <label className={`text-sm font-semibold text-slate-700 ${wide ? 'sm:col-span-2 lg:col-span-3' : ''}`}>{label}{children}</label> }
