import { Parallax } from "react-scroll-parallax";
import intro from "../assets/residntal-bg.webp";
import "../styles/landing.scss";

const LandingArabic = () => {
  return (
    <div
      className="landing-page min-h-screen flex justify-center items-center flex-col overflow-hidden"
      id="heroo"
    >
      <div
        className="content min-h-screen flex justify-center items-center"
        style={{ zIndex: 2, mixBlendMode: "screen", opacity: 0.8 }}
      >
        <Parallax translateY={["-300px", "300px"]}>
          <h1 className="min-[290px]:text-5xl md:text-9xl dark:text-[#1f1f29] font-bold">
            فينال تاتش
          </h1>
        </Parallax>
      </div>
      <div className="intro-img" style={{ zIndex: 1 }}>
        <Parallax translateY={["0px", "-500px"]}>
          <img
            src={intro}
            alt="intro"
            aria-label="intro"
            width={500}
            height={500}
          />
        </Parallax>
      </div>
    </div>
  );
};

export default LandingArabic;
