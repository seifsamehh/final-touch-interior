import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";
import homeBg from "../assets/home-bg.webp";
import "../styles/services.scss";

const Services = () => {
  return (
    <section
      className="services min-h-screen overflow-hidden pt-12"
      id="services"
    >
      <h1 className="text-center text-7xl dark:text-[#1f1f29] min-[290px]:mb-6 md:mb-0">
        Services
      </h1>
      <div className="content flex justify-center items-center gap-8 min-h-screen min-[290px]:mx-6 md:mx-12 min-[290px]:flex-wrap md:flex-nowrap">
        <div className="left w-full flex flex-col justify-start items-start">
          <Link to="/residential" className="residential">
            Residential{" "}
            <svg
              width={50}
              height={50}
              fill="#ffed00"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link to="/commercial">
            Commercial{" "}
            <svg
              width={50}
              height={50}
              fill="#ffed00"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link to="/hotel">
            Hotel{" "}
            <svg
              width={50}
              height={50}
              fill="#ffed00"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link to="/administrative">
            Administrative{" "}
            <svg
              width={50}
              height={50}
              fill="#ffed00"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link to="/landscape">
            Landscape{" "}
            <svg
              width={50}
              height={50}
              fill="#ffed00"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link to="/furniture">
            Furniture{" "}
            <svg
              width={50}
              height={50}
              fill="#ffed00"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div className="right w-full flex justify-center items-center">
          <Parallax translateY={[50, -50]}>
            <img
              src={homeBg}
              alt="chair"
              width={500}
              height={500}
              loading="lazy"
              aria-label="chair"
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
};

export default Services;
