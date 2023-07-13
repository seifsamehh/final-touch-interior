import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { FooterArabic, ServiceHeaderArabic } from "../components";
import res1 from "../assets/res-1.webp";
import res2 from "../assets/res-2.webp";
import res3 from "../assets/res-4.webp";
import res4 from "../assets/res-5.webp";
import res5 from "../assets/res-6.webp";
import res6 from "../assets/res-7.webp";
import res7 from "../assets/res-8.webp";
import res8 from "../assets/res-9.webp";
import res9 from "../assets/res-10.webp";
import res10 from "../assets/res-11.webp";
import res11 from "../assets/res-12.webp";
import res12 from "../assets/res-13.webp";
import res13 from "../assets/res-14.webp";
import res14 from "../assets/res-15.webp";
import res15 from "../assets/res-16.webp";
import "../styles/service-page.scss";

const ResidentialServiceArabic = () => {
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
          style={{ direction: "rtl" }}
          className="special"
        >
          <ServiceHeaderArabic />
          <section className="residential service-page-ar" id="heroo">
            <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden service-heading">
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">سكنى</p>
              </Parallax>
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">سكنى</p>
              </Parallax>
              <Parallax scale={[1, 1.5, 1, 1.5]}>
                <h1 className="min-[290px]:text-5xl md:text-9xl my-6 dark:text-[#1f1f29]">
                  سكنى
                </h1>
              </Parallax>
              <Parallax translateY={["-50px", "50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">سكنى</p>
              </Parallax>
              <Parallax translateY={["-50px", "150px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">سكنى</p>
              </Parallax>
            </div>
            <div className="service-gallery flex justify-center items-center flex-wrap gap-6 py-8 min-[290px]:mx-4 md:mx-0">
              <img
                src={res1}
                alt="residential 1"
                aria-label="residential 1"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res2}
                alt="residential 2"
                aria-label="residential 2"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res3}
                alt="residential 3"
                aria-label="residential 3"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res4}
                alt="residential 4"
                aria-label="residential 4"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res5}
                alt="residential 5"
                aria-label="residential 5"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res6}
                alt="residential 6"
                aria-label="residential 6"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res7}
                alt="residential 7"
                aria-label="residential 7"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res8}
                alt="residential 8"
                aria-label="residential 8"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res9}
                alt="residential 9"
                aria-label="residential 9"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res10}
                alt="residential 10"
                aria-label="residential 10"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res11}
                alt="residential 11"
                aria-label="residential 11"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res12}
                alt="residential 12"
                aria-label="residential 12"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res13}
                alt="residential 13"
                aria-label="residential 13"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res14}
                alt="residential 14"
                aria-label="residential 14"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={res15}
                alt="residential 15"
                aria-label="residential 15"
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
          <FooterArabic />
        </motion.div>
      )}
    </>
  );
};

export default ResidentialServiceArabic;
