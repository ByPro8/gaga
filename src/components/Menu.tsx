import { Link } from "react-router-dom";
import GAGALENS from "./GAGALENS";
import ContactIcons from "./ContactIcons";

export default function Menu() {
  return (
    <div className="font-custom mt-[40px] block w-full min-w-[17%] flex-col text-center text-gray-500 sm:hidden md2:text-right lg:block lg:w-[200px] lg:min-w-[230px] xl:w-[17%]">
      <GAGALENS
        className="font-bold sm:hidden lg:block"
        classNameG="text-[46px] lg:text-[40px]"
        classNameB="text-[15px]"
      />

      <nav className="mt-[75px] flex-1 text-[19px] sm:mt-[0px] lg:mt-5">
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
        <ContactIcons className="mt-[30px] lg:mt-0 lg:justify-end xl2:mt-[0px]" />
      </nav>
    </div>
  );
}
