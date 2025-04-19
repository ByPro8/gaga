import { Link } from "react-router-dom";
import GAGALENS from "./GAGALENS";
import ContactIcons from "./ContactIcons";

interface MenuProps {
  isHome?: boolean;
}

export default function Menu({ isHome }: MenuProps) {
  const menuClassname =
    "block py-2 text-[20px] xxl:text-[34px] font-extralight transition-all duration-500 text-gray-500 sm:text-gray-400 hover:text-black xl25:text-[25px]";
  return (
    <div
      className={`xl25:w-[470px] xxl:w-[600px] block w-full min-w-[17%] flex-none flex-col pt-[50px] text-center text-gray-400 lg:block lg:w-[280px] lg:min-w-[230px] lg:text-right lg2:w-[330px] xl:w-[350px] xl2:w-[400px]`}
    >
      <GAGALENS
        className="select-none font-bold lg:block"
        classNameG="text-[46px] lg2:text-[50px] xl25:text-[64px] xxl:text-[80px] text-gaga1 select-none"
        classNameB="text-[15px] lg2:text-[18px] xxl:text-[30px] xl25:text-[22px] no-underline hover:text-gray-400 select-none"
      />
      <nav
        className={`xxl:mt-[40px] mt-[50px] flex-1 text-[19px] sm:mt-[0px] sm:mt-[75px] sm:hidden lg:mt-[18px] lg:block ${!isHome ? "hidden" : ""}`}
      >
        <ul className="flex select-none flex-col">
          <li className="order-5">
            <Link to="/slideshow" className={menuClassname}>
              Slideshow
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
        <ContactIcons className="mt-[30px] select-none lg:mt-[8px] lg:justify-end xl2:mt-[8px]" />
      </nav>
    </div>
  );
}
