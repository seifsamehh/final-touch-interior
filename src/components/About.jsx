import "../styles/about.scss";
const About = () => {
  return (
    <section
      className="about-us min-h-screen flex justify-center items-center flex-col gap-12 min-[290px]:pt-12 md:pt-0"
      id="about-us"
    >
      <h1 className="text-center text-7xl dark:text-[#1f1f29]">About Us</h1>
      <p className="text-center leading-8 max-w-screen-lg min-[290px]:px-4 md:px-0 dark:text-[#1f1f29]">
        The Final Touch team is honored to serve you in all fields.{" "}
        <span className="service1 font-bold text-[#ffed00]">
          Architectural Design
        </span>
        ,{" "}
        <span className="service2 font-bold text-[#ffed00]">
          Interior Design
        </span>
        , <span className="service3 font-bold text-[#ffed00]">Landscape</span>,{" "}
        <span className="service4 font-bold text-[#ffed00]">Furniture</span>.
        With superior quality through a team of engineers and technicians whose
        experience exceeds thirty years in the previous fields from the
        beginning of 1996 until now, and we are happy to serve you with work
        extended to all governorates of Egypt and the Arab countries, and we
        also have the capabilities to manufacture all foundation works with the
        latest technologies.
      </p>
    </section>
  );
};

export default About;
