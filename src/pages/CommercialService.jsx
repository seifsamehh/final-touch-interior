import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { Footer, ServiceHeader } from "../components";
import com1 from "../assets/com-1.webp";
import com2 from "../assets/com-3.webp";
import com3 from "../assets/com-4.webp";
import com4 from "../assets/com-5.webp";
import com5 from "../assets/com-6.webp";
import com6 from "../assets/com-7.webp";
import com7 from "../assets/com-8.webp";
import com8 from "../assets/com-9.webp";
import com9 from "../assets/com-10.webp";
import com10 from "../assets/com-11.webp";
import com11 from "../assets/com-12.webp";
import com12 from "../assets/com-13.webp";
import com13 from "../assets/com-14.webp";
import com14 from "../assets/com-15.webp";
import com15 from "../assets/com-16.webp";
import "../styles/service-page.scss";

const CommercialService = () => {
  //loading
  const [loading, setLoading] = useState("false");
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  // page appear
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the progress value based on the user's scroll position
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = `${Math.round((scrollTop / windowHeight) * 100)}%`;

      setProgressValue(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen gap-12 loader bg-[#1f1f29] overflow-hidden">
          <h1 className="text-[#f5f5fa] md:text-7xl text-center min-[290px]:text-5xl">
            Final Touch
          </h1>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 2 }}
        >
          <ServiceHeader />
          <section className="commercial service-page" id="heroo">
            <div className="service-heading min-h-screen flex justify-center items-center flex-col overflow-hidden">
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Commercial
                </p>
              </Parallax>
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Commercial
                </p>
              </Parallax>
              <Parallax scale={[1, 1.5, 1, 1.5]}>
                <h1 className="min-[290px]:text-5xl md:text-9xl my-6 dark:text-[#1f1f29]">
                  Commercial
                </h1>
              </Parallax>
              <Parallax translateY={["-50px", "50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Commercial
                </p>
              </Parallax>
              <Parallax translateY={["-50px", "150px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Commercial
                </p>
              </Parallax>
            </div>
            <div className="service-gallery flex justify-center items-center flex-wrap gap-6 py-8">
              <img
                src={com1}
                alt="commerical 1"
                aria-label="commerical 1"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com2}
                alt="commerical 2"
                aria-label="commerical 2"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com3}
                alt="commerical 3"
                aria-label="commerical 3"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com4}
                alt="commerical 4"
                aria-label="commerical 4"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com5}
                alt="commerical 5"
                aria-label="commerical 5"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com6}
                alt="commerical 6"
                aria-label="commerical 6"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com7}
                alt="commerical 7"
                aria-label="commerical 7"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com8}
                alt="commerical 8"
                aria-label="commerical 8"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com9}
                alt="commerical 9"
                aria-label="commerical 9"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com10}
                alt="commerical 10"
                aria-label="commerical 10"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com11}
                alt="commerical 11"
                aria-label="commerical 11"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com12}
                alt="commerical 12"
                aria-label="commerical 12"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com13}
                alt="commerical 13"
                aria-label="commerical 13"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com14}
                alt="commerical 14"
                aria-label="commerical 14"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={com15}
                alt="commerical 15"
                aria-label="commerical 15"
                width={400}
                height={400}
                loading="lazy"
              />
            </div>
          </section>
          {/* progress */}
          <div className="fixed right-4 bottom-4 z-10">
            <div
              className="value text-3xl"
              style={{
                "--value": `calc(${progressValue} + ${
                  progressValue > 0 ? "1%" : "0"
                })`,
              }}
            >
              {progressValue}
            </div>
          </div>
          <Footer />
        </motion.div>
      )}
    </>
  );
};

export default CommercialService;
