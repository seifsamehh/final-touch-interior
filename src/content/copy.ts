import { num, type Lang } from "./services";

const en = {
  meta: {
    title: "Final Touch | Interior Design & Finishing in Egypt, since 1996",
    description: "Final Touch designs and finishes homes, shops, hotels, offices, gardens and furniture. One team, from the first drawing to the last detail, since 1996.",
    work: "work by Final Touch",
  },
  nav: { work: "Work", about: "About", process: "Process", workshop: "Workshop", contact: "Contact", main: "Main", other: "عربي" },
  hero: {
    title: "We finish what we design.",
    sub: "Interior design and finishing since 1996.",
    hint: "Scroll to step inside",
    loading: "Opening the door",
    beats: [
      ["This is how we leave a room.", "Lit, furnished and finished."],
      ["This is how we find it.", "Scroll, and watch everything that happens in between."],
    ],
    // The lists under each stage are a draft: to be confirmed with the owner.
    stages: [
      { name: "Bare shell", text: "Concrete and brick. Where every job starts.", inc: ["Survey and levels", "Electrical first fix", "Plumbing first fix"] },
      { name: "Plaster", text: "Walls and ceilings brought true and smooth.", inc: ["Plaster and putty", "Gypsum ceilings", "Primer and paint"] },
      { name: "Flooring", text: "Laid board by board.", inc: ["Marble and porcelain", "Wood flooring", "Skirting"] },
      { name: "Joinery", text: "Panelling and cabinetry from our own workshop.", inc: ["Doors", "Wall panelling", "Kitchens and dressing rooms"] },
      { name: "Furniture", text: "Drawn for the room, then built for it.", inc: ["Sofas and beds to size", "Upholstery", "Curtains and rugs"] },
      { name: "The final touch", text: "Then the light goes on.", inc: [] },
    ],
  },
  about: {
    lead: "Final Touch is a team of engineers and technicians who have designed and finished spaces since 1996, across Egypt and the Arab countries.",
    body: "One team carries the work from the first drawing to the last detail. The joinery and the furniture are made in our own workshop, so nothing is handed to someone else halfway.",
    disciplines: ["Architectural design", "Interior design", "Landscape", "Furniture"],
    caption: "Dining room, residential",
    since: "since 1996",
  },
  // Draft wording: to be confirmed with the owner.
  process: {
    title: "How a project runs",
    steps: [
      { name: "We plan it", text: "We visit the space, measure it and draw how it will be laid out.", inc: ["Site visit and survey", "Layout options", "Working drawings"] },
      { name: "We show it", text: "Every room is rendered in 3D before anything is ordered.", inc: ["3D views of every space", "Materials and colours", "Revisions until you approve"] },
      { name: "We make it", text: "The joinery and the furniture are built in our own workshop.", inc: ["Doors and panelling", "Kitchens and dressing rooms", "Sofas, beds and tables"] },
      { name: "We finish it", text: "Our crews finish on site, layer by layer, until handover.", inc: ["Plaster, floors and paint", "Installation", "Handover"] },
    ],
  },
  work: { how: "Select a photo to open it", all: "See the whole field", next: "Next field", back: "All work", count: (n: number) => (n === 1 ? "1 photo" : `${n} photos`) },
  viewer: { label: "Photo", close: "Close", prev: "Previous", next: "Next" },
  workshop: {
    title: "We build what we draw.",
    text: "These are frames and cabinets in our workshop, before upholstery and paint. What you approve on paper is what we build and bring to site.",
    captions: ["Curved sofa frame", "Kitchen units before paint", "Sofa frame on the bench"],
  },
  cta: { title: "Have a space that needs finishing?", talk: "Let's talk.", mail: "Mail", instagram: "Instagram", facebook: "Facebook" },
  footer: { line: "Interior design and finishing since 1996. Egypt and the Arab countries.", top: "Back to top" },
  missing: { title: "This page is not here.", text: "The address may be old, or the page has moved.", home: "Go to the home page" },
};

export type Copy = typeof en;

const ar: Copy = {
  meta: {
    title: "فينال تاتش | تصميم داخلي وتشطيب في مصر منذ ١٩٩٦",
    description: "فينال تاتش تصمّم وتشطّب المنازل والمحلات والفنادق والمكاتب والحدائق وتصنع الأثاث. فريق واحد من أول رسمة إلى آخر تفصيلة، منذ ١٩٩٦.",
    work: "من أعمال فينال تاتش",
  },
  nav: { work: "الأعمال", about: "من نحن", process: "كيف نعمل", workshop: "الورشة", contact: "تواصل معنا", main: "القائمة الرئيسية", other: "English" },
  hero: {
    title: "نصمّم، ونشطّب ما صمّمناه.",
    sub: "تصميم داخلي وتشطيب منذ ١٩٩٦.",
    hint: "مرّر للدخول",
    loading: "نفتح الباب",
    beats: [
      ["هكذا نترك المكان.", "مُضاءً، مفروشًا، ومكتملًا."],
      ["وهكذا نستلمه.", "مرّر، وشاهد كل ما يحدث بينهما."],
    ],
    stages: [
      { name: "على الطوب", text: "خرسانة وطوب. من هنا يبدأ كل مشروع.", inc: ["رفع المقاسات", "تأسيس الكهرباء", "تأسيس السباكة"] },
      { name: "المحارة", text: "حوائط وأسقف مستوية وناعمة.", inc: ["محارة ومعجون", "أسقف جبسية", "بطانة ودهان"] },
      { name: "الأرضيات", text: "تُركَّب لوحًا بعد لوح.", inc: ["رخام وبورسلين", "باركيه", "وزرات"] },
      { name: "النجارة", text: "تكسيات خشبية ودواليب من ورشتنا.", inc: ["أبواب", "تكسيات حوائط", "مطابخ وغرف ملابس"] },
      { name: "الأثاث", text: "يُرسَم للمكان ثم يُصنَع له.", inc: ["كنب وأسرّة بالمقاس", "تنجيد", "ستائر وسجاد"] },
      { name: "اللمسة الأخيرة", text: "ثم يُضاء النور.", inc: [] },
    ],
  },
  about: {
    lead: "فينال تاتش فريق من المهندسين والفنيين، يصمّم المساحات وينفّذ تشطيبها منذ عام ١٩٩٦ في مصر والدول العربية.",
    body: "فريق واحد يتولّى العمل من أول رسمة إلى آخر تفصيلة. النجارة والأثاث يُصنعان في ورشتنا، فلا ينتقل المشروع إلى يدٍ أخرى في منتصف الطريق.",
    disciplines: ["التصميم المعماري", "التصميم الداخلي", "تنسيق الحدائق", "الأثاث"],
    caption: "غرفة طعام، سكني",
    since: "منذ ١٩٩٦",
  },
  process: {
    title: "كيف يسير المشروع",
    steps: [
      { name: "نخطّط", text: "نزور المكان ونرفع مقاساته، ثم نرسم توزيعه.", inc: ["زيارة الموقع ورفع المقاسات", "بدائل التوزيع", "الرسومات التنفيذية"] },
      { name: "نُريك النتيجة", text: "كل غرفة تُعرض بالأبعاد الثلاثية قبل شراء أي شيء.", inc: ["مناظير لكل مساحة", "الخامات والألوان", "تعديلات حتى الاعتماد"] },
      { name: "نصنع", text: "النجارة والأثاث يُصنعان في ورشتنا.", inc: ["أبواب وتكسيات", "مطابخ وغرف ملابس", "كنب وأسرّة وطاولات"] },
      { name: "نشطّب", text: "فِرَقنا تنفّذ في الموقع طبقةً بعد طبقة حتى التسليم.", inc: ["محارة وأرضيات ودهانات", "التركيبات", "التسليم"] },
    ],
  },
  work: { how: "اضغط على أي صورة لتكبيرها", all: "شاهد كل أعمال المجال", next: "المجال التالي", back: "كل الأعمال", count: (n: number) => (n === 1 ? "صورة واحدة" : n <= 10 ? `${num(n, "ar")} صور` : `${num(n, "ar")} صورة`) },
  viewer: { label: "صورة", close: "إغلاق", prev: "السابق", next: "التالي" },
  workshop: {
    title: "نصنع ما نرسمه.",
    text: "هذه هياكل ودواليب في ورشتنا قبل التنجيد والدهان. ما تعتمده على الورق هو ما نصنعه وننقله إلى الموقع.",
    captions: ["هيكل كنبة منحنية", "وحدات مطبخ قبل الدهان", "هيكل كنبة على طاولة العمل"],
  },
  cta: { title: "لديك مساحة تحتاج إلى تشطيب؟", talk: "لنتحدّث.", mail: "البريد", instagram: "إنستغرام", facebook: "فيسبوك" },
  footer: { line: "تصميم داخلي وتشطيب منذ ١٩٩٦. مصر والدول العربية.", top: "إلى الأعلى" },
  missing: { title: "هذه الصفحة غير موجودة.", text: "ربما العنوان قديم، أو نُقلت الصفحة.", home: "إلى الصفحة الرئيسية" },
};

export const copy: Record<Lang, Copy> = { en, ar };

export const contact = {
  mail: "finaltouch960@gmail.com",
  instagram: { url: "https://www.instagram.com/hfinaltouch2022/", label: "@hfinaltouch2022" },
  facebook: { url: "https://www.facebook.com/profile.php?id=100089838618274", label: "Final Touch" },
};
