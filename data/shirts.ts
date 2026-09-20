export type Winner = {
  name: string;
  country: string;
  time?: string;
};

export type ShirtYear = {
  year: number;
  /** Descripción del diseño/color de la camiseta oficial de ese año, cuando se conoce. */
  design?: string;
  /** Color principal (torso) de la camiseta (hex), usado para pintarla en el vestidor mientras no tengas foto propia. */
  color?: string;
  /** Color de las mangas, cuando difiere del torso (p.ej. camiseta blanca con mangas azul marino). */
  sleeveColor?: string;
  sponsor?: string;
  menWinner?: Winner;
  womenWinner?: Winner;
  notes?: string;
};

/**
 * Palmarés y diseños de camiseta de la San Silvestre Vallecana.
 * Ganadores y tiempos: Wikipedia / prensa deportiva española.
 * Diseños 2010-2022: recopilados de un repaso de Flashscore sobre las camisetas de la carrera.
 * Los años sin campo `design` no tienen diseño documentado todavía: sube tu foto y añádelo aquí.
 */
export const SHIRTS: ShirtYear[] = [
  {
    year: 2025,
    menWinner: { name: "Geoffrey Kamworor", country: "Kenia", time: "27:40" },
    womenWinner: { name: "Marta García", country: "España", time: "31:11" },
    notes: "Marta García logra el doblete consecutivo y bate el récord nacional.",
  },
  {
    year: 2024,
    menWinner: { name: "Berihu Aregawi", country: "Etiopía", time: "26:32" },
    womenWinner: { name: "Marta García", country: "España", time: "31:19" },
    notes: "26:32 de Aregawi es el récord masculino vigente del circuito.",
  },
  {
    year: 2023,
    menWinner: { name: "Berihu Aregawi", country: "Etiopía", time: "27:15" },
    womenWinner: { name: "Ababel Yeshaneh", country: "Etiopía", time: "30:30" },
  },
  {
    year: 2022,
    design:
      "Azul marino con letras en naranja y blanco formando un dibujo de árbol de Navidad. Versión internacional y popular idénticas.",
    color: "#1e2a4a",
    sponsor: "OYSHO",
    menWinner: { name: "Joshua Cheptegei", country: "Uganda", time: "27:09" },
    womenWinner: { name: "Prisca Chesang", country: "Uganda", time: "30:19" },
  },
  {
    year: 2021,
    design:
      'Beige con degradado a verde aguamarina en mangas y bajo, e ilustración de la Puerta de Alcalá con el lema "Volvemos". Primer año con OYSHO como patrocinador técnico tras la pandemia.',
    color: "#cfc6b3",
    sponsor: "OYSHO",
    menWinner: { name: "Mohamed Katir", country: "España", time: "27:45" },
    womenWinner: { name: "Degitu Azimeraw", country: "Etiopía", time: "30:26" },
    notes: "Katir es el primer ganador español en 20 años.",
  },
  {
    year: 2020,
    design:
      'Roja con el mensaje "Good Bye 2020!" y el lema "Vallecana solo hay una". Última edición con Nike como patrocinador; carrera disputada en formato virtual por la pandemia.',
    color: "#901208",
    sponsor: "Nike",
    menWinner: { name: "Daniel Simiu Ebenyo", country: "Kenia", time: "27:41" },
    womenWinner: { name: "Yalemzerf Yehualaw", country: "Etiopía", time: "31:17" },
  },
  {
    year: 2019,
    design:
      'Verde con gráfico de fuegos artificiales. La versión internacional (Nike) incorporaba números y letras a gran escala.',
    color: "#3c8f5c",
    sponsor: "Nike",
    menWinner: { name: "Bashir Abdi", country: "Bélgica", time: "27:47" },
    womenWinner: { name: "Helen Bekele Tola", country: "Etiopía", time: "30:50" },
    notes: "La carrera obtiene el sello IAAF Gold Label.",
  },
  {
    year: 2018,
    design:
      'Negra con estética "cibernética": mapa de puntos futurista, "31D" en el pecho y el lema "We Fly Madrid" en la versión internacional.',
    color: "#1c1c1e",
    sponsor: "Nike",
    menWinner: { name: "Jacob Kiplimo", country: "Uganda", time: "26:41" },
    womenWinner: { name: "Brigid Kosgei", country: "Kenia", time: "29:54" },
    notes: "Kiplimo, con 18 años, y Kosgei firman los récords del circuito (aún vigente el femenino).",
  },
  {
    year: 2017,
    design:
      'Azul cielo. La versión Sub-25 llevaba una cabeza de lobo, el año de fundación "1964" y el lema "Forever Stronger".',
    color: "#6fb7e0",
    sponsor: "Nike",
    menWinner: { name: "Erick Kiptanui", country: "Kenia", time: "27:34" },
    womenWinner: { name: "Gelete Burka", country: "Etiopía", time: "30:55" },
  },
  {
    year: 2016,
    design: 'Blanca con el "2016" marcado en grande sobre el abdomen.',
    color: "#f2f2ee",
    sponsor: "Nike",
    menWinner: { name: "Nguse Tesfaldet", country: "Eritrea", time: "28:09" },
    womenWinner: { name: "Brigid Kosgei", country: "Kenia", time: "32:07" },
  },
  {
    year: 2015,
    design:
      "Naranja, con el dorsal trasladado a la manga. Debut de Nationale-Nederlanden como patrocinador principal de la carrera.",
    color: "#f2872e",
    sponsor: "Nike",
    menWinner: { name: "Mike Kigen", country: "Kenia", time: "27:35" },
    womenWinner: { name: "Linet Masai", country: "Kenia", time: "31:38" },
  },
  {
    year: 2014,
    design: "Amarillo flúor con bandas reflectantes plateadas y dorsal de gran tamaño.",
    color: "#e8e23c",
    sponsor: "Nike",
    menWinner: { name: "Mike Kigen", country: "Kenia", time: "27:51" },
    womenWinner: { name: "Gemma Steel", country: "Reino Unido", time: "31:52" },
  },
  {
    year: 2013,
    design: 'Roja intensa con la cabeza del oso, símbolo de Madrid, y el lema "We Run".',
    color: "#c62828",
    sponsor: "Nike",
    menWinner: { name: "Leonard Komon", country: "Kenia", time: "28:02" },
    womenWinner: { name: "Linet Masai", country: "Kenia", time: "31:33" },
  },
  {
    year: 2012,
    design: 'Naranja eléctrico con un gran rayo y el lema "We Run Mad". Año de máxima participación (~40.000 corredores).',
    color: "#ff7a1a",
    sponsor: "Nike",
    menWinner: { name: "Tariku Bekele", country: "Etiopía", time: "28:29" },
    womenWinner: { name: "Gelete Burka", country: "Etiopía", time: "30:53" },
  },
  {
    year: 2011,
    design: "Blanca con mangas azul marino, diseño casi idéntico al de 2010.",
    color: "#f2f2ee",
    sleeveColor: "#1e2a4a",
    sponsor: "Nike",
    menWinner: { name: "Hagos Gebrhiwet", country: "Etiopía", time: "27:57" },
    womenWinner: { name: "Tirunesh Dibaba", country: "Etiopía", time: "31:30" },
  },
  {
    year: 2010,
    design: 'Turquesa con mangas raglán negras, "San Silvestre Vallecana 31.12.10" estampado en el pecho.',
    color: "#12909f",
    sleeveColor: "#1c1c1e",
    sponsor: "Nike",
    menWinner: { name: "Zersenay Tadese", country: "Eritrea", time: "28:27" },
    womenWinner: { name: "Jéssica Augusto", country: "Portugal", time: "31:59" },
  },
  {
    year: 2009,
    menWinner: { name: "Moses Masai", country: "Kenia", time: "28:01" },
    womenWinner: { name: "Vivian Cheruiyot", country: "Kenia", time: "32:15" },
  },
  {
    year: 2008,
    menWinner: { name: "Tadese Tola", country: "Etiopía", time: "27:53" },
    womenWinner: { name: "Marta Domínguez", country: "España", time: "33:05" },
    notes: "Última victoria española (categoría femenina) hasta 2024.",
  },
  {
    year: 2007,
    menWinner: { name: "Josphat Menjo", country: "Kenia", time: "28:35" },
    womenWinner: { name: "Vivian Cheruiyot", country: "Kenia", time: "31:50" },
  },
  {
    year: 2006,
    menWinner: { name: "Eliud Kipchoge", country: "Kenia", time: "26:54" },
    womenWinner: { name: "Jeļena Prokopčuka", country: "Letonia", time: "31:27" },
    notes: "Récord del mundo en ruta de los 10K en su momento.",
  },
  {
    year: 2005,
    menWinner: { name: "Eliud Kipchoge", country: "Kenia", time: "27:34" },
    womenWinner: { name: "Paula Radcliffe", country: "Reino Unido", time: "31:16" },
  },
  {
    year: 2004,
    menWinner: { name: "Craig Mottram", country: "Australia", time: "28:18" },
    womenWinner: { name: "Benita Johnson", country: "Australia", time: "32:36" },
  },
  {
    year: 2003,
    menWinner: { name: "José Manuel \"Chema\" Martínez", country: "España", time: "28:12" },
    womenWinner: { name: "Marta Domínguez", country: "España", time: "31:35" },
    notes: "Última victoria española (categoría masculina) hasta 2021.",
  },
  {
    year: 2002,
    menWinner: { name: "Isaac Viciosa", country: "España", time: "28:07" },
    womenWinner: { name: "Marta Domínguez", country: "España", time: "32:13" },
    notes: "Primer año con dorsales numerados para todos los participantes.",
  },
  {
    year: 2001,
    menWinner: { name: "Isaac Viciosa", country: "España", time: "28:32" },
    womenWinner: { name: "María Abel", country: "España", time: "32:53" },
  },
  {
    year: 2000,
    menWinner: { name: "Isaac Viciosa", country: "España", time: "28:45" },
    womenWinner: { name: "Patricia Arribas", country: "España", time: "32:22" },
  },
  {
    year: 1999,
    menWinner: { name: "Jon Brown", country: "Reino Unido", time: "28:08" },
    womenWinner: { name: "Tereza Yohannes", country: "Etiopía", time: "32:50" },
  },
  {
    year: 1998,
    menWinner: { name: "Fabián Roncero", country: "España", time: "29:13" },
    womenWinner: { name: "Patricia Arribas", country: "España" },
  },
];

/** Hitos anteriores a 1998, sin tiempos oficiales homologados en los 10K. */
export const EARLY_HISTORY = [
  { year: 1964, text: 'Primera edición: Jesús Hurtado y María Luisa Ares ganan ante solo 57 corredores.' },
  { year: 1969, text: '"El año en blanco": la carrera se cancela por la crisis económica.' },
  { year: 1979, text: "Carlos Lopes (Portugal) gana la edición masculina." },
  { year: 1981, text: "Primera participación femenina oficial: gana la noruega Grete Waitz." },
];
