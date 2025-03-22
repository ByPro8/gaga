import Menu from "../components/Menu";
import MainImage from "../components/MainImage";
import { Link } from "react-router-dom";
import ContactIcons from "../components/ContactIcons";
import GAGALENS from "../components/GAGALENS";

export default function Home() {
  return (
    <div className="flex h-screen w-full sm:flex-col lg:flex-row">
      <GAGALENS
        className="sm:pt-18 hidden text-center sm:mb-[60px] sm:block sm:pt-10 md:mb-[80px] lg:hidden"
        classNameG="text-[46px] sm:text-[60px] lg:text-[46px] sm:mb-2 "
        classNameB="text-[15xp] sm:text-[20px]"
      />

      <Menu className="w-[100%] pt-10 text-center sm:hidden sm:w-[20%] sm:pl-10 sm:text-right lg:block lg:w-[30%] lg:pl-0 lg2:w-[25%] xl:w-[20%]" />
      <MainImage className="hidden w-[80%] sm:block sm:flex sm:w-[100%] lg:w-[70%] lg:pt-11 lg2:w-[75%] xl:w-[80%] xl:pr-[50px] xl:pr-[66px]" />

      <div
        id="Tablet horizontal menu"
        className="mt-20 hidden sm:flex sm:flex-col lg:hidden"
      >
        <ul className="flex hidden flex-row flex-wrap text-gray-500 sm:flex sm:justify-center sm:gap-4 sm:text-center md:gap-8 lg:hidden">
          <li className="order-1 sm:order-2">
            <Link
              to="/about"
              className="block py-3 text-[18px] font-extralight transition-all duration-200 hover:text-black"
            >
              About
            </Link>
          </li>
          <li className="order-2 sm:order-3">
            <Link
              to="/projects"
              className="block py-3 text-[18px] font-extralight transition-all duration-300 hover:text-black"
            >
              Projects
            </Link>
          </li>
          <li className="order-3 sm:order-4">
            <Link
              to="/photography"
              className="block py-3 text-[18px] font-extralight transition-all duration-200 hover:text-black"
            >
              Photography
            </Link>
          </li>
          <li className="order-4 sm:order-5">
            <Link
              to="/videography"
              className="block py-3 text-[18px] font-extralight transition-all duration-200 hover:text-black"
            >
              Videography
            </Link>
          </li>
          <li className="order-5 sm:order-1">
            <Link
              to="/slideshow"
              className="block py-3 text-[18px] font-extralight transition-all duration-100 hover:text-black"
            >
              Slideshow
            </Link>
          </li>
          <li className="order-6 sm:order-6">
            <Link
              to="/contact"
              className="block py-3 text-[18px] font-extralight transition-all duration-200 hover:text-black"
            >
              Contact
            </Link>
          </li>
        </ul>
        <ContactIcons className="mb-10 hidden sm:mt-10 sm:flex" />
      </div>
    </div>
  );
}
