export interface Program {
  id: string;
  name: string;
  category: 'tengeri' | 'sivatagi' | 'varosnezes' | 'csaldi';
  price: number;
  childPrice?: string;
  image: string;
  tagline: string;
  duration: string;
  availability: string;
  hasBalloonOption?: boolean;
  balloonPrice?: string;
  guideInfo?: string;
  highlight: string;
  fullDescription: string;
}

export const programs: Program[] = [
  {
    id: 'luxor-kiralyok-volgye',
    name: 'Luxor kirándulás – Királyok Völgye',
    category: 'varosnezes',
    price: 85,
    childPrice: '60€ (5–11 év)',
    image: '/images/luxor-kiralyok-volgye.jpg',
    tagline: 'Fedezd fel Luxor lenyűgöző világát egyetlen nap alatt – templomok, Nílus, fáraók.',
    highlight: 'Karnak templom + Királyok Völgye + Hőlégballon opció',
    duration: '04:00 – 22:00',
    availability: 'Minden nap',
    hasBalloonOption: true,
    balloonPrice: '105€',
    guideInfo: '15 fő felett magyar idegenvezető\nKisebb csoportnál angol / német / orosz nyelvű idegenvezetés',
    fullDescription: `Teljes napos luxori kirándulás Hurghadából, kényelmes transzferrel.


Kora reggel kialszol az ágyból – 04:00-kor már jövünk érted.
A szállodád ajtaja elől indulunk, és oda is hozunk vissza este.
Nem kell taxit hívni, nem kell keresgélni.


A buszút Luxorba kb. 4 óra.
Aludj, nézd a tájat, beszélgess – ahogy szeretnéd.


Érkezés után egyből Karnakba megyünk.
Belépsz a világ egyik legnagyobb templomegyüttesébe.
134 oszlop, 15 méter magasan.
A szent tó mellett elsétálsz, a szkarabeusz előtt megállsz.

Ez egy olyan hely, ahol elhallgatsz.


Hajóval kelünk át a Níluson.
Szél a hajadban, a folyó két partja között.

Ebéd a Nílus partján – büfé, ahol mindenki azt eszik, amit szeret.


Délután a Királyok Völgye következik.
Tutanhamon sírjától a színes falfestményekig – belülről látod, hogyan élték az életüket a fáraók.

Ezután Hatshepsut temploma és a Memnón kolosszusai.


Ha szeretnéd, megállunk az alabástrom- és olajgyárnál.
Szuvenír közvetlenül a helyi kézművesektől.


Útközben opcionálisan lehetőség van a Banán-sziget meglátogatására (+10€).
Friss gyümölcs, zöld oázis a Nílus közepén.


Visszaindulás kb. 17:00–18:00.
Érkezés Hurghadába kb. 22:00-re.

Egy nap, amit sosem felejtesz el.


A program sorrendje változhat az időjárástól és az aktuális helyzettől függően.


Az ár tartalmazza:
– Hotel–hotel transzfer
– Karnak templom belépő
– Hajózás a Níluson
– Ebéd (büfé)
– Királyok Völgye belépő
– Hatshepsut temploma belépő
– Idegenvezetés


Az ár nem tartalmazza:
– Italok
– Banán-sziget (+10€)
– Személyes költőpénz


Gyermekek:
– 5 éves korig ingyenes
– 5–11 éves korig kedvezményes ár (60€)`,
  },
  {
    id: 'kairo-piramisok-szfinx',
    name: 'Kairó kirándulás – Piramisok és Szfinx',
    category: 'varosnezes',
    price: 65,
    childPrice: '40€ (5–11 év)',
    image: '/images/kairo-piramisok.jpg',
    tagline: 'Fedezd fel Kairó ikonikus látnivalóit egyetlen nap alatt – piramisok, Szfinx és az ókori Egyiptom csodái.',
    highlight: 'Piramisok + Szfinx + Egyiptomi Múzeum',
    duration: 'Indulás: kb. 01:00–02:00, Visszaérkezés: kb. 22:00–23:00',
    availability: 'Minden nap',
    guideInfo: '15 fő felett magyar idegenvezető\nKisebb csoportnál angol / német nyelvű idegenvezetés',
    fullDescription: `Teljes napos kairói kirándulás Hurghadából, kényelmes transzferrel.


Kora hajnalban indulunk – kb. 01:00–02:00 között jövünk érted a szállodához.
A buszút Kairóba kb. 6–7 óra, közben pihenhetsz vagy nézheted a sivatagi tájat.


Megérkezés után egyből a világhírű piramisokhoz megyünk.
Itt szabadidőd is lesz fotózni – itt készülnek a legjobb képek.


Ezután a híres Szfinx következik – egy hatalmas, ikonikus szobor, amit élőben látni egészen más élmény.


A világ egyik legismertebb látványossága vár rád:
• Kheopsz, Khephrén és Mükerinosz piramisai


Ebéd egy helyi étteremben – büfé rendszerben.


Délután ellátogatunk az Egyiptomi Múzeumba, ahol több ezer éves kincseket láthatsz, többek között Tutanhamon leleteit.


Ha szeretnéd, lehetőség van papirusz és parfüm műhely meglátogatására is.


Késő délután indulunk vissza Hurghadába.
Érkezés kb. 22:00–23:00 között.

Egy nap, amit nem fogsz elfelejteni.


A program sorrendje változhat az időjárástól és az aktuális helyzettől függően.


Az ár tartalmazza:
– Hotel–hotel transzfer
– Piramisok belépő
– Szfinx belépő
– Egyiptomi Múzeum belépő
– Ebéd (büfé)
– Idegenvezetés


Az ár nem tartalmazza:
– Italok
– Piramis belső belépő (opcionális)
– Személyes költőpénz


Gyermekek:
– 5 éves korig ingyenes
– 5–11 éves korig kedvezményes ár (40€)`,
  },
  {
    id: 'orange-bay',
    name: 'Orange Bay – Hajós kirándulás',
    category: 'tengeri',
    price: 25,
    image: '/images/orange-bay-new.jpg',
    tagline: 'Egész napos hajós kirándulás Hurghadából az Orange Bay szigetre, kristálytiszta vízzel és fehér homokos parttal.',
    highlight: '2 snorkeling megálló + Pihenés a szigeten',
    duration: '08:00 – 18:00',
    availability: 'Minden nap',
    fullDescription: `Egész napos hajós kirándulás Hurghadából az Orange Bay szigetre, kristálytiszta vízzel és fehér homokos parttal.


Reggel kb. 08:00 körül érkezik a transzfer a szállodához, majd a kikötőbe viszünk. Innen indul a hajó a Vörös-tengerre.


A nap során két sznorkeling megálló vár rád gyönyörű korallzátonyoknál, ahol színes halakat és tengeri élővilágot láthatsz.


Ezután megérkezünk az Orange Bay szigetre, ahol kb. 1,5–2 órát tölthetsz. Fürdés, pihenés, napozás és fotózás – igazi paradicsomi élmény.


Egy tökéletes tengerparti nap vár rád:
• 2 snorkeling megálló a nyílt tengeren
• Pihenés az Orange Bay szigeten


Ebéd a hajón, ahol pihenhetsz és élvezheted a kilátást.


Délután visszaindulunk a kikötőbe, majd transzfer a szállodába.
Érkezés kb. 18:00–19:00 között.

Egy nap, ami a nyaralás egyik legjobb élménye lesz.


A program sorrendje változhat az időjárástól és az aktuális helyzettől függően.


Az ár tartalmazza:
– Hotel–hotel transzfer
– Hajókirándulás
– 2 snorkeling megálló
– Teljes snorkeling felszerelés
– Ebéd


Az ár nem tartalmazza:
– Italok
– Személyes költések


Gyermekek:
– 5 éves korig ingyenes`,
  },
  {
    id: 'buvarkirandulas',
    name: 'Búvárkirándulás',
    category: 'tengeri',
    price: 30,
    image: '/images/diving.jpg',
    tagline: 'Egész napos búvárkirándulás Hurghadából a Vörös-tengeren, kezdőknek és haladóknak is.',
    highlight: '2 merülés oktatóval + Teljes felszerelés',
    duration: '08:00 – 17:00',
    availability: 'Minden nap',
    fullDescription: `Egész napos búvárkirándulás Hurghadából a Vörös-tengeren, kezdőknek és haladóknak is.


Reggel kb. 08:00 körül érkezik a transzfer a szállodához, majd a kikötőbe viszünk.


A hajóval a nyílt tengerre indulunk, ahol profi oktatók segítenek a felkészülésben.


A nap során két különböző helyszínen merülhetsz, és felfedezheted a Vörös-tenger lenyűgöző víz alatti világát.


Fedezd fel a tenger mélyét:
• 2 búvármerülés oktatóval
• Ideális kezdőknek is


A merülések között lehetőség van sznorkelingre vagy pihenésre a hajón.


Ebéd a fedélzeten.


Délután visszatérés a kikötőbe, majd transzfer a szállodába.
Érkezés kb. 17:00–18:00 között.

Egy felejthetetlen élmény a tenger alatt.


A program sorrendje változhat.


Az ár tartalmazza:
– Hotel–hotel transzfer
– Hajókirándulás
– Teljes búvárfelszerelés
– 2 merülés oktatóval
– Ebéd


Az ár nem tartalmazza:
– Italok
– Személyes költések


Fontos információk:
– Búvárkodás 10 éves kortól
– Előzetes tapasztalat nem szükséges`,
  },
  {
    id: 'dolphin-house',
    name: 'Dolphin House – Delfin kirándulás',
    category: 'tengeri',
    price: 40,
    image: '/images/dolphins.jpg',
    tagline: 'Egész napos hajós kirándulás Hurghadából a Dolphin House területére, ahol vadon élő delfinekkel találkozhatsz.',
    highlight: 'Delfinekkel úszhatsz + Snorkeling',
    duration: '08:00 – 17:00',
    availability: 'Minden nap',
    fullDescription: `Egész napos hajós kirándulás Hurghadából a Dolphin House területére, ahol vadon élő delfinekkel találkozhatsz.


A transzfer reggel kb. 08:00 körül érkezik a szállodához, majd a kikötőbe viszünk.


Hajózás a nyílt tengeren, ahol több sznorkeling megálló vár rád a korallzátonyoknál.


Ha szerencséd van, delfineket is láthatsz, sőt akár együtt úszhatsz velük természetes környezetükben.


Egy különleges tengeri élmény:
• Delfin megfigyelés a nyílt tengeren
• Több snorkeling megálló


Ebéd a hajón.


Pihenés, fürdés és sznorkeling a nap folyamán.


Délután visszaindulunk, majd transzfer a szállodába.
Érkezés kb. 17:00–18:00 között.


A delfinek vadon élnek, ezért a megjelenésük nem garantált.


A program sorrendje változhat.


Az ár tartalmazza:
– Hotel–hotel transzfer
– Hajókirándulás
– Snorkeling felszerelés
– Ebéd


Az ár nem tartalmazza:
– Italok
– Személyes költések


Gyermekek:
– 5 éves korig ingyenes`,
  },
  {
    id: 'dolphinarium',
    name: 'Dolphinarium látogatás',
    category: 'csaldi',
    price: 20,
    image: '/images/dolphinarium.jpg',
    tagline: 'Rövid, családbarát program Hurghadában, ahol látványos delfin- és oroszlánfóka show-t nézhetsz meg.',
    highlight: 'Delfin show + Oroszlánfóka show',
    duration: 'Kb. 2–3 óra',
    availability: 'Naponta 2x (reggel és délután)',
    fullDescription: `Rövid, családbarát program Hurghadában, ahol látványos delfin- és oroszlánfóka show-t nézhetsz meg.


A transzfer naponta kétszer indul: reggel kb. 08:00 körül, illetve délután kb. 14:00 körül.


Felvétel a szállodától, majd transzfer a delfináriumba.


A program során egy kb. 50 perces látványos show-t nézhetsz meg, ahol delfinek és oroszlánfókák mutatják be tudásukat.

A műsor után lehetőség van fotózásra vagy úszásra a delfinekkel (külön díj ellenében).


Ezután visszautazás a szállodába.


Egy különleges családi élmény:
• Delfin- és oroszlánfóka show
• Ideális családi program


Indulási idő:
– Reggeli turnus: kb. 08:00 (transzfer érkezése)
– Délutáni turnus: kb. 14:00 (transzfer érkezése)


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer oda-vissza
– Belépő a show-ra


Az ár nem tartalmazza:
– Delfinekkel úszás (kb. 50–60€)
– Fotózás


Gyermekek:
– 3 éves korig ingyenes


Fontos információk:
– Napi 2 indulás
– Gyerekeknek is ideális`,
  },
  {
    id: 'paradise-island',
    name: 'Paradise Island – Hajós kirándulás',
    category: 'tengeri',
    price: 25,
    image: '/images/paradise-island.jpg',
    tagline: 'Egész napos hajós kirándulás Hurghadából a Paradise Island szigetre, fehér homokos parttal és kristálytiszta vízzel.',
    highlight: '2 snorkeling megálló + Fehér homokos strand',
    duration: '08:00 – 18:00',
    availability: 'Minden nap',
    fullDescription: `Egész napos hajós kirándulás Hurghadából a Paradise Island szigetre, fehér homokos parttal és kristálytiszta vízzel.


Reggeli felvétel a szállodától, majd transzfer a kikötőbe.


Hajózás a Vörös-tengeren, ahol két snorkeling megálló vár rád a korallzátonyoknál.


Ezután érkezés a szigetre, ahol szabadidő strandolásra és pihenésre.


Egy tökéletes tengerparti nap vár rád:
• 2 snorkeling megálló
• Pihenés a szigeten


Ebéd a hajón, majd visszatérés délután.


Érkezés kb. 18:00 körül.


Egy nap, ami a nyaralás egyik legjobb élménye lesz.


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Hajókirándulás
– Snorkeling felszerelés
– Ebéd


Az ár nem tartalmazza:
– Személyes költések


Gyermekek:
– 5 éves korig ingyenes`,
  },
  {
    id: 'el-gouna',
    name: 'El Gouna élmény – Lagúnák és hajókirándulás',
    category: 'varosnezes',
    price: 60,
    image: '/images/el-gouna.jpg',
    tagline: 'Fedezd fel Egyiptom Velencéjét – hajózás lagúnákon, pihenés és városnézés egy programban.',
    highlight: 'Lagúna hajózás + Városnézés El Gounában',
    duration: '08:00 – 16:00',
    availability: 'Minden nap',
    fullDescription: `Fedezd fel Egyiptom Velencéjét – hajózás lagúnákon, pihenés és városnézés egy programban.


Felvétel a szállodából reggel, majd transzfer El Gounába.


Hajókirándulás a lagúnákon, pihenés, fürdés és snorkeling lehetőség.


Egy felejthetetlen nap vár rád:
• Hajózás a lagúnákon
• Városnézés El Gounában


Szabadidő a városban, majd ebéd a hajón.


Délután visszatérés a szállodába.


Érkezés kb. 16:00 körül.


Egy nap, amit nem fogsz elfelejteni.


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Hajókirándulás
– Ebéd és italok
– Snorkeling felszerelés


Az ár nem tartalmazza:
– Személyes költések`,
  },
  {
    id: 'parasailing',
    name: 'Parasailing – Ejtőernyős repülés',
    category: 'tengeri',
    price: 25,
    image: '/images/parasailing.jpg',
    tagline: 'Repülj a Vörös-tenger felett és élvezd a lélegzetelállító kilátást!',
    highlight: '7–8 perces repülés a tenger felett',
    duration: 'Kb. 1–2 óra',
    availability: 'Naponta 2x (reggel és délután)',
    fullDescription: `Repülj a Vörös-tenger felett és élvezd a lélegzetelállító kilátást!


Transzfer a szállodából, majd a kikötőbe.


Rövid eligazítás után következik a parasailing repülés a hajó mögött.


Egy felejthetetlen élmény vár rád:
• 7–8 perces repülés
• Egyedül vagy párosan


Ezután visszatérés és transzfer a szállodába.


Indulási idő:
– Reggeli turnus: kb. 08:00 (transzfer érkezése)
– Délutáni turnus: kb. 14:00 (transzfer érkezése)


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Felszerelés
– Repülés


Fontos információk:
– Max súly: 150 kg`,
  },
  {
    id: 'quad-safari',
    name: 'Quad Safari – Sivatagi túra',
    category: 'sivatagi',
    price: 25,
    image: '/images/quad.jpg',
    tagline: 'Izgalmas quad túra a sivatagban, beduin falulátogatással.',
    highlight: '40 km sivatagi túra + Beduin falu',
    duration: 'Kb. 3–4 óra',
    availability: 'Naponta 2x (reggel és délután)',
    fullDescription: `Izgalmas quad túra a sivatagban, beduin falulátogatással.


Felvétel a szállodából, majd transzfer a bázisra.


Rövid oktatás után quad túra a homokdűnéken.


Látogatás egy beduin faluban, tevegelés és tea.


Egy különleges sivatagi élmény vár rád:
• 40 km sivatagi túra
• Beduin élmény


Visszatérés a szállodába.


Indulási idő:
– Reggeli turnus: kb. 08:00 (transzfer érkezése)
– Délutáni turnus: kb. 14:00 (transzfer érkezése)


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Quad használat
– Oktatás
– Beduin látogatás
– Tea


Az ár nem tartalmazja:
– Személyes költékek


Fontos információk:
– Kendő (arafatka) és porvédő szemüveg a helyszínen is megvásárolható
– Érdemes előre beszerezni bazárokban olcsóbban
– Lehetőség van kis állatokkal fotózkodni:
  • kis oroszlán
  • majom
– A fotózás külön fizetendő: kb. 2–3 USD / fő`,
  },
  {
    id: 'super-safari',
    name: 'Super Safari – Teljes sivatagi kaland',
    category: 'sivatagi',
    price: 30,
    image: '/images/super-safari-new.jpg',
    tagline: 'Izgalmas sivatagi program, ahol többféle járművet és élményt is kipróbálhatsz egyetlen nap alatt.',
    duration: '14:00 – 20:00',
    availability: 'Minden nap',
    highlight: 'Quad + buggy + jeep + Naplemente + Vacsora',
    fullDescription: `Izgalmas sivatagi program, ahol többféle járművet és élményt is kipróbálhatsz egyetlen nap alatt.


Felvétel a szállodából, majd transzfer a sivatagi bázisra.


Quad túra a homokdűnéken, majd buggy vezetés és jeep utazás.


Látogatás egy beduin faluban, tevegelés és tea.


Naplemente a sivatagban, majd vacsora és esti show műsor.


Visszatérés a szállodába.


Egy felejthetetlen sivatagi élmény vár rád:
• Quad + buggy + jeep
• Naplemente + vacsora


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Quad és buggy használat
– Jeep túra
– Beduin látogatás
– Tevegelés
– Vacsora
– Esti műsor


Az ár nem tartalmazza:
– Italok
– Személyes költések


Fontos információk:
– Kendő (arafatka) és porvédő szemüveg a helyszínen is megvásárolható
– Érdemes előre beszerezni bazárokban olcsóbban
– Lehetőség van kis állatokkal fotózkodni:
  • kis oroszlán
  • majom
– A fotózás külön fizetendő: kb. 2–3 USD / fő`,
  },
  {
    id: 'jeep-safari',
    name: 'Jeep Safari – Sivatagi túra',
    category: 'sivatagi',
    price: 30,
    image: '/images/jeep-safari.jpg',
    tagline: 'Fedezd fel a sivatagot 4x4 terepjáróval és ismerd meg a beduin életet.',
    duration: '14:00 – 20:00',
    availability: 'Minden nap',
    highlight: 'Jeep off-road túra + Beduin élmény',
    fullDescription: `Fedezd fel a sivatagot 4x4 terepjáróval és ismerd meg a beduin életet.


Felvétel a szállodából, majd jeep túra a sivatagban.


Látogatás egy beduin faluban, tevegelés és tea.


Naplemente megtekintése, majd vacsora és show.


Visszatérés a szállodába.


Egy különleges sivatagi élmény vár rád:
• Jeep off-road túra
• Beduin élmény


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Jeep túra
– Beduin látogatás
– Tevegelés
– Vacsora
– Esti műsor


Az ár nem tartalmazza:
– Italok


Fontos információk:
– Kendő (arafatka) és porvédő szemüveg a helyszínen is megvásárolható
– Érdemes előre beszerezni bazárokban olcsóbban
– Lehetőség van kis állatokkal fotózkodni:
  • kis oroszlán
  • majom
– A fotózás külön fizetendő: kb. 2–3 USD / fő`,
  },
  {
    id: 'batiskaf',
    name: 'Batiskaf – Üvegfenekű hajó + snorkeling',
    category: 'tengeri',
    price: 25,
    image: '/images/snorkeling.jpg',
    tagline: 'Fedezd fel a Vörös-tenger élővilágát anélkül, hogy lemerülnél.',
    duration: 'Kb. 3 óra',
    availability: 'Naponta 2x (reggel és délután)',
    highlight: 'Panoráma ablakos hajó + Snorkeling',
    fullDescription: `Fedezd fel a Vörös-tenger élővilágát anélkül, hogy lemerülnél.


Transzfer a szállodából, majd hajókirándulás.


Megfigyelés a hajó alsó szintjén, majd snorkeling a korallzátonynál.


Visszatérés a szállodába.


Egy különleges víz alatti élmény vár rád:
• Panoráma ablakos hajó
• Snorkeling lehetőség


Indulási idő:
– Reggeli turnus: kb. 08:00
– Délutáni turnus: kb. 14:00


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Hajókirándulás
– Snorkeling felszerelés


Az ár nem tartalmazza:
– Italok`,
  },
  {
    id: 'lovaglas',
    name: 'Lovaglás + fürdés a tengerben',
    category: 'csaldi',
    price: 35,
    image: '/images/lovaglas.jpg',
    tagline: 'Egy különleges élmény: lovaglás a tengerparton és fürdés a lóval.',
    duration: 'Kb. 2 óra',
    availability: 'Naponta 2x (reggel és délután)',
    highlight: 'Lovaglás a parton + Fürdés a lóval',
    fullDescription: `Egy különleges élmény: lovaglás a tengerparton és fürdés a lóval.


Transzfer az istállóhoz, majd lovaglás a parton.


Fürdés a lóval a tengerben, fotózás.


Visszatérés a szállodába.


Egy felejthetetlen élmény vár rád:
• Lovaglás a tengerparton
• Fürdés a lóval


Indulási idő:
– Reggeli turnus: kb. 08:00
– Délutáni turnus: kb. 14:00


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Lovaglás
– Fürdés a lóval
– Fotózás


Az ár nem tartalmazza:
– Tippek
– Egyéb költségek`,
  },
  {
    id: 'torokfurdo',
    name: 'Törökfürdő & Cleopatra SPA – Hurghada',
    category: 'csaldi',
    price: 30,
    image: '/images/spa.jpg',
    tagline: 'Pihentető SPA élmény Hurghadában, ahol kipróbálhatod a hagyományos törökfürdőt, masszázsokat és különböző kényeztető kezeléseket.',
    duration: '2–3 óra',
    availability: 'Minden nap',
    highlight: 'Törökfürdő + habmasszázs + Teljes relaxáció',
    fullDescription: `Pihentető SPA élmény Hurghadában, ahol kipróbálhatod a hagyományos törökfürdőt, masszázsokat és különböző kényeztető kezeléseket.


Transzfer a szállodából a SPA központba.


A program során gőzfürdők, bőrradír, habmasszázs, jakuzzi és pihenés vár rád.


A választott csomagtól függően különböző kezelések és masszázsok érhetők el.


A program végén visszatranszfer a szállodába.


Egy tökéletes relaxáció vár rád:
• Törökfürdő + habmasszázs
• Teljes relaxáció


Elérhető csomagok:

PROGRAM 1 – Törökfürdő
Ár: 30€
• Száraz gőzfürdő
• Nedves törökfürdő
• Bőrradír + habmasszázs
• Jakuzzi + pihenés

PROGRAM 2 – Cleopatra SPA
Ár: 45€
• Gőzfürdők
• Bőrradír + habmasszázs
• Arcpakolás
• Jakuzzi
• 45 perces teljes test masszázs

PROGRAM 3 – Gyógymasszázs
Ár: 40€
• 90 perces masszázs
• Pihenés és italok

VIP PROGRAM
Ár: 65€
• Teljes Cleopatra program
• Külön VIP szoba
• Extra italok és gyümölcs


A program sorrendje változhat.


Az ár tartalmazza:
– Hotel–hotel transzfer
– SPA kezelések (csomagtól függően)
– Italok


Az ár nem tartalmazza:
– Személyes költések
– Borravaló


Fontos információk:
– Nőknek női masszőr
– Férfiaknak férfi masszőr
– Öltöző és széf biztosított
– Ajánlott kényelmes ruházat

– Nincs szükség előre foglalásra
– Elég 1 nappal előtte jelezni WhatsAppon
– Fizetés a program indulásakor`,
  },
  {
    id: 'nemo-island',
    name: 'Nemo Island – Naplemente hajós kirándulás',
    category: 'tengeri',
    price: 35,
    image: '/images/nemo-island.jpg',
    tagline: 'Különleges hajós kirándulás a Nemo szigetre, snorkelinggel és naplementével a Vörös-tengeren.',
    duration: '10:00 – 19:00',
    availability: 'Minden nap',
    highlight: '2 snorkeling megálló + Naplemente a tengeren',
    fullDescription: `Különleges hajós kirándulás a Nemo szigetre, snorkelinggel és naplementével a Vörös-tengeren.


Transzfer a szállodából kb. 10:00 körül, majd hajózás a szigetre.


Snorkeling megállók korallzátonyoknál, majd érkezés a szigetre, ahol pihenhetsz és fürödhetsz.


Ebéd a hajón, majd naplementés hajózás.


Visszatérés a szállodába kb. 19:00.


Egy felejthetetlen élmény vár rád:
• 2 snorkeling megálló
• Naplemente a tengeren


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Hajókirándulás
– Ebéd és italok
– Snorkeling felszerelés


Az ár nem tartalmazza:
– Személyes költékek`,
  },
  {
    id: 'mahmya-island',
    name: 'Mahmya Island – All Inclusive hajós kirándulás',
    category: 'tengeri',
    price: 100,
    image: '/images/mahmya.jpg',
    tagline: 'Prémium hajós kirándulás fehér homokos szigetre all inclusive ellátással.',
    duration: '08:00 – 16:00',
    availability: 'Minden nap',
    highlight: 'Prémium sziget + All inclusive élmény',
    fullDescription: `Prémium hajós kirándulás fehér homokos szigetre all inclusive ellátással.


Hajózás a Mahmya szigetre, ahol egész nap pihenés, fürdés és snorkeling vár.


Ebéd és italok a tengerparti étteremben.


Visszatérés délután.


Egy különleges prémium élmény vár rád:
• Prémium sziget
• All inclusive élmény


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Hajókirándulás
– Ebéd és italok


Az ár nem tartalmazza:
– Alkoholos italok`,
  },
  {
    id: 'makadi-aquapark',
    name: 'Makadi Water World Aqua Park',
    category: 'csaldi',
    price: 60,
    image: '/images/aquapark.jpg',
    tagline: 'Egész napos vízi élmény több mint 50 csúszdával és medencével.',
    duration: '10:00 – 17:00',
    availability: 'Minden nap',
    highlight: '50+ csúszda + Családi program',
    fullDescription: `Egész napos vízi élmény több mint 50 csúszdával és medencével.


Transzfer a szállodából, majd érkezés az aquaparkba.


Egész napos szabad program csúszdákkal, medencékkel és pihenéssel.


Ebéd a helyszínen.


Visszatérés délután.


Egy tökéletes családi nap vár rád:
• 50+ csúszda
• Családi program


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Belépő
– Ebéd és italok


Az ár nem tartalmazza:
– Törölköző`,
  },
  {
    id: 'grand-aquarium',
    name: 'Grand Aquarium & Zoo',
    category: 'csaldi',
    price: 50,
    image: '/images/grand-aquarium.jpg',
    tagline: 'Fedezd fel a tengeri világot és egzotikus állatokat egy helyen.',
    duration: 'Kb. 3–4 óra',
    availability: 'Minden nap',
    highlight: 'Üveg alagút + 1200+ állat',
    fullDescription: `Fedezd fel a tengeri világot és egzotikus állatokat egy helyen.


Transzfer a szállodából, majd érkezés az akváriumba.


Szabad bejárás, fotózás és állatok megfigyelése.


Visszatérés a hotelbe.


Egy különleges élmény vár rád:
• Üveg alagút
• 1200+ állat


A program sorrendje változhat.


Az ár tartalmazza:
– Transzfer
– Belépő


Az ár nem tartalmazza:
– Személyes költékek`,
  },
  {
    id: 'snorkeling-teknosokkel',
    name: 'Snorkeling teknősökkel',
    category: 'tengeri',
    price: 60,
    image: '/images/teknos-snorkeling.jpg',
    tagline: 'Snorkeling vadon élő teknősökkel a Vörös-tengerben – egy felejthetetlen élmény.',
    duration: '08:00 – 17:00',
    availability: 'Minden nap',
    highlight: 'Teknősök a természetes élőhelyükön + Snorkeling',
    fullDescription: `Snorkeling vadon élő teknősökkel a Vörös-tengerben – egy felejthetetlen élmény.


Reggel felvétel a szállodából, majd transzfer a kikötőbe.


Hajózás a teknősökhöz, ahol biztonságos körülmények között merülhetsz velük.


A program során snorkeling felszerelést biztosítunk, így közelről figyelheted meg a tengeri teknősöket.


Egy különleges élmény vár rád:
• Teknősök a természetes élőhelyükön
• Snorkeling


Délután visszatérés, transzfer a hotelbe.


A program sorrendje változhat.


Az ár tartalmazza:
– Hotel–hotel transzfer
– Hajókirándulás
– Snorkeling felszerelés
– Ebéd


Az ár nem tartalmazza:
– Személyes költések`,
  },
];

export const categories = [
  { id: 'tengeri' as const, label: 'Tengeri programok', icon: 'Anchor' },
  { id: 'sivatagi' as const, label: 'Sivatagi programok', icon: 'Sun' },
  { id: 'varosnezes' as const, label: 'Városnézés', icon: 'Landmark' },
  { id: 'csaldi' as const, label: 'Családi programok', icon: 'Users' },
];

export const IMPORTANT_INFO = `– Nincs szükség előre foglalásra
– Elég 1 nappal előtte jelezni WhatsAppon
– Fizetés a program indulásakor:
  Revolut / Wise / EUR / USD / EGP készpénz
– A pontos indulási időt előző este küldjük`;

export const WHATSAPP_NUMBER = '+201276551571';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61571060835253';