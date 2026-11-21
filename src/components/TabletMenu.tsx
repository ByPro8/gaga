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
      <ul className="hidden flex-row flex-wrap text-gray-500 sm:flex sm:justify-center sm:gap-4 sm:text-center md:gap-8 lg:hidden">
        <li>
          <Link to="/about" className={menuClassname}>
            About
          </Link>
        </li>
        <li>
          <Link to="/projects" className={menuClassname}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="/photography" className={menuClassname}>
            Photography
          </Link>
        </li>
        <li>
          <Link to="/photo-stories" className={menuClassname}>
            Photo Stories
          </Link>
        </li>
        <li>
          <Link to="/videography" className={menuClassname}>
            Videography
          </Link>
        </li>
        <li>
          <Link to="/slideshow" className={menuClassname}>
            Slideshow
          </Link>
        </li>
        <li>
          <Link to="/contact" className={menuClassname}>
            Contact
          </Link>
        </li>
      </ul>
      <ContactIcons className="mb-10 hidden sm:mt-4 sm:flex" />
    </div>
  );
}
