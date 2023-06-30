import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.scss";
import { Mobile } from ".";
const ServiceHeader = () => {
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
        className="left w-full cursor-pointer"
        onClick={handleClickScroll4}
      ></div>
      <div className="middle w-full min-[290px]:hidden md:flex md:justify-center">
        <nav className="flex justify-center items-center gap-8">
          <Link to="/" className="text-xl dark:text-[#f5f5fa] text-center">
            HOME
          </Link>
          <Link
            to="/residential"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll1}
          >
            RESIDENTIAL
          </Link>
          <Link
            to="/commercial"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll2}
          >
            COMMERCIAL
          </Link>
          <Link
            to="/hotel"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll3}
          >
            HOTEL
          </Link>
          <Link
            to="/administrative"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll3}
          >
            ADMINISTRATIVE
          </Link>
          <Link
            to="/landscape"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll3}
          >
            LANDSCAPE
          </Link>
          <Link
            to="/furniture"
            className="text-xl dark:text-[#f5f5fa] text-center"
            onClick={handleClickScroll3}
          >
            FURNITURE
          </Link>
        </nav>
      </div>
      <div className="mobile-middle w-full min-[290px]:block md:hidden">
        <Mobile />
      </div>
      <div className="right w-full flex justify-end">
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
            DARK
          </div>
          <div className="swap-off font-bold text-xl">LIGHT</div>
        </label>
      </div>
    </header>
  );
};

export default ServiceHeader;
