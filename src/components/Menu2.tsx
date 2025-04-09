import { Link } from "react-router-dom";
import GAGALENS from "./GAGALENS";
import ContactIcons from "./ContactIcons";

interface MenuProps {
  isHome?: boolean;
}

export default function Menu2({ isHome }: MenuProps) {
  const menuClassname =
    "block py-2 text-[24px] font-extralight transition-all duration-200 text-gray-600 hover:text-white";

  return (
    <div
      className={`block w-full min-w-[330px] min-w-[374px] flex-none flex-col pl-[36px] pr-10 pt-[40px] text-center text-black lg:block lg:w-[280px] lg:text-left lg2:w-[320px] xl:max-w-[320px]`}
    >
      <GAGALENS
        className="font-bold lg:block"
        classNameG="text-[60px] lg2:text-[50px] text-gaga1"
        classNameB="text-[15px] lg2:text-[18px] text-gray-600 justify-end"
      />

      <nav
        className={`mt-[75px] flex-1 text-[19px] sm:mt-[0px] sm:hidden lg:mt-5 lg:block ${!isHome ? "hidden" : ""}`}
      >
        <ul className="flex flex-col">
          <li className="order-1">
            <Link to="/" className={menuClassname}>
              Home 1
            </Link>
          </li>
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
        <ContactIcons className="mt-[30px] lg:mt-0 lg:justify-start xl2:mt-auto" />
      </nav>
    </div>
  );
}
