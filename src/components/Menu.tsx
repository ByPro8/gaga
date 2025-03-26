import { Link } from "react-router-dom";
import GAGALENS from "./GAGALENS";
import ContactIcons from "./ContactIcons";

export default function Menu() {
  return (
    <div
      // hidden w-[100%] max-w-[300px] flex-col
      // text-center  sm:hidden sm:w-[20%] sm:pl-10 sm:text-right lg:block lg:flex lg:w-[25%] lg:pl-0 lg:pr-8 lg2:w-[20%] xl:w-[17%]
      //
      // mt-[40px] block w-[17%] flex-col text-right text-gray-500

      className="mt-[40px] block w-[17%] flex-col text-right text-gray-500"
    >
      <GAGALENS
        className="sm:hidden lg:block"
        classNameG="text-[46px] lg:text-[40px]"
        classNameB="text-[15px]"
      />

      <nav className="mt-[103px] flex-1 text-[19px] sm:mt-[0px] lg:mt-5">
        <ul className="flex flex-col">
          <li className="order-5">
            <Link
              to="/slideshow"
              className="block py-2 text-[20px] font-extralight transition-all duration-200 hover:text-black"
            >
              Slideshow
            </Link>
          </li>
          <li className="order-1">
            <Link
              to="/about"
              className="block py-2 text-[20px] font-extralight transition-all duration-200 hover:text-black"
            >
              About
            </Link>
          </li>
          <li className="order-2">
            <Link
              to="/projects"
              className="block py-2 text-[20px] font-extralight transition-all duration-200 hover:text-black"
            >
              Projects
            </Link>
          </li>
          <li className="order-3">
            <Link
              to="/photography"
              className="block py-2 text-[20px] font-extralight transition-all duration-200 hover:text-black"
            >
              Photography
            </Link>
          </li>
          <li className="order-4">
            <Link
              to="/videography"
              className="block py-2 text-[20px] font-extralight transition-all duration-200 hover:text-black"
            >
              Videography
            </Link>
          </li>

          <li className="order-6">
            <Link
              to="/contact"
              className="block py-2 text-[20px] font-extralight transition-all duration-200 hover:text-black"
            >
              Contact
            </Link>
          </li>
        </ul>
        <ContactIcons className="mt-32 lg:mt-0 lg:justify-end xl2:mt-[0px]" />
      </nav>
    </div>
  );
}
