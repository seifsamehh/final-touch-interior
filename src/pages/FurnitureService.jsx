import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { Footer, ServiceHeader } from "../components";
import furn1 from "../assets/furn-1.webp";
import furn2 from "../assets/furn-2.webp";
import furn3 from "../assets/furn-3.webp";
import furn4 from "../assets/furn-4.webp";
import furn5 from "../assets/furn-5.webp";
import furn6 from "../assets/furn-6.webp";
import furn7 from "../assets/furn-7.webp";
import furn8 from "../assets/furn-8.webp";
import furn9 from "../assets/furn-9.webp";
import furn10 from "../assets/furn-10.webp";
import furn11 from "../assets/furn-11.webp";
import furn12 from "../assets/furn-12.webp";
import furn13 from "../assets/furn-13.webp";
import furn14 from "../assets/furn-14.webp";
import furn15 from "../assets/furn-15.webp";
import furn16 from "../assets/furn-16.webp";
import furn17 from "../assets/furn-17.webp";
import furn18 from "../assets/furn-18.webp";
import furn19 from "../assets/furn-19.webp";
import furn20 from "../assets/furn-20.webp";
import furn21 from "../assets/furn-21.webp";
import furn22 from "../assets/furn-22.webp";
import furn23 from "../assets/furn-23.webp";
import furn24 from "../assets/furn-24.webp";
import furn25 from "../assets/furn-25.webp";
import furn26 from "../assets/furn-26.webp";
import furn27 from "../assets/furn-27.webp";
import furn28 from "../assets/furn-28.webp";
import furn29 from "../assets/furn-29.webp";
import furn30 from "../assets/furn-30.webp";
import furn31 from "../assets/furn-31.webp";
import furn32 from "../assets/furn-32.webp";
import furn33 from "../assets/furn-33.webp";
import furn34 from "../assets/furn-34.webp";
import furn35 from "../assets/furn-35.webp";
import furn36 from "../assets/furn-36.webp";
import furn37 from "../assets/furn-37.webp";
import furn38 from "../assets/furn-38.webp";
import furn39 from "../assets/furn-39.webp";
import furn40 from "../assets/furn-40.webp";
import furn41 from "../assets/furn-41.webp";
import furn42 from "../assets/furn-42.webp";
import furn43 from "../assets/furn-43.webp";
import furn44 from "../assets/furn-44.webp";
import furn45 from "../assets/furn-45.webp";
import "../styles/service-page.scss";

const FurnitureService = () => {
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
          <section className="furniture service-page" id="heroo">
            <div className="service-heading min-h-screen flex justify-center items-center flex-col overflow-hidden">
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Furniture
                </p>
              </Parallax>
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Furniture
                </p>
              </Parallax>
              <Parallax scale={[1, 1.5, 1, 1.5]}>
                <h1 className="min-[290px]:text-5xl md:text-9xl my-6 dark:text-[#1f1f29]">
                  Furniture
                </h1>
              </Parallax>
              <Parallax translateY={["-50px", "50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Furniture
                </p>
              </Parallax>
              <Parallax translateY={["-50px", "150px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">
                  Furniture
                </p>
              </Parallax>
            </div>
            <div className="service-gallery flex justify-center items-center flex-wrap gap-6 py-8">
              <img
                src={furn1}
                alt="furn 1"
                aria-label="furn 1"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn2}
                alt="furn 2"
                aria-label="furn 2"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn3}
                alt="furn 3"
                aria-label="furn 3"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn4}
                alt="furn 4"
                aria-label="furn 4"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn5}
                alt="furn 5"
                aria-label="furn 5"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn6}
                alt="furn 6"
                aria-label="furn 6"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn7}
                alt="furn 7"
                aria-label="furn 7"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn8}
                alt="furn 8"
                aria-label="furn 8"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn9}
                alt="furn 9"
                aria-label="furn 9"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn10}
                alt="furn 10"
                aria-label="furn 10"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn11}
                alt="furn 11"
                aria-label="furn 11"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn12}
                alt="furn 12"
                aria-label="furn 12"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn13}
                alt="furn 13"
                aria-label="furn 13"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn14}
                alt="furn 14"
                aria-label="furn 14"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn15}
                alt="furn 15"
                aria-label="furn 15"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn16}
                alt="furn 16"
                aria-label="furn 16"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn17}
                alt="furn 17"
                aria-label="furn 17"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn18}
                alt="furn 18"
                aria-label="furn 18"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn19}
                alt="furn 19"
                aria-label="furn 19"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn20}
                alt="furn 20"
                aria-label="furn 20"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn21}
                alt="furn 21"
                aria-label="furn 21"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn22}
                alt="furn 22"
                aria-label="furn 22"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn23}
                alt="furn 23"
                aria-label="furn 23"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn24}
                alt="furn 24"
                aria-label="furn 24"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn25}
                alt="furn 25"
                aria-label="furn 25"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn26}
                alt="furn 26"
                aria-label="furn 26"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn27}
                alt="furn 27"
                aria-label="furn 27"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn28}
                alt="furn 28"
                aria-label="furn 28"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn29}
                alt="furn 29"
                aria-label="furn 29"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn30}
                alt="furn 30"
                aria-label="furn 30"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn31}
                alt="furn 31"
                aria-label="furn 31"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn32}
                alt="furn 32"
                aria-label="furn 32"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn33}
                alt="furn 33"
                aria-label="furn 33"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn34}
                alt="furn 34"
                aria-label="furn 34"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn35}
                alt="furn 35"
                aria-label="furn 35"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn36}
                alt="furn 36"
                aria-label="furn 36"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn37}
                alt="furn 37"
                aria-label="furn 37"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn38}
                alt="furn 38"
                aria-label="furn 38"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn39}
                alt="furn 39"
                aria-label="furn 39"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn40}
                alt="furn 40"
                aria-label="furn 40"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn41}
                alt="furn 41"
                aria-label="furn 41"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn42}
                alt="furn 42"
                aria-label="furn 42"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn43}
                alt="furn 43"
                aria-label="furn 43"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn44}
                alt="furn 44"
                aria-label="furn 44"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={furn45}
                alt="furn 45"
                aria-label="furn 45"
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

export default FurnitureService;
