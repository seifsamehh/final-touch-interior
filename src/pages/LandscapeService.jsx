import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { Footer, ServiceHeader } from "../components";
import land1 from "../assets/land-1.webp";
import land2 from "../assets/land-2.webp";
import land3 from "../assets/land-3.webp";
import land4 from "../assets/land-4.webp";
import land5 from "../assets/land-5.webp";
import land6 from "../assets/land-6.webp";
import land7 from "../assets/land-7.webp";
import land8 from "../assets/land-8.webp";
import land9 from "../assets/land-9.webp";
import land10 from "../assets/land-10.webp";
import land11 from "../assets/land-11.webp";
import land12 from "../assets/land-12.webp";
import land13 from "../assets/land-13.webp";
import land14 from "../assets/land-14.webp";
import land15 from "../assets/land-15.webp";
import land16 from "../assets/land-16.webp";
import land17 from "../assets/land-17.webp";
import land18 from "../assets/land-18.webp";
import land19 from "../assets/land-19.webp";
import land20 from "../assets/land-20.webp";
import land21 from "../assets/land-21.webp";
import land22 from "../assets/land-22.webp";
import land23 from "../assets/land-23.webp";
import land24 from "../assets/land-24.webp";
import "../styles/service-page.scss";

const LandscapeService = () => {
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
          <section className="landscape service-page" id="heroo">
            <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden service-heading">
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Landscape
                </p>
              </Parallax>
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Landscape
                </p>
              </Parallax>
              <Parallax scale={[1, 1.5, 1, 1.5]}>
                <h1 className="min-[290px]:text-5xl md:text-9xl my-6 dark:text-[#1f1f29]">
                  Landscape
                </h1>
              </Parallax>
              <Parallax translateY={["-50px", "50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Landscape
                </p>
              </Parallax>
              <Parallax translateY={["-50px", "150px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Landscape
                </p>
              </Parallax>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 py-8 service-gallery">
              <img
                src={land1}
                alt="land 1"
                aria-label="land 1"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land2}
                alt="land 2"
                aria-label="land 2"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land3}
                alt="land 3"
                aria-label="land 3"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land4}
                alt="land 4"
                aria-label="land 4"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land5}
                alt="land 5"
                aria-label="land 5"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land6}
                alt="land 6"
                aria-label="land 6"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land7}
                alt="land 7"
                aria-label="land 7"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land8}
                alt="land 8"
                aria-label="land 8"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land9}
                alt="land 9"
                aria-label="land 9"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land10}
                alt="land 10"
                aria-label="land 10"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land11}
                alt="land 11"
                aria-label="land 11"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land12}
                alt="land 12"
                aria-label="land 12"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land13}
                alt="land 13"
                aria-label="land 13"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land14}
                alt="land 14"
                aria-label="land 14"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land15}
                alt="land 15"
                aria-label="land 15"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land16}
                alt="land 16"
                aria-label="land 16"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land17}
                alt="land 17"
                aria-label="land 17"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land18}
                alt="land 18"
                aria-label="land 18"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land19}
                alt="land 19"
                aria-label="land 19"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land20}
                alt="land 20"
                aria-label="land 20"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land21}
                alt="land 21"
                aria-label="land 21"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land22}
                alt="land 22"
                aria-label="land 22"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land23}
                alt="land 23"
                aria-label="land 23"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={land24}
                alt="land 24"
                aria-label="land 24"
                width={400}
                height={400}
                loading="lazy"
              />
            </div>
          </section>
          {/* progress */}
          <div className="fixed z-10 right-4 bottom-4">
            <div
              className="value text-3xl dark:text-[#1f1f29]"
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

export default LandscapeService;
