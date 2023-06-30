import React, { Suspense, useState, useEffect } from "react";
import { Footer, Header } from "../components";

const LandingPage = React.lazy(() => import("../components/Landing"));
const AboutUs = React.lazy(() => import("../components/About"));
const Services = React.lazy(() => import("../components/Services"));
const Physical = React.lazy(() => import("../components/Physical"));
const Contact = React.lazy(() => import("../components/ContactForm"));

const Home = () => {
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
    <section className="home">
      {/* header */}
      <Header />
      {/* landing page */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen gap-12 loader bg-[#1f1f29] overflow-hidden">
            <h1 className="text-[#f5f5fa] md:text-7xl text-center min-[290px]:text-5xl">
              Please Wait..
            </h1>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        }
      >
        <LandingPage />
      </Suspense>
      {/* about us */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen gap-12 loader bg-[#1f1f29] overflow-hidden">
            <h1 className="text-[#f5f5fa] md:text-7xl text-center min-[290px]:text-5xl">
              Please Wait..
            </h1>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        }
      >
        <AboutUs />
      </Suspense>
      {/* services */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen gap-12 loader bg-[#1f1f29] overflow-hidden">
            <h1 className="text-[#f5f5fa] md:text-7xl text-center min-[290px]:text-5xl">
              Please Wait..
            </h1>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        }
      >
        <Services />
      </Suspense>
      {/* phy. */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen gap-12 loader bg-[#1f1f29] overflow-hidden">
            <h1 className="text-[#f5f5fa] md:text-7xl text-center min-[290px]:text-5xl">
              Please Wait..
            </h1>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        }
      >
        <Physical />
      </Suspense>
      {/* contact */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen gap-12 loader bg-[#1f1f29] overflow-hidden">
            <h1 className="text-[#f5f5fa] md:text-7xl text-center min-[290px]:text-5xl">
              Please Wait..
            </h1>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        }
      >
        <Contact />
      </Suspense>
      {/* footer */}
      <Footer />
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
    </section>
  );
};

export default Home;
