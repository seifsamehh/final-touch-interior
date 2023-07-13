import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { FooterArabic, ServiceHeaderArabic } from "../components";
import admin1 from "../assets/admin-1.webp";
import admin2 from "../assets/admin-2.webp";
import admin3 from "../assets/admin-3.webp";
import admin4 from "../assets/admin-4.webp";
import admin5 from "../assets/admin-5.webp";
import admin6 from "../assets/admin-6.webp";
import admin7 from "../assets/admin-7.webp";
import admin8 from "../assets/admin-8.webp";
import admin9 from "../assets/admin-9.webp";
import admin10 from "../assets/admin-10.webp";
import admin11 from "../assets/admin-11.webp";
import admin12 from "../assets/admin-12.webp";
import admin13 from "../assets/admin-13.webp";
import admin14 from "../assets/admin-14.webp";
import admin15 from "../assets/admin-15.webp";
import admin16 from "../assets/admin-16.webp";
import admin17 from "../assets/admin-17.webp";
import admin18 from "../assets/admin-18.webp";
import "../styles/service-page.scss";

const AdministrativeServiceArabic = () => {
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
          <section className="administrative service-page-ar" id="heroo">
            <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden service-heading">
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">ادارى</p>
              </Parallax>
              <Parallax translateY={["50px", "-50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">ادارى</p>
              </Parallax>
              <Parallax scale={[1, 1.5, 1, 1.5]}>
                <h1 className="min-[290px]:text-5xl md:text-9xl my-6 dark:text-[#1f1f29]">
                  ادارى
                </h1>
              </Parallax>
              <Parallax translateY={["-50px", "50px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">ادارى</p>
              </Parallax>
              <Parallax translateY={["-50px", "150px"]}>
                <p className="stroke min-[290px]:text-6xl md:text-9xl">ادارى</p>
              </Parallax>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 py-8 service-gallery">
              <img
                src={admin1}
                alt="admin 1"
                aria-label="admin 1"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin2}
                alt="admin 2"
                aria-label="admin 2"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin3}
                alt="admin 3"
                aria-label="admin 3"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin4}
                alt="admin 4"
                aria-label="admin 4"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin5}
                alt="admin 5"
                aria-label="admin 5"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin6}
                alt="admin 6"
                aria-label="admin 6"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin7}
                alt="admin 7"
                aria-label="admin 7"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin8}
                alt="admin 8"
                aria-label="admin 8"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin9}
                alt="admin 9"
                aria-label="admin 9"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin10}
                alt="admin 10"
                aria-label="admin 10"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin11}
                alt="admin 11"
                aria-label="admin 11"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin12}
                alt="admin 12"
                aria-label="admin 12"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin13}
                alt="admin 13"
                aria-label="admin 13"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin14}
                alt="admin 14"
                aria-label="admin 14"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin15}
                alt="admin 15"
                aria-label="admin 15"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin16}
                alt="admin 16"
                aria-label="admin 16"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin17}
                alt="admin 17"
                aria-label="admin 17"
                width={400}
                height={400}
                loading="lazy"
              />
              <img
                src={admin18}
                alt="admin 18"
                aria-label="admin 18"
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

export default AdministrativeServiceArabic;
