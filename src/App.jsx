import { useState, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";
import {
  Administrative,
  Commercial,
  Error,
  Furniture,
  Home,
  Hotel,
  Landscape,
  Offline,
  Residential,
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
                    <Route path="/residential" element={<Residential />} />
                    <Route path="/commercial" element={<Commercial />} />
                    <Route path="/hotel" element={<Hotel />} />
                    <Route
                      path="/administrative"
                      element={<Administrative />}
                    />
                    <Route path="/landscape" element={<Landscape />} />
                    <Route path="/furniture" element={<Furniture />} />
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
