import { Link } from "react-router-dom";
import GAGALENS from "./GAGALENS";
import ContactIcons from "./ContactIcons";

interface MenuProps {
  isHome?: boolean;
}

export default function Menu({ isHome }: MenuProps) {
  const menuClassname =
    "block py-2 text-[20px] font-extralight transition-all duration-200 text-gray-400 hover:text-black";
  return (
    <div
      className={`block w-full min-w-[17%] flex-none flex-col pt-[50px] text-center text-gray-600 lg:block lg:w-[280px] lg:min-w-[230px] lg:text-right lg2:w-[320px] xl:max-w-[320px]`}
    >
      <GAGALENS
        className="font-bold lg:block"
        classNameG="text-[46px] lg2:text-[50px] text-gaga1"
        classNameB="text-[15px] lg2:text-[18px] no-underline hover:text-gray-500"
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
            <Link to="/home2" className={menuClassname}>
              HOME 2
            </Link>
          </li>
          <li className="order-2">
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
