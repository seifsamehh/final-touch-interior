import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { FooterArabic, ServiceHeaderArabic } from "../components";
import hotel1 from "../assets/hotel-1.webp";
import hotel2 from "../assets/hotel-2.webp";
import hotel3 from "../assets/hotel-3.webp";
import hotel4 from "../assets/hotel-4.webp";
import hotel5 from "../assets/hotel-5.webp";
import hotel6 from "../assets/hotel-6.webp";
import hotel7 from "../assets/hotel-7.webp";
import hotel8 from "../assets/hotel-8.webp";
import hotel9 from "../assets/hotel-9.webp";
import hotel10 from "../assets/hotel-10.webp";
import "../styles/service-page.scss";

const HotelServiceArabic = () => {
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
          <section className="hotel service-page-ar" id="heroo">
            <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden service-heading">
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">فندقى</p>
              </Parallax>
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">فندقى</p>
              </Parallax>
              <Parallax scale={[1, 1.5, 1, 1.5]}>
                <h1 className="min-[290px]:text-5xl md:text-9xl my-6 dark:text-[#1f1f29]">
                  فندقى
                </h1>
              </Parallax>
              <Parallax translateY={["-50px", "50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">فندقى</p>
              </Parallax>
              <Parallax translateY={["-50px", "150px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">فندقى</p>
              </Parallax>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 py-8 service-gallery">
              <img
                src={hotel1}
                alt="hotel 1"
                aria-label="hotel 1"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={hotel2}
                alt="hotel 2"
                aria-label="hotel 2"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={hotel3}
                alt="hotel 3"
                aria-label="hotel 3"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={hotel4}
                alt="hotel 4"
                aria-label="hotel 4"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={hotel5}
                alt="hotel 5"
                aria-label="hotel 5"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={hotel6}
                alt="hotel 6"
                aria-label="hotel 6"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={hotel7}
                alt="hotel 7"
                aria-label="hotel 7"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={hotel8}
                alt="hotel 8"
                aria-label="hotel 8"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={hotel9}
                alt="hotel 9"
                aria-label="hotel 9"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={hotel10}
                alt="hotel 10"
                aria-label="hotel 10"
                width={400}
                height={400}
                loading="lazy"
              />
            </div>
          </section>
          <FooterArabic />
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
        </motion.div>
      )}
    </>
  );
};

export default HotelServiceArabic;
