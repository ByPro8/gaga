import { Link } from "react-router-dom";
import GAGALENS from "./GAGALENS";
import ContactIcons from "./ContactIcons";

interface MenuProps {
  className?: string;
}

export default function Menu({ className = "" }: MenuProps) {
  return (
    <div
      className={`flex flex-col bg-white text-gray-500 lg:pr-8 ${className}`}
    >
      <GAGALENS
        className="sm:hidden lg:mb-[34px] lg:block"
        classNameB="text-[15px]"
        classNameG="text-[46px]"
      />

      <nav className="mt-[103px] flex-1 sm:mt-[0px] lg2:mt-[75px]">
        <ul className="flex flex-col">
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
        <ContactIcons className="xl2:mt-[0px] mt-32 lg:mt-0 lg:justify-end lg2:mt-[123px] xl:mt-[0px]" />
      </nav>
    </div>
  );
}
