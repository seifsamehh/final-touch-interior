import "../styles/about.scss";
const AboutArabic = () => {
  return (
    <section
      className="about-us min-h-screen flex justify-center items-center flex-col gap-12 min-[290px]:pt-12 md:pt-0"
      id="about-us"
    >
      <h1 className="text-center text-7xl dark:text-[#1f1f29]">من نحن</h1>
      <p className="text-center leading-8 max-w-screen-lg min-[290px]:px-4 md:px-0 dark:text-[#1f1f29]">
        يشرف فريق العمل بشركة Final Touch بخدمتكم في جميع المجالات، وهي{" "}
        <span className="service1 font-bold text-[#ffed00]">
          التصميم المعماري
        </span>
        ،{" "}
        <span className="service2 font-bold text-[#ffed00]">
          التصميم الداخلي
        </span>
        ،{" "}
        <span className="service3 font-bold text-[#ffed00]">
          المناظر الطبيعية
        </span>
        ، <span className="service4 font-bold text-[#ffed00]">الأثاث</span>.
        نقدم لكم جودة متفوقة من خلال فريق من المهندسين والفنيين الذين يمتلكون
        خبرة تتجاوز الثلاثين عامًا في هذه المجالات منذ بداية عام 1996 وحتى الآن،
        ونحن سعداء بخدمتكم بعمل يمتد إلى جميع محافظات مصر والدول العربية، ونحن
        نمتلك أيضًا القدرات لتصنيع جميع الأعمال الأساسية باستخدام أحدث التقنيات.
      </p>
    </section>
  );
};

export default AboutArabic;
