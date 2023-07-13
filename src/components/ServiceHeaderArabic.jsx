import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.scss";
import { MobileArabic } from ".";
const ServiceHeaderArabic = () => {
  // theme
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleChangeCheckbox = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const handleClickScroll1 = () => {
    const element = document.getElementById("about-us");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickScroll2 = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickScroll3 = () => {
    const element = document.getElementById("contact-us");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickScroll4 = () => {
    const element = document.getElementById("heroo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <header className="service-header flex justify-around items-center p-4 min-[290px]:bg-[#1f1f29] min-[290px]:dark:bg-[#f5f5fa] md:dark:bg-transparent md:bg-transparent">
      <div
        className="left w-full cursor-pointer bg-right"
        onClick={handleClickScroll4}
      ></div>
      <div className="middle w-full min-[290px]:hidden md:flex md:justify-center">
        <nav className="flex justify-center items-center gap-8">
          <Link
            to="/arabic"
            className="text-xl dark:text-[#f5f5fa] text-center"
          >
            الصفحة الرئيسية
          </Link>
          <Link
            to="/residential-ar"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll1}
          >
            سكنى
          </Link>
          <Link
            to="/commercial-ar"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll2}
          >
            تجارى
          </Link>
          <Link
            to="/hotel-ar"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll3}
          >
            فندقى
          </Link>
          <Link
            to="/administrative-ar"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll3}
          >
            ادارى
          </Link>
          <Link
            to="/landscape-ar"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll3}
          >
            منظر جمالى
          </Link>
          <Link
            to="/furniture-ar"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll3}
          >
            أثاث
          </Link>
        </nav>
      </div>
      <div className="mobile-middle w-full min-[290px]:block md:hidden">
        <MobileArabic />
      </div>
      <div className="right w-full flex justify-end items-center gap-2">
        <label className="swap">
          <input
            type="checkbox"
            htmlFor="theme"
            id="theme"
            aria-label="theme mode"
            onClick={handleTheme}
            onChange={handleChangeCheckbox}
            checked={theme === "dark"}
          />
          <div className="swap-on dark:text-[#1f1f29] font-bold text-xl">
            مظلم
          </div>
          <div className="swap-off font-bold text-xl">منير</div>
        </label>
        <Link to="/" className="font-bold text-xl dark:text-[#1f1f29]">
          الانجليزية
        </Link>
      </div>
    </header>
  );
};

export default ServiceHeaderArabic;
