export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'korallbarat-naptej-hurghadaban',
    title: 'Miért fontos a korallbarát naptej Hurghadában?',
    excerpt: 'A nyaralás nemcsak a pihenésről szól – vigyázz a Vörös-tenger élővilágára a megfelelő naptej választásával.',
    coverImage: '/images/blog-korall-naptej.jpg',
    content: `A nyaralás nemcsak a pihenésről szól, hanem arról is, hogy vigyázzunk arra a környezetre, ahol éppen vagyunk. Hurghada környékén a Vörös-tenger élővilága különösen érzékeny, ezért nagyon fontos, hogy milyen naptejet használunk.

Sokan nem tudják, de bizonyos naptejek olyan anyagokat tartalmaznak, amelyek károsíthatják a korallokat és a tengeri élőlényeket. Ezért érdemes tudatosan választani.

Mire figyelj naptej választáskor?

– Ne tartalmazzon oxybenzone-t vagy octocrylene-t
– Kerüld a mikroműanyagot tartalmazó termékeket
– Ha lehet, válassz fizikai fényvédőt

A korallbarát naptejek nemcsak a környezetet védik, hanem a bőrödnek is jobbak lehetnek, főleg érzékeny bőr esetén.

Alternatív megoldás:

Sznorkelezéshez ajánlott UV-védős pólót viselni, ami csökkenti a naptej használatát és védi a bőrt is.

Egy kis odafigyeléssel te is hozzájárulhatsz ahhoz, hogy a tengeri élővilág sokáig megmaradjon.`,
  },
  {
    slug: 'idojaras-hurghadaban',
    title: 'Időjárás Hurghadában – mikor érdemes utazni?',
    excerpt: 'Sokan kérdezik, hogy mikor a legjobb idő Hurghadába utazni. A válasz egyszerű: szinte egész évben.',
    coverImage: '/images/blog-idojaras.jpg',
    content: `Sokan kérdezik, hogy mikor a legjobb idő Hurghadába utazni. A válasz egyszerű: szinte egész évben.

Téli hónapok:

– nappal 20–30°C
– este hűvösebb lehet
– szelesebb idő előfordul

Nyár:

– nagyon meleg (35–40°C)
– szinte mindig napsütés

Ami fontos:

– eső nagyon ritka
– a nap szinte mindig süt
– a szél befolyásolja a hőérzetet

Tenger hőmérséklet:

– télen sem megy 20°C alá
– nyáron nagyon kellemes

Összességében:

Hurghada egész évben jó választás, csak az számít, hogy mennyire szereted a meleget.`,
  },
  {
    slug: 'idojaras-egyiptomban',
    title: 'Milyen az időjárás Egyiptomban?',
    excerpt: 'Mikor érdemes utazni Hurghadába? Minden évszak előnyeit és hátrányait összegyűjtöttük.',
    coverImage: '/images/blog-weather.jpg',
    content: `Egyiptom egész évben napos, ezért szinte bármikor ideális úti cél. Hurghadában nagyon kevés az eső, a napsütés viszont garantált.

Nyáron (június–augusztus) nagyon meleg van, gyakran 35–40 fok fölött. Ez főleg azoknak ideális, akik szeretik a forróságot és a tengerpartot.

Tavasszal és ősszel (március–május, szeptember–november) a legkellemesebb az idő. Ilyenkor nincs extrém hőség, mégis tökéletes a strandoláshoz és kirándulásokhoz.

Télen (december–február) nappal 20–25 fok körül van, estére viszont lehűlhet. Ez az időszak ideális városnézéshez és programokhoz.

Ha a tökéletes egyensúlyt keresed, akkor a tavasz és az ősz a legjobb választás.`,
  },
  {
    slug: 'sim-kartya-egyiptomban',
    title: 'SIM kártya Egyiptomban',
    excerpt: 'Hogyan legyen mobilneted Hurghadában gyorsan és olcsón? Tippek az internet használathoz.',
    coverImage: '/images/blog-sim.jpg',
    content: `Egyiptomban a mobilinternet könnyen elérhető, és érdemes is használni, főleg ha programokra mész vagy navigáció kell.

A reptéren már lehet SIM kártyát vásárolni, de sokszor drágább. Jobb megoldás, ha városban veszed meg hivatalos szolgáltatónál (pl. Vodafone, Orange).

Általában pár euróért kapsz több gigabájtos csomagot, ami bőven elég egy nyaralásra.

Fontos:
– mindig kérd meg az eladót, hogy aktiválja
– ellenőrizd, hogy működik-e

Alternatíva:
Használhatsz eSIM-et is, ha a telefonod támogatja.

Összességében a helyi SIM a legegyszerűbb és legolcsóbb megoldás.`,
  },
  {
    slug: 'borravalo-egyiptomban',
    title: 'Borravaló Egyiptomban',
    excerpt: 'Mennyit illik adni? Segítünk eligazodni a baksis világában.',
    coverImage: '/images/blog-tips.jpg',
    content: `Egyiptomban a borravaló a mindennapok része, és szinte minden szolgáltatásnál szokás adni.

Ez nem kötelező, de elvárt, és a helyiek nagy része ebből él.

Általános irány:
– kisebb szolgáltatás: 1–2€
– idegenvezető / sofőr: 5–10€
– étterem: 5–10%

Fontos:
Mindig apró pénzzel készülj.

Ne érezd kötelezőnek, de ha elégedett vagy, érdemes adni – sokat jelent nekik.

Ez Egyiptomban a tisztelet jele.`,
  },
];
