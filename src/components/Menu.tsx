import { Link } from "react-router-dom";
import GAGALENS from "./GAGALENS";
import ContactIcons from "./ContactIcons";

interface MenuProps {
  isHome?: boolean;
}

export default function Menu({ isHome }: MenuProps) {
  const menuClassname =
    "block py-2 text-[20px] font-extralight transition-all duration-200 hover:text-black";
  return (
    <div
      className={`mt-[40px] block w-full min-w-[17%] flex-none flex-col text-center text-gray-500 lg:block lg:w-[200px] lg:min-w-[230px] lg:text-right xl:w-[17%] xl:max-w-[240px]`}
    >
      <GAGALENS
        className="font-bold lg:block"
        classNameG="text-[46px] lg:text-[40px]"
        classNameB="text-[15px]"
      />

      <nav
        className={`mt-[75px] flex-1 text-[19px] sm:mt-[0px] sm:hidden lg:mt-5 lg:block ${!isHome ? "hidden" : ""}`}
      >
        <ul className="flex flex-col">
          <li className="order-5">
            <Link to="/slideshow" className={menuClassname}>
              Slideshow
            </Link>
          </li>
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

          <li className="order-6">
            <Link to="/contact" className={menuClassname}>
              Contact
            </Link>
          </li>
        </ul>
        <ContactIcons className="mt-[30px] lg:mt-0 lg:justify-end xl2:mt-[0px]" />
      </nav>
    </div>
  );
}
