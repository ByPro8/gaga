import { Link } from "react-router-dom";
import ContactIcons from "./ContactIcons";

export default function TabletMenu() {
  const menuClassname =
    "block py-3 text-[18px] font-extralight transition-all duration-200 hover:text-black";
  return (
    <div
      id="Tablet horizontal menu"
      className="hidden sm:flex sm:flex-col lg:hidden"
    >
      <ul className="flex hidden flex-row flex-wrap text-gray-500 sm:flex sm:justify-center sm:gap-4 sm:text-center md:gap-8 lg:hidden">
        <li className="order-1">
          <Link to="/about" className={menuClassname}>
            About
          </Link>
        </li>
        <li className="order-2">
          <Link to="/projects" className={menuClassname}>
            Projects
          </Link>
        </li>
        <li className="order-3">
          <Link to="/photography" className={menuClassname}>
            Photography
          </Link>
        </li>
        <li className="order-4">
          <Link to="/videography" className={menuClassname}>
            Videography
          </Link>
        </li>
        <li className="order-5">
          <Link to="/slideshow" className={menuClassname}>
            Slideshow
          </Link>
        </li>
        <li className="order-6">
          <Link to="/contact" className={menuClassname}>
            Contact
          </Link>
        </li>
      </ul>
      <ContactIcons className="mb-10 hidden sm:mt-10 sm:flex" />
    </div>
  );
}
