/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

function MobileNav({ open, setOpen }) {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-[#1f1f29]/80 transform ${
        open ? "-translate-y-0" : "-translate-y-full"
      } transition-transform duration-300 ease-in-out filter  `}
    >
      <div className="flex flex-col items-center justify-center gap-8 mt-[10rem]">
        <Link to="/" onClick={() => setOpen(false)} className="text-4xl">
          الصفحة الرئيسية
        </Link>
        <Link
          to="/residential"
          onClick={() => setOpen(false)}
          className="text-4xl"
        >
          سكنى
        </Link>
        <Link
          to="/commercial"
          onClick={() => setOpen(false)}
          className="text-4xl"
        >
          تجارى
        </Link>
        <Link to="/hotel" onClick={() => setOpen(false)} className="text-4xl">
          فندقى
        </Link>
        <Link
          to="/administrative"
          onClick={() => setOpen(false)}
          className="text-4xl"
        >
          ادارى
        </Link>
        <Link
          to="/landscape"
          onClick={() => setOpen(false)}
          className="text-4xl"
        >
          منظر جمالى
        </Link>
        <Link
          to="/furniture"
          onClick={() => setOpen(false)}
          className="text-4xl"
        >
          أثاث
        </Link>
      </div>
    </div>
  );
}
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <MobileNav open={open} setOpen={setOpen} />
      <div className="flex items-center justify-center">
        <div
          className="relative z-50 flex flex-col items-center justify-between w-6 h-6 cursor-pointer group"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-white dark:bg-white rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${
              open ? "rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`h-1 w-full bg-white dark:bg-white rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
              open ? "hidden" : "w-full"
            }`}
          />
          <span
            className={`h-1 w-full bg-white dark:bg-white rounded-lg cursor-pointer transform transition duration-300 ease-in-out ${
              open ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          />
        </div>
      </div>
    </nav>
  );
}
