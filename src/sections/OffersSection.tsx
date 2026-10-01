import { AlertTriangle, CalendarDays, Check, Gift, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '@/data/programs'
import { useLanguage } from '@/lib/i18n'

const packages = [
  { nameHu: 'Hurghada Mini', nameEn: 'Hurghada Mini', programsHu: ['Orange Bay', 'Moto Safari', 'Dolphin Show'], programsEn: ['Orange Bay', 'Moto Safari', 'Dolphin Show'], images: ['/images/orange-bay-new.jpg', '/images/quad.jpg', '/images/dolphinarium.jpg'], oldPrice: 70, price: 59 },
  { nameHu: 'Tenger szerelmesei', nameEn: 'Sea Lovers', programsHu: ['Orange Bay', 'Dolphin House', 'Búvárkirándulás'], programsEn: ['Orange Bay', 'Dolphin House', 'Scuba Diving Trip'], images: ['/images/orange-bay-new.jpg', '/images/dolphins.jpg', '/images/diving.jpg'], oldPrice: 95, price: 79, featured: true },
  { nameHu: 'Kaland csomag', nameEn: 'Adventure Package', programsHu: ['Moto Safari', 'Super Safari', 'Parasailing'], programsEn: ['Moto Safari', 'Super Safari', 'Parasailing'], images: ['/images/quad.jpg', '/images/super-safari-new.jpg', '/images/parasailing.jpg'], oldPrice: 80, price: 69 },
  { nameHu: 'Hurghada Best Of', nameEn: 'Hurghada Best Of', programsHu: ['Orange Bay', 'Super Safari', 'Luxor – Királyok Völgye'], programsEn: ['Orange Bay', 'Super Safari', 'Luxor – Valley of the Kings'], images: ['/images/orange-bay-new.jpg', '/images/super-safari-new.jpg', '/images/luxor-kiralyok-volgye.jpg'], oldPrice: 140, price: 119, featured: true },
  { nameHu: 'Egyiptom felfedező', nameEn: 'Discover Egypt', programsHu: ['Orange Bay', 'Super Safari', 'Luxor – Királyok Völgye', 'Kairó – Régi Múzeum'], programsEn: ['Orange Bay', 'Super Safari', 'Luxor – Valley of the Kings', 'Cairo – Pyramids & Old Museum'], images: ['/images/orange-bay-new.jpg', '/images/super-safari-new.jpg', '/images/luxor-kiralyok-volgye.jpg', '/images/kairo-piramisok.jpg'], oldPrice: 205, price: 179 },
  { nameHu: 'Prémium élménycsomag', nameEn: 'Premium Experience', programsHu: ['VIP Orange Bay', 'VIP Hula Hula', 'Luxor – Királyok Völgye'], programsEn: ['VIP Orange Bay', 'VIP Hula Hula', 'Luxor – Valley of the Kings'], images: ['/images/vip-hajo-1.jpg', '/images/vip-hajo-2.jpg', '/images/luxor-kiralyok-volgye.jpg'], oldPrice: 180, price: 155 },
]

const SHOW_PREPAID_PACKAGES = false

export default function OffersSection() {
  const { language } = useLanguage()
  const en = language === 'en'
  const whatsapp = (name: string) => `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(en ? `Hello! I would like to book the ${name} prepaid package.` : `Szia! A(z) ${name} előrefizetős programcsomagot szeretném lefoglalni.`)}`

  return <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-sky-50 pb-16 pt-24">
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6">
      {SHOW_PREPAID_PACKAGES && <>
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800"><Sparkles size={17} />{en ? 'Limited prepaid prices' : 'Korlátozott ideig elérhető előrefizetős árak'}</div>
        <h1 className="text-3xl font-black text-slate-900 sm:text-5xl">{en ? 'Hurghada excursion packages' : 'Hurghadai programcsomagok'}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{en ? 'Pay in advance, save more and choose your excursion dates later after you arrive.' : 'Fizess előre, spórolj többet, a programnapokat pedig válaszd ki később, akár már a megérkezésed után.'}</p>
      </div>

      <div className="mb-9 grid gap-3 rounded-3xl border border-sky-200 bg-white p-5 shadow-sm sm:grid-cols-3 sm:p-6">
        <Info icon={<ShieldCheck />} text={en ? 'Full prepayment required' : 'Teljes előrefizetés szükséges'} />
        <Info icon={<CalendarDays />} text={en ? 'No exact dates needed at purchase' : 'Vásárláskor nem kell pontos időpont'} />
        <Info icon={<Gift />} text={en ? 'Valid for 12 months after payment' : 'A fizetéstől számítva 12 hónapig felhasználható'} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {packages.map((item) => {
          const name = en ? item.nameEn : item.nameHu
          const programs = en ? item.programsEn : item.programsHu
          return <article key={item.nameHu} className={`relative flex flex-col overflow-hidden rounded-3xl border-2 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl ${item.featured ? 'border-sky-400' : 'border-white'}`}>
            <PackageCover images={item.images} name={name} oldPrice={item.oldPrice} price={item.price} en={en} />
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-xl font-black text-slate-900">{name}</h2>
              <p className="mb-3 mt-4 text-xs font-bold uppercase tracking-wide text-slate-500">{en ? 'Included excursions' : 'A csomag tartalma'}</p>
              <ul className="mb-6 space-y-2.5">{programs.map(program => <li key={program} className="flex items-start gap-2 text-sm font-semibold text-slate-700"><Check size={18} className="mt-0.5 shrink-0 text-emerald-600" />{program}</li>)}</ul>
              <a href={whatsapp(name)} target="_blank" rel="noreferrer" className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25d366] px-5 font-black text-white shadow-md transition hover:bg-[#128c7e]"><MessageCircle size={19} />{en ? 'Book this package' : 'Csomag foglalása'}</a>
            </div>
          </article>
        })}
      </div>

      <div className="mt-9 rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
        <div className="flex items-start gap-3"><AlertTriangle className="mt-0.5 shrink-0 text-amber-600" /><div><h2 className="font-black text-slate-900">{en ? 'Important package information' : 'Fontos tudnivalók a csomagokról'}</h2><p className="mt-2 text-sm leading-relaxed text-slate-700">{en ? 'Packages can be purchased until 31 December 2026 with full prepayment. Dates can be arranged later, subject to availability, weather and operating days. Package discounts cannot be combined with other promotions. Individual excursions remain available at their standard price with payment on the day.' : 'A csomagok 2026. december 31-ig, teljes előrefizetéssel vásárolhatók meg. A programnapok később egyeztethetők a szabad helyek, az időjárás és az indulási napok szerint. A csomagkedvezmény más akcióval nem vonható össze. Az egyes programok továbbra is foglalhatók normál áron, a program napján történő fizetéssel.'}</p><Link to="/aszf" className="mt-3 inline-block text-sm font-bold text-sky-700 underline underline-offset-4">{en ? 'Detailed terms and cancellation policy' : 'Részletes feltételek és lemondási szabályok az ÁSZF-ben'}</Link></div></div>
      </div>

      </>}

      <div className="grid gap-6 lg:grid-cols-2">
        <LegacyOffer title={en ? 'Free airport transfer' : 'Ingyenes reptéri transzfer'} color="sky" lines={en ? ['Free airport-to-hotel transfer', 'Free hotel-to-airport transfer', 'Minimum 5 guests and 4 excursions'] : ['Ingyenes transzfer a reptérről a hotelbe', 'Ingyenes visszaút a hotelből a reptérre', 'Minimum 5 fő és minimum 4 program']} />
        <LegacyOffer title={en ? '3+1 promotion' : '3+1 akció'} color="red" lines={en ? ['Book 3 excursions and get the 4th one free', 'The cheapest excursion is free', 'Cannot be combined with package prices'] : ['Foglalj 3 programot, és a 4. program ingyenes', 'A legolcsóbb program ingyenes', 'Csomagárakkal nem vonható össze']} />
      </div>
    </section>
  </main>
}

function PackageCover({ images, name, oldPrice, price, en }: { images: string[]; name: string; oldPrice: number; price: number; en: boolean }) {
  return <div className="relative h-64 overflow-hidden bg-slate-900">
    <div className={`grid h-full ${images.length === 4 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-3'}`}>{images.map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="h-full w-full object-cover" loading="lazy" />)}</div>
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
    <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-lg">{en ? 'Full prepayment' : 'Teljes előrefizetés'}</div>
    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
      <div className="mb-1 text-sm font-bold text-white/90">{name}</div>
      <div className="flex items-end gap-3"><span className="pb-1 text-xl font-black text-white/70 line-through decoration-red-500 decoration-2">{oldPrice} €</span><span className="text-4xl font-black text-white drop-shadow">{price} €</span><span className="pb-1 text-sm font-bold">/{en ? 'person' : 'fő'}</span></div>
      <div className="mt-2 inline-flex rounded-lg bg-emerald-500 px-2.5 py-1 text-xs font-black text-white shadow">{en ? `SAVE ${oldPrice - price} €` : `${oldPrice - price} € MEGTAKARÍTÁS`}</div>
    </div>
  </div>
}

function Info({ icon, text }: { icon: React.ReactNode; text: string }) { return <div className="flex items-center gap-3 text-sm font-bold text-slate-700"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-700">{icon}</span>{text}</div> }

function LegacyOffer({ title, lines, color }: { title: string; lines: string[]; color: 'sky' | 'red' }) {
  const tone = color === 'sky' ? 'border-sky-200 bg-sky-50 text-sky-800' : 'border-red-200 bg-red-50 text-red-800'
  return <article className={`rounded-3xl border p-6 ${tone}`}><h2 className="text-xl font-black">🎁 {title}</h2><ul className="mt-4 space-y-2">{lines.map(line => <li key={line} className="flex gap-2 text-sm font-semibold"><Check size={17} className="mt-0.5 shrink-0" />{line}</li>)}</ul></article>
}
