import { Link } from "react-router-dom";
import ContactIcons from "./ContactIcons";

export default function TabletMenu() {
  return (
    <div
      id="Tablet horizontal menu"
      className="hidden sm:mt-[30px] sm:flex sm:flex-col md2:mt-16 lg:hidden"
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
  );
}
