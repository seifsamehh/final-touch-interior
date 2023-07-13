import { useState, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";
import {
  Administrative,
  AdministrativeArabic,
  Commercial,
  CommercialArabic,
  Error,
  Furniture,
  FurnitureArabic,
  Home,
  HomeArabic,
  Hotel,
  HotelArabic,
  Landscape,
  LandscapeArabic,
  Offline,
  Residential,
  ResidentialArabic,
} from "./pages";

const App = () => {
  //loading
  const [loading, setLoading] = useState("false");
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  function Wrapper({ children }) {
    const location = useLocation();

    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

    return children;
  }
  // page appear
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
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
        <>
          {isOnline ? (
            <main className="bg-[#1f1f29] dark:bg-[#f5f5fa] min-h-screen duration-[0.3s]">
              <motion.div
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 2 }}
              >
                <Wrapper>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/arabic" element={<HomeArabic />} />
                    <Route path="/residential" element={<Residential />} />
                    <Route
                      path="/residential-ar"
                      element={<ResidentialArabic />}
                    />
                    <Route path="/commercial" element={<Commercial />} />
                    <Route
                      path="/commercial-ar"
                      element={<CommercialArabic />}
                    />
                    <Route path="/hotel" element={<Hotel />} />
                    <Route path="/hotel-ar" element={<HotelArabic />} />
                    <Route
                      path="/administrative"
                      element={<Administrative />}
                    />
                    <Route
                      path="/administrative-ar"
                      element={<AdministrativeArabic />}
                    />
                    <Route path="/landscape" element={<Landscape />} />
                    <Route path="/landscape-ar" element={<LandscapeArabic />} />
                    <Route path="/furniture" element={<Furniture />} />
                    <Route path="/furniture-ar" element={<FurnitureArabic />} />
                    <Route path="*" element={<Error />} />
                  </Routes>
                </Wrapper>
              </motion.div>
            </main>
          ) : (
            <Offline />
          )}
        </>
      )}
    </>
  );
};

export default App;
