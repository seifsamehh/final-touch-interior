export const LANGS = ["en", "ar"] as const;
export type Lang = (typeof LANGS)[number];
/** Numbers as each language writes them: 1 2 3 or ١ ٢ ٣. */
export const num = (n: number, lang: Lang, pad = 1) => n.toLocaleString(lang === "ar" ? "ar-EG" : "en", { minimumIntegerDigits: pad, useGrouping: false });
export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

type Both = Record<Lang, string>;
export type Photo = { src: string; w: number; h: number; alt: Both };
export type Service = {
  slug: string;
  name: Both;
  /** Short line under the name. */
  line: Both;
  /** Opening paragraph of the field page. Draft: to be confirmed with the owner. */
  intro: Both;
  /** How many of the photos hang on the home gallery wall (taken from the start of the list). */
  wall: number;
  photos: Photo[];
};

const p = (path: string, w: number, h: number, en: string, ar: string): Photo => ({ src: `/work/${path}.webp`, w, h, alt: { en, ar } });

export const services: Service[] = [
  {
    slug: "residential",
    name: { en: "Residential", ar: "سكني" },
    line: { en: "Homes, villas and apartments", ar: "منازل وفيلات وشقق" },
    intro: {
      en: "Reception rooms, dining rooms and bedrooms. Each one is designed in 3D first, then finished by our own crews.",
      ar: "غرف استقبال وطعام ونوم. نصمّم كل غرفة بالأبعاد الثلاثية أولًا، ثم تنفّذها فِرَقنا.",
    },
    wall: 5,
    photos: [
      p("residential/res-2", 720, 474, "Living room with burgundy sofas and a coffered ceiling", "غرفة معيشة بكنب عنّابي وسقف بتقسيمات جبسية"),
      p("residential/res-10", 1050, 700, "Living room with a grey marble floor and blue velvet chairs", "غرفة معيشة بأرضية رخام رمادي وكراسي قطيفة زرقاء"),
      p("residential/res-8", 970, 719, "Villa exterior with a curved roof at dusk", "واجهة فيلا بسقف منحنٍ وقت الغروب"),
      p("residential/res-14", 1280, 836, "Bedroom with a padded wall and pendant lamps", "غرفة نوم بحائط مبطّن ومصابيح معلّقة"),
      p("residential/res-12", 1050, 700, "Reception room with mirrored panels", "غرفة استقبال بألواح مرايا"),
      p("residential/res-1", 647, 540, "Dining room with panelled walls, a coffered ceiling and burgundy chairs", "غرفة طعام بحوائط مكسوّة وسقف بتقسيمات وكراسي عنّابية"),
      p("residential/res-4", 720, 474, "Finished living and dining room with burgundy chairs", "غرفة معيشة وطعام بعد التشطيب بكراسي عنّابية"),
      p("residential/res-11", 1050, 700, "3D render of a living room with a coffered ceiling", "منظور ثلاثي الأبعاد لغرفة معيشة بسقف بتقسيمات"),
      p("residential/res-13", 1050, 700, "Reception room with a patterned feature wall", "غرفة استقبال بحائط مزخرف"),
      p("residential/res-9", 957, 720, "Villa courtyard and pool seen from above at night", "فناء فيلا وحمام سباحة من أعلى ليلًا"),
      p("residential/res-15", 1280, 843, "Bedroom with a dressing table and an open wardrobe", "غرفة نوم بتسريحة ودولاب مفتوح"),
      p("residential/res-16", 1280, 835, "Dressing area with open wardrobes", "ركن ملابس بدواليب مفتوحة"),
    ],
  },
  {
    slug: "commercial",
    name: { en: "Commercial", ar: "تجاري" },
    line: { en: "Shops, bakeries and showrooms", ar: "محلات ومخابز ومعارض" },
    intro: {
      en: "The counter, the shelving, the seating and the shopfront, designed together as one place.",
      ar: "الكاونتر والأرفف والجلسات والواجهة، تُصمَّم معًا كمكان واحد.",
    },
    wall: 4,
    photos: [
      p("commercial/com-7", 720, 468, "Bakery counter with timber shelving", "كاونتر مخبز بأرفف خشبية"),
      p("commercial/com-13", 720, 450, "Bakery seating area with leaf wallpaper", "جلسة في مخبز بورق حائط نباتي"),
      p("commercial/com-11", 720, 720, "Bakery interior with a logo wall", "مخبز من الداخل بحائط يحمل الشعار"),
      p("commercial/com-14", 720, 316, "Bakery shopfront", "واجهة المخبز"),
      p("commercial/com-12", 720, 720, "Bread baskets on the wall beside the shelves", "سلال خبز على الحائط بجوار الأرفف"),
      p("commercial/com-4", 720, 960, "Bench seating with blue chairs", "جلسة بمقاعد طويلة وكراسي زرقاء"),
      p("commercial/com-5", 720, 811, "Service counter with bar stools", "كاونتر الخدمة بمقاعد مرتفعة"),
      p("commercial/com-10", 720, 674, "Seating nook under the logo wall", "ركن جلوس تحت حائط الشعار"),
      p("commercial/com-9", 720, 811, "Counter with pastries and coffee", "كاونتر عليه مخبوزات وقهوة"),
      p("commercial/com-1", 570, 800, "Long view of the seating area", "منظر طولي لمنطقة الجلوس"),
      p("commercial/com-15", 720, 960, "Shop window with bread baskets", "فاترينة المحل بسلال الخبز"),
    ],
  },
  {
    slug: "hotel",
    name: { en: "Hotel", ar: "فندقي" },
    line: { en: "Hotels and resort buildings", ar: "فنادق ومبانٍ سياحية" },
    intro: {
      en: "Resort and hotel buildings, from the facade to the rooms.",
      ar: "مبانٍ فندقية وسياحية، من الواجهة إلى الغرف.",
    },
    wall: 1,
    photos: [p("hotel/hotel-2", 1484, 1113, "Render of a resort residential building in Hurghada", "منظور لمبنى سكني سياحي في الغردقة")],
  },
  {
    slug: "administrative",
    name: { en: "Administrative", ar: "إداري" },
    line: { en: "Offices and exhibition stands", ar: "مكاتب وأجنحة معارض" },
    intro: {
      en: "Reception, meeting space and display, drawn and built to the brief.",
      ar: "استقبال ومساحات اجتماع وعرض، تُرسم وتُنفَّذ حسب المطلوب.",
    },
    wall: 4,
    photos: [
      p("administrative/admin-12", 1150, 593, "Exhibition stand with a video wall and timber slats", "جناح معرض بشاشة عرض وشرائح خشبية"),
      p("administrative/admin-8", 1152, 580, "Exhibition stand with a model table and a green wall", "جناح معرض بطاولة ماكيت وحائط أخضر"),
      p("administrative/admin-15", 1153, 592, "Exhibition stand seen from the aisle", "جناح المعرض من الممر"),
      p("administrative/admin-7", 1152, 588, "Exhibition stand from above", "جناح المعرض من أعلى"),
      p("administrative/admin-9", 1158, 598, "Slat wall with a shelving grid", "حائط شرائح خشبية بأرفف شبكية"),
      p("administrative/admin-11", 1158, 587, "Video wall beside the slat wall", "شاشة العرض بجوار حائط الشرائح"),
      p("administrative/admin-10", 1155, 595, "Seating beside a tree inside the stand", "جلسة بجوار شجرة داخل الجناح"),
      p("administrative/admin-13", 1163, 588, "Meeting chairs under the tree", "كراسي اجتماع تحت الشجرة"),
      p("administrative/admin-14", 1153, 581, "Reception counter of the stand", "كاونتر استقبال الجناح"),
    ],
  },
  {
    slug: "landscape",
    name: { en: "Landscape", ar: "لاندسكيب" },
    line: { en: "Gardens, roofs and pools", ar: "حدائق وأسطح وحمامات سباحة" },
    intro: {
      en: "Pergolas, seating and planting that turn an empty roof into a place to sit.",
      ar: "برجولات وجلسات ونباتات تحوّل السطح الخالي إلى مكان للجلوس.",
    },
    wall: 4,
    photos: [
      p("landscape/land-17", 1194, 671, "Roof terrace with a pergola and seating", "سطح ببرجولة وجلسة"),
      p("landscape/land-12", 1194, 625, "Roof terrace with hanging chairs", "سطح بكراسي معلّقة"),
      p("landscape/land-21", 1193, 639, "Shaded roof seating with timber screens", "جلسة مظلّلة على السطح بسواتر خشبية"),
      p("landscape/land-20", 1196, 644, "Roof garden with pergolas", "حديقة سطح ببرجولات"),
      p("landscape/land-11", 1191, 667, "Roof dining table under an umbrella", "طاولة طعام على السطح تحت مظلة"),
      p("landscape/land-13", 1193, 667, "Roof bar counter", "بار على السطح"),
      p("landscape/land-18", 1191, 642, "Roof garden with planters and pergolas", "حديقة سطح بأحواض زرع وبرجولات"),
      p("landscape/land-22", 1199, 639, "Hanging chairs beside a sofa", "كراسي معلّقة بجوار كنبة"),
      p("landscape/land-24", 1194, 632, "Roof garden seen from the corner", "حديقة السطح من الركن"),
      p("landscape/land-3", 720, 540, "Pool with a glass wall", "حمام سباحة بجدار زجاجي"),
      p("landscape/land-1", 2048, 1153, "Pool with fountain jets", "حمام سباحة بنوافير"),
    ],
  },
  {
    slug: "furniture",
    name: { en: "Furniture", ar: "أثاث" },
    line: { en: "Built in our workshop", ar: "يُصنع في ورشتنا" },
    intro: {
      en: "Sofas, cabinets, kitchens and beds, made to the drawing before upholstery and paint.",
      ar: "كنب ودواليب ومطابخ وأسرّة، تُنفَّذ حسب الرسم قبل التنجيد والدهان.",
    },
    wall: 4,
    photos: [
      p("furniture/furn-12", 450, 600, "Curved sofa frame in raw timber", "هيكل كنبة منحنية من الخشب الخام"),
      p("furniture/furn-24", 574, 473, "Corner library units in raw wood", "مكتبة ركنية من الخشب الخام"),
      p("furniture/furn-23", 736, 981, "Carved corner cabinet before paint", "دولاب ركني منحوت قبل الدهان"),
      p("furniture/furn-18", 600, 900, "Painted classic cabinet", "دولاب كلاسيكي بعد الدهان"),
      p("furniture/furn-40", 736, 552, "Curved sofa frame in raw timber on the workshop floor", "هيكل كنبة منحنية على أرض الورشة"),
      p("furniture/furn-25", 735, 490, "Unpainted kitchen units standing in the workshop", "وحدات مطبخ قبل الدهان في الورشة"),
      p("furniture/furn-41", 474, 316, "Carved sofa frame on a workbench", "هيكل كنبة منحوت على طاولة العمل"),
      p("furniture/furn-26", 735, 490, "Cabinet units being built in the workshop", "وحدات دواليب أثناء التصنيع في الورشة"),
      p("furniture/furn-45", 774, 1032, "Bed frame parts in the workshop", "أجزاء هيكل سرير في الورشة"),
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** One photo by file name, for the places that show a specific picture. */
export function photo(name: string): Photo {
  const hit = services.flatMap((s) => s.photos).find((x) => x.src.endsWith(`/${name}.webp`));
  if (!hit) throw new Error(`Unknown photo: ${name}`);
  return hit;
}

export const planPhoto: Photo = p("process/plan", 1125, 844, "3D floor plan of an apartment", "مسقط ثلاثي الأبعاد لشقة");
