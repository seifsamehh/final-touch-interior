import { Parallax } from "react-scroll-parallax";
import shape from "../assets/shape.png";
import "../styles/physical.scss";
const Physical = () => {
  return (
    <section className="physical min-h-screen flex justify-center items-center flex-col overflow-hidden">
      <Parallax translateY={["-100px", "300px"]}>
        <img
          src={shape}
          alt="shape"
          loading="lazy"
          width={600}
          height={300}
          aria-label="shape"
        />
      </Parallax>
      <Parallax translateY={["0px", "-600px"]}>
        <h1 className="min-[290px]:text-5xl md:text-8xl dark:text-[#1f1f29] text-center z-10">
          Your dreams will come true
        </h1>
      </Parallax>
    </section>
  );
};

export default Physical;
