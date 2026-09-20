/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import type { Program } from '@/data/programs'

export type Language = 'hu' | 'en'

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'hu', setLanguage: () => undefined })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('hurghada-language') === 'en' ? 'en' : 'hu')
  useEffect(() => {
    localStorage.setItem('hurghada-language', language)
    document.documentElement.lang = language
  }, [language])
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)

const englishNames: Record<string, string> = {
  'luxor-kiralyok-volgye': 'Luxor – Valley of the Kings', 'kairo-piramisok-szfinx': 'Cairo – Pyramids, Sphinx & Old Museum',
  'kairo-gem': 'Cairo – Pyramids & Grand Egyptian Museum', 'orange-bay': 'Orange Bay Boat Trip',
  'vip-orange-bay': 'VIP Orange Bay – Premium Boat Trip', 'orange-bay-megawish': 'Orange Bay & Megawish Island',
  buvarkirandulas: 'Scuba Diving Trip', 'dolphin-house': 'Dolphin House Boat Trip', dolphinarium: 'Dolphinarium Show',
  'paradise-island': 'Paradise Island Boat Trip', 'el-gouna': 'El Gouna – Lagoons & Boat Trip', parasailing: 'Parasailing',
  'quad-safari': 'Quad Safari', 'super-safari': 'Super Safari – Full Desert Adventure', 'jeep-safari': 'Jeep Safari',
  batiskaf: 'Semi-Submarine & Snorkelling', lovaglas: 'Horse Riding & Sea Swim', torokfurdo: 'Turkish Bath & Cleopatra Spa',
  'hula-hula-sziget': 'Hula Hula Island', 'vip-hula-hula': 'VIP Hula Hula – Premium Boat Trip',
  'mahmya-island': 'Mahmya Island – All Inclusive', 'makadi-aquapark': 'Makadi Water World Aqua Park',
  'grand-aquarium': 'Grand Aquarium & Zoo', 'snorkeling-teknosokkel': 'Snorkelling with Turtles',
  'eden-sziget': 'Eden Island', 'orange-bay-plus': 'Orange Bay Plus – Boat Trip & Semi-Submarine',
}

const englishTaglines: Record<string, string> = {
  'luxor-kiralyok-volgye': 'Discover Karnak Temple, the Nile and the Valley of the Kings on a full-day trip from Hurghada.',
  'kairo-piramisok-szfinx': 'See the Pyramids of Giza, the Sphinx and the treasures of the Egyptian Museum in one unforgettable day.',
  'kairo-gem': 'A premium Cairo experience with the Pyramids, Sphinx and the spectacular Grand Egyptian Museum.',
  'orange-bay': 'A relaxing Red Sea boat trip with snorkelling and time on Orange Bay’s white-sand beach.',
  'vip-orange-bay': 'A more comfortable Orange Bay experience with premium service and a relaxed schedule.',
  'orange-bay-megawish': 'Visit two beautiful islands in one day, with snorkelling, lunch and drinks included.',
  buvarkirandulas: 'Try scuba diving in the crystal-clear Red Sea with professional guidance and no previous experience required.',
  'dolphin-house': 'Cruise to the Dolphin House area for snorkelling and a chance to see wild dolphins.',
  dolphinarium: 'A family-friendly dolphin and sea lion show with hotel transfer included.',
  'paradise-island': 'A full-day island escape with white sand, turquoise water and snorkelling stops.',
  'el-gouna': 'Explore the lagoons and charming atmosphere of El Gouna by boat.', parasailing: 'Fly above the Red Sea and enjoy breathtaking coastal views.',
  'quad-safari': 'Ride a quad through the desert and visit a Bedouin village.', 'super-safari': 'Quad, buggy, jeep, camel ride, sunset, dinner and show in one adventure.',
  'jeep-safari': 'Discover the desert by 4x4 and experience Bedouin hospitality.', batiskaf: 'See the underwater world through panoramic windows and enjoy a snorkelling stop.',
  lovaglas: 'Ride along the beach and enjoy a unique swim in the sea with your horse.', torokfurdo: 'Relax with sauna, steam, hammam, peeling and massage treatments.',
  'hula-hula-sziget': 'Caribbean-style island relaxation in the middle of the Red Sea.', 'vip-hula-hula': 'A premium Hula Hula island day with extra comfort and service.',
  'mahmya-island': 'An all-inclusive day on one of the Red Sea’s most exclusive beaches.', 'makadi-aquapark': 'A fun-filled day with slides, pools and attractions for the whole family.',
  'grand-aquarium': 'Discover Red Sea marine life and visit the zoo in one family programme.', 'snorkeling-teknosokkel': 'Snorkel in a protected bay known for sea turtles and colourful marine life.',
  'eden-sziget': 'A stylish island escape with beautiful photo spots and turquoise water.', 'orange-bay-plus': 'Combine Orange Bay with a semi-submarine experience in one day.',
}

const categoryHighlights: Record<Program['category'], string> = {
  tengeri: 'Hotel transfer • Boat trip • Red Sea experience', sivatagi: 'Hotel transfer • Desert adventure • Local experience',
  varosnezes: 'Hotel transfer • Main sights • Guided programme', csaldi: 'Hotel transfer • Family-friendly experience',
}

export function localizeProgram(program: Program, language: Language): Program {
  if (language === 'hu') return program
  const isCairoLuxor = program.category === 'varosnezes'
  const fullDescription = `${englishTaglines[program.id] ?? 'Enjoy a carefully organised excursion from Hurghada with hotel pick-up and return transfer.'}\n\nWhat is included:\n– Hotel pick-up and return transfer\n– The activities and services listed for this programme\n– Local assistance during the excursion\n\nImportant information:\n– The exact pick-up time is sent on the evening before the programme\n– The order of activities may change due to weather or local conditions\n– Personal expenses and optional extras are not included\n\nChildren:\n– Child discounts or free places depend on age and the selected programme. Please send the children’s ages on WhatsApp before booking.`
  return {
    ...program,
    name: englishNames[program.id] ?? program.name,
    tagline: englishTaglines[program.id] ?? 'A well-organised Hurghada experience with hotel transfer included.',
    highlight: categoryHighlights[program.category],
    duration: program.duration.replace('Kb.', 'Approx.').replace('Minden nap', 'Every day').replace('Indulás', 'Departure').replace('Visszaérkezés', 'Return'),
    availability: program.availability.replace('Minden nap', 'Every day').replace('Naponta', 'Daily').replace('Hétfő', 'Monday').replace('Szerda', 'Wednesday').replace('Péntek', 'Friday').replace('Szombat', 'Saturday').replace('reggel', 'morning').replace('délután', 'afternoon'),
    guideInfo: isCairoLuxor ? 'English-speaking guide\nHungarian guide available for private groups of more than 15 guests' : program.guideInfo,
    fullDescription,
    childPrice: program.childPrice?.replace('év', 'years'),
  }
}
