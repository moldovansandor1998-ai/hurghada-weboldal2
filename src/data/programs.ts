export interface Program {
  id: string;
  name: string;
  category: 'tengeri' | 'sivatagi' | 'varosnezes' | 'csaldi';
  price: number;
  childPrice?: string;
  image: string;
  gallery?: string[];
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
    name: 'Kairó – Piramisok & Old Museum',
    category: 'varosnezes',
    price: 65,
    childPrice: '40€ (5–11 év)',
    image: '/images/kairo-piramisok.jpg',
    tagline: 'A klasszikus kairói élmény magyar idegenvezetéssel – piramisok, Szfinx és az ókori Egyiptom története.',
    highlight: 'Piramisok + Szfinx + Egyiptomi Múzeum',
    duration: 'Indulás: kb. 01:00–02:00, Visszaérkezés: kb. 20:00–21:00',
    availability: 'Minden nap',
    guideInfo: '15 fő felett magyar idegenvezető – teljesen privát túra\nKisebb csoportnál angol / német nyelvű idegenvezetés',
    fullDescription: `Ez a program a hagyományos, ikonikus kairói élményt kínálja azok számára, akik szeretnék valóban megérteni azt, amit látnak. A privát transzfernek köszönhetően a nap kényelmesen, szervezetten és kiszámíthatóan telik, a magyar idegenvezetés pedig biztosítja, hogy a történelem ne csak látvány, hanem élő történet legyen. A program 15 fő felett magyar nyelvű idegenvezetővel, teljesen privát formában zajlik.


Az első állomás a Gízai piramisok fennsíkja, ahol a Kheopsz-, Khephrén- és Mükerinosz-piramis monumentális tömbjei magasodnak a sivatag fölé. A helyszínen elegendő idő áll rendelkezésre fotózásra és a részletek megfigyelésére, miközben magyar nyelven hallhatod a piramisok építésével, funkciójával és történelmi jelentőségével kapcsolatos legfontosabb tudnivalókat.


A piramisok közelében található a legendás Szfinx, amely évezredek óta őrzi a fennsíkot. Itt szintén lehetőség van kényelmes tempóban körbejárni és megörökíteni az élményt.


A program következő része a híres Egyiptomi Múzeum (Old Museum) meglátogatása. A múzeum termeiben az ókori Egyiptom legértékesebb relikviái sorakoznak: fáraók szobrai, aranykincsek, sírmellékletek és mindennapi használati tárgyak. A magyar idegenvezetés különösen nagy hozzáadott értéket jelent itt, hiszen a kiállítási tárgyak mögötti történetek, összefüggések és érdekességek érthetően, élményszerűen kelnek életre.


A program tartalmaz ebédet, valamint vásárlási lehetőséget megbízható helyszíneken. Igény esetén opcionális nílusi hajókázás is kérhető, amely különleges perspektívából mutatja meg Kairót, és kellemes lezárása lehet a tartalmas napnak.


Ez a túra ideális azoknak, akik a klasszikus kairói látnivalókat szeretnék kényelmes, magyar nyelvű kísérettel felfedezni.


Egy nap, amit nem fogsz elfelejteni:
• Gízai Piramisok
• Szfinx
• Egyiptomi Old Museum
• Ebéd
• Shopping lehetőség
• Opcionális: Nílusi hajókázás


A program sorrendje változhat az időjárástól és az aktuális helyzettől függően.


Az ár tartalmazza:
– Privát légkondícionált transzfer oda-vissza
– Piramisok belépő
– Szfinx belépő
– Egyiptomi Múzeum belépő
– Ebéd
– Magyar idegenvezetés (15 fő felett)


Az ár nem tartalmazza:
– Italok
– Piramis belső belépő (opcionális)
– Nílusi hajókázás (opcionális)
– Személyes költőpénz


Gyermekek:
– 5 éves korig ingyenes
– 5–11 éves korig kedvezményes ár (40€)`,
  },
  {
    id: 'kairo-gem',
    name: 'Kairó – Piramisok & Grand Egyptian Museum (GEM)',
    category: 'varosnezes',
    price: 95,
    image: '/images/kairo-gem.jpg',
    tagline: 'VIP kairói élmény a világ legmodernebb múzeumával – piramisok, Szfinx és a Grand Egyptian Museum.',
    highlight: 'Piramisok + Szfinx + Grand Egyptian Museum',
    duration: 'Indulás: kb. 01:00–02:00, Visszaérkezés: kb. 22:00',
    availability: 'Minden nap',
    guideInfo: '15 fő felett magyar idegenvezető – teljesen privát túra\nKisebb csoportnál angol / német nyelvű idegenvezetés',
    fullDescription: `A VIP Kairó program azoknak készült, akik a klasszikus és a modern Egyiptomot egyszerre szeretnék felfedezni, kényelmes, privát formában. A saját transzfernek köszönhetően a nap gördülékenyen, rugalmas tempóban zajlik, míg a magyar idegenvezetés biztosítja, hogy a látottak valódi történelmi tartalommal teljenek meg. A program 15 fő felett magyar nyelvű idegenvezetővel, teljesen privát formában zajlik.


Az első állomás a Gízai piramisok fennsíkja, ahol a Kheopsz-, Khephrén- és Mükerinosz-piramis monumentális látványa fogad. A helyszínen nem csupán fotózunk, hanem betekintést kapunk az építésükhöz kapcsolódó elméletekbe, a fáraók világába és az ókori mérnöki zsenialitásba. A piramisok lábánál őrzi a fennsíkot a legendás Szfinx, amely az egyiptomi civilizáció egyik legismertebb szimbóluma.


A nap második kiemelt állomása a lenyűgöző Grand Egyptian Museum (GEM), amely a világ egyik legnagyobb és legmodernebb múzeuma. Az impozáns épület már önmagában is látványosság, gyűjteménye pedig páratlan: monumentális szobrok, királyi relikviák és az ókori Egyiptom eddig soha nem látott módon bemutatott öröksége vár. A modern kiállítótér és a letisztult installációk teljesen új szintre emelik a múzeumlátogatás élményét.


A program része az ebéd, valamint igény szerint vásárlási lehetőség megbízható helyszíneken. Opcionálisan nílusi hajókázás is kérhető, amely különleges perspektívából mutatja meg Kairó városát, és elegáns lezárása lehet a napnak.


Ez a túra ideális választás azok számára, akik prémium, átgondolt és tartalmas kairói élményre vágynak, magyar nyelvű szakmai kísérettel.


Egy felejthetetlen nap vár rád:
• Gízai Piramisok
• Szfinx
• Grand Egyptian Museum (GEM)
• Ebéd
• Shopping lehetőség
• Opcionális: Nílusi hajókázás


A program sorrendje változhat az időjárástól és az aktuális helyzettől függően.


Az ár tartalmazza:
– Privát légkondícionált transzfer oda-vissza
– Piramisok belépő
– Szfinx belépő
– Grand Egyptian Museum belépő
– Ebéd
– Magyar idegenvezetés (15 fő felett)


Az ár nem tartalmazza:
– Italok
– Piramis belső belépő (opcionális)
– Nílusi hajókázás (opcionális)
– Személyes költőpénz`,
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
    id: 'vip-orange-bay',
    name: 'VIP Orange Bay – Prémium hajós kirándulás',
    category: 'tengeri',
    price: 45,
    childPrice: '5 éves kor alatt ingyenes',
    image: '/images/vip-hajo-1.jpg',
    gallery: [
      '/images/vip-hajo-1.jpg',
      '/images/vip-hajo-2.jpg',
      '/images/vip-hajo-belso-1.jpg',
      '/images/vip-hajo-belso-2.jpg',
    ],
    tagline: 'Az Orange Bay élménye nagyobb, kényelmesebb és luxusabb hajóval, ebéddel és snorkelinggel.',
    highlight: 'Luxushajó + Snorkeling + Ebéd a hajón + 2 óra a szigeten',
    duration: '08:00 – 18:00',
    availability: 'Minden nap',
    fullDescription: `Éld át az Orange Bay programot prémium kivitelben, egy nagyobb, kényelmesebb és luxusabb hajó fedélzetén.


Reggel kb. 08:00 körül érkezik a transzfer a szállodádhoz, majd a kikötőbe viszünk. Innen indulunk a Vörös-tengerre a tágas VIP hajóval, ahol kényelmes belső terek és pihenőhelyek várnak.


A nap során snorkeling megállónál fedezheted fel a Vörös-tenger színes korallzátonyait és különleges élővilágát. A snorkeling felszerelést biztosítjuk.


Ezután megérkezünk az Orange Bay szigetre, ahol kb. 2 órát tölthetsz. Fürdés, napozás, pihenés és fotózás a fehér homokos parton és a türkizkék vízben.


Az ebédet a hajón szolgálják fel, így kényelmes környezetben pihenhetsz és élvezheted a tengeri kilátást.


A VIP élmény részei:
• Nagyobb, luxusabb hajó
• Snorkeling megálló
• Teljes snorkeling felszerelés
• Ebéd a hajón
• Kb. 2 óra az Orange Bay szigetén


Délután visszaindulunk a kikötőbe, majd transzferrel visszaviszünk a szállodádba.


A program sorrendje változhat az időjárástól és az aktuális helyzettől függően.


Az ár tartalmazza:
– Hotel–hotel transzfer
– Prémium hajókirándulás
– Snorkeling megálló
– Snorkeling felszerelés
– Kb. 2 óra az Orange Bay szigetén
– Ebéd a hajón


Az ár nem tartalmazza:
– Személyes költések


Gyermekek:
– 5 éves kor alatt ingyenes`,
  },
  {
    id: 'orange-bay-megawish',
    name: 'Orange Bay & Megawish Island – Hajós kirándulás',
    category: 'tengeri',
    price: 38,
    image: '/images/orange-bay-megawish.jpg',
    tagline: 'Két sziget egy nap alatt – Orange Bay és Megawish Island snorkelinggel, ebéddel és italokkal.',
    duration: '08:00 – 18:00',
    availability: 'Kedd • Csütörtök • Vasárnap',
    highlight: '2 sziget (Orange Bay + Megawish) + 1 snorkeling megálló + Ebéd és italok',
    fullDescription: `Két paradicsomi sziget egyetlen nap alatt – a Vörös-tenger legnépszerűbb hajós kirándulása!


Reggel kb. 08:00 körül érkezik a transzfer a szállodához, majd a kikötőbe viszünk. Innen indul a hajó a Vörös-tengerre.


Az első megálló egy snorkeling helyszín, ahol a Vörös-tenger színes élővilágát és korallzátonyait fedezheted fel. A víz kristálytiszta, a halak színesek – ez az élmény már önmagában megér egy kirándulást.


Ezután megérkezünk az Orange Bay szigetre, ahol kb. 1,5 óra szabadidő áll rendelkezésedre. Fürdés a sekély, türkiz vízben, pihenés a fehér homokos parton, napozás és fotózás – igazi paradicsomi élmény.


A második sziget a Megawish Island, ahol szintén kb. 1,5 órát tölthetsz. Ez a sziget egyedülálló hangulatával és gyönyörű strandjával vár – tökéletes hely a pihenésre, fürödésre és a Vörös-tenger szépségének élvezetére.


A hajón ebédet és italokat (meleg és hideg üdítők) is biztosítunk, így a nap során minden kényelmedről gondoskodunk.


Egy nap, ami a nyaralás egyik legjobb élménye lesz:
• 1 snorkeling megálló
• 1,5 óra Orange Bay szigetén
• 1,5 óra Megawish Island szigetén
• Ebéd és italok a hajón
• Fehér homokos part és türkiz víz


A program sorrendje változhat az időjárástól és az aktuális helyzettől függően.


Az ár tartalmazza:
– Hotel–hotel transzfer
– Hajókirándulás
– 1 snorkeling megálló
– Teljes snorkeling felszerelés
– Ebéd a hajón
– Meleg és hideg üdítők


Az ár nem tartalmazza:
– Személyes költégek`,
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
    availability: 'Hétfő • Szerda • Szombat',
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
    duration: 'Transzfer kb. 14:00-kor',
    availability: 'Minden nap (délután)',
    fullDescription: `Rövid, családbarát program Hurghadában, ahol látványos delfin- és oroszlánfóka show-t nézhetsz meg.


A transzfer délután kb. 14:00-kor érkezik a szállodához.


Felvétel a szállodától, majd transzfer a delfináriumba.


A program során egy kb. 50 perces látványos show-t nézhetsz meg, ahol delfinek és oroszlánfókák mutatják be tudásukat.

A műsor után lehetőség van fotózásra vagy úszásra a delfinekkel (külön díj ellenében).


Ezután visszautazás a szállodába.


Egy különleges családi élmény:
• Delfin- és oroszlánfóka show
• Ideális családi program


Indulási idő:
– Déli turnus: kb. 14:00 (transzfer érkezése)


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
    id: 'hula-hula-sziget',
    name: 'Hula Hula Sziget – Karibi hangulat a Vörös-tengeren',
    category: 'tengeri',
    price: 35,
    image: '/images/hula-hula.jpg',
    tagline: 'Karibi hangulatú szigetpihenés snorkelinggel és vízi játékokkal a Vörös-tengeren.',
    duration: '08:00 – 17:00',
    availability: 'Minden nap',
    highlight: 'Snorkeling + Vízi játékok + Szigetpihenés',
    fullDescription: `Ha valódi kikapcsolódásra vágysz, távol a zsúfolt partoktól és a rohanós programoktól, a Hula Hula Sziget tökéletes választás. Ez a különleges kis sziget Hurghada közelében a „mezítlábas luxus" életérzést kínálja: természetes környezet, nyugodt atmoszféra és az a fajta szabadság, amit egy tengerparti nyaralástól igazán várunk.


A program kényelmes indulással kezdődik a szállodádtól, majd hajóra szállunk, és a Vörös-tenger türkiz vizén haladva közelítjük meg a szigetet. Már az út is élmény: napsütés, tengeri szellő és a végtelen kék horizont kísér végig.


Útközben egy sznorkelezési megálló vár, ahol testközelből fedezheted fel a Vörös-tenger híres, színes élővilágát. A korallzátonyok között úszva trópusi halak és kristálytiszta víz vesz körül.


A szigetre érkezve fehér homokos part, rendezett napágyak, árnyékos pihenők és barátságos, laza hangulat fogad. Itt nincs sietség – a napod a pihenésről szól. Fürödhetsz a sekély, átlátszó vízben, napozhatsz a parton, készíthetsz látványos fotókat a karibi hangulatú háttérrel, vagy egyszerűen csak élvezheted a csendet egy hűsítő ital társaságában.


A Hula Hula Sziget program nem az extrém kalandokról szól – hanem a minőségi kikapcsolódásról. Ideális pároknak, baráti társaságoknak és mindenkinek, aki szeretné egy napra teljesen elengedni a hétköznapokat.


Egy felejthetetlen élmény vár rád:
• 1 snorkeling megálló a korallzátonynál
• Vízi játékok a hajón
• Kb. 2 óra pihenés a szigeten
• Fehér homokos part és türkiz víz


A program sorrendje változhat.


Az ár tartalmazza:
– Légkondícionált transzfer oda-vissza
– Hajókirándulás
– Snorkeling felszerelés
– Vízi játékok
– Ebéd a hajón
– Hideg és meleg üdítők


Az ár nem tartalmazza:
– Személyes költégek`,
  },
  {
    id: 'vip-hula-hula',
    name: 'VIP Hula Hula – Prémium hajós kirándulás',
    category: 'tengeri',
    price: 50,
    childPrice: '5 éves kor alatt ingyenes',
    image: '/images/vip-hajo-2.jpg',
    gallery: [
      '/images/vip-hajo-2.jpg',
      '/images/vip-hajo-1.jpg',
      '/images/vip-hajo-belso-1.jpg',
      '/images/vip-hajo-belso-2.jpg',
    ],
    tagline: 'A Hula Hula sziget élménye nagyobb, kényelmesebb és luxusabb hajóval, ebéddel és snorkelinggel.',
    duration: '08:00 – 17:00',
    availability: 'Minden nap',
    highlight: 'Luxushajó + Snorkeling + Ebéd a hajón + 2 óra a szigeten',
    fullDescription: `Éld át a Hula Hula sziget programját VIP kivitelben, egy nagyobb, kényelmesebb és luxusabb hajó fedélzetén.


Reggel kb. 08:00 körül érkezik a transzfer a szállodádhoz, majd a kikötőbe viszünk. A tágas VIP hajón kényelmes belső terek és pihenőhelyek teszik még kellemesebbé az utazást.


Útközben snorkeling megálló vár, ahol felfedezheted a Vörös-tenger színes korallzátonyait és különleges élővilágát. A snorkeling felszerelést biztosítjuk.


A Hula Hula szigetre érkezve kb. 2 órád lesz fürdésre, napozásra, pihenésre és fotózásra a fehér homokos parton, a türkizkék víz mellett.


Az ebédet a hajón szolgálják fel, így kényelmes környezetben pihenhetsz és élvezheted a tengeri kilátást.


A VIP élmény részei:
• Nagyobb, luxusabb hajó
• Snorkeling megálló
• Teljes snorkeling felszerelés
• Ebéd a hajón
• Kb. 2 óra a Hula Hula szigeten


Délután visszaindulunk a kikötőbe, majd transzferrel visszaviszünk a szállodádba.


A program sorrendje változhat az időjárástól és az aktuális helyzettől függően.


Az ár tartalmazza:
– Hotel–hotel transzfer
– Prémium hajókirándulás
– Snorkeling megálló
– Snorkeling felszerelés
– Kb. 2 óra a Hula Hula szigeten
– Ebéd a hajón


Az ár nem tartalmazza:
– Személyes költések


Gyermekek:
– 5 éves kor alatt ingyenes`,
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
    price: 90,
    image: '/images/teknos-snorkeling.jpg',
    tagline: 'Snorkeling vadon élő teknősökkel a Vörös-tengerben – egy felejthetetlen élmény.',
    duration: '08:00 – 17:00',
    availability: 'Hétfő • Péntek',
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
  {
    id: 'eden-sziget',
    name: 'Eden Sziget – Instagram-kompatibilis paradicsom',
    category: 'tengeri',
    price: 75,
    image: '/images/eden-sziget.jpg',
    tagline: 'A Vörös-tenger legfotogénebb szigete – hinták, kilátópontok és türkiz víz.',
    duration: '08:00 – 16:00',
    availability: 'Minden nap',
    highlight: 'Snorkeling + Vízi játékok + Szigetpihenés + Fotózási lehetőségek',
    fullDescription: `Az Eden Sziget az egyik leglátványosabb és legfotogénebb partszakasz Hurghada közelében – egy igazi „nyári álom" a Vörös-tenger közepén. A sziget modern, laza hangulata és a gondosan kialakított strandrészek miatt különösen népszerű a fiatalos, élményközpontú utazók körében.


A program hajózással indul, útközben snorkelezési megállóval, ahol felfedezheted a Vörös-tenger gazdag élővilágát. A korallzátonyok és a színes halak látványa már önmagában különleges élményt nyújt, és tökéletes ráhangolódás a sziget hangulatára.


Az Eden Szigetre érkezve körülbelül 4 óra szabadidő áll rendelkezésedre, ami bőséges idő a teljes kikapcsolódásra. Fürödhetsz a sekély, kristálytiszta vízben, napozhatsz a fehér homokos parton, vagy elkészítheted azokat a bizonyos ikonikus fotókat a vízbe épített hintákon és kilátópontokon. A strand klubhangulata egyszerre nyugodt és vibráló – tökéletes kombinációja a pihenésnek és az élménynek.


Az ebéd és az üdítők a hajón biztosítottak, így a nap során minden adott a kényelmes, gondtalan kikapcsolódáshoz. Neked csak annyi a dolgod, hogy élvezd a napsütést, a tengert és azt a különleges atmoszférát, ami miatt az Eden Sziget az egyik legtrendibb választás a térségben.


Ez a program ideális baráti társaságoknak, pároknak, de bárkinek, aki egy stílusos, mégis természetközeli tengeri élményre vágyik.


Egy látványos nap vár rád:
• 1 snorkeling megálló a korallzátonynál
• 1 megálló vízi játékokra
• Kb. 2 óra pihenés a szigeten
• Vízbe épített hinták és kilátópontok
• Fehér homokos part és kristálytiszta víz


A program sorrendje változhat.


Az ár tartalmazza:
– Légkondícionált transzfer oda-vissza
– Hajókirándulás
– Snorkeling felszerelés
– Ebéd és üdítők a hajón
– Vízi játékok


Az ár nem tartalmazza:
– Személyes költégek`,
  },

  {
    id: 'orange-bay-plus',
    name: 'ORANGE BAY PLUS – Hajós kirándulás + Batiskaf',
    category: 'tengeri',
    price: 45,
    image: '/images/orange-bay-plus.jpg',
    tagline: 'Különleges egész napos tengeri program, amely az Orange Bay sziget élményét egy 45 perces batiskaf (félig tengeralattjáró) kirándulással és snorkelinggel kombinálja.',
    duration: '09:00 – 17:00',
    availability: 'Hétfő • Szerda • Szombat',
    highlight: '45 perc batiskaf + 3 óra Orange Bay + snorkeling + ebéd',
    fullDescription: `Orange Bay Plus – egy programban több vörös-tengeri élmény! 🏝️🐠


A program során hajóval indulunk a Vörös-tengerre, ahol egy különleges 45 perces batiskaf (félig tengeralattjáró) programon is részt vesztek. A víz alatti panorámaablakokon keresztül szárazon ülve figyelhetitek meg a Vörös-tenger színes élővilágát és koralljait.


Ezután az Orange Bay szigetre látogatunk, ahol körülbelül 3 órát tölthettek a gyönyörű homokos parton. Lesz idő fürdésre, pihenésre, napozásra és a sziget felfedezésére.


Az ebédet a szigeten, svédasztalos formában szolgálják fel.


A program része továbbá 1 snorkeling megálló egy korallzátonynál, ahol maszkkal és pipával fedezhetitek fel a Vörös-tenger víz alatti világát.


A program tartalmazza:
🚐 Hoteltől hotelig transzfer
🚢 Hajókirándulás
🟡 45 perces batiskaf (félig tengeralattjáró) program
🏝️ Kb. 3 óra az Orange Bay szigeten
🍽️ Svédasztalos ebéd a szigeten
🤿 1 snorkeling megálló korallzátonynál
🤿 Snorkeling felszerelés
🥤 Üdítő és víz


Ár: 45 € / fő


A program sorrendje változhat.


Az ár tartalmazza:
– Hotel–hotel transzfer
– Hajókirándulás
– 45 perces batiskaf program
– Kb. 3 óra az Orange Bay szigeten
– Svédasztalos ebéd a szigeten
– 1 snorkeling megálló korallzátonynál
– Snorkeling felszerelés
– Üdítő és víz`,
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

export const WHATSAPP_NUMBER = '+36206185741';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61571060835253';