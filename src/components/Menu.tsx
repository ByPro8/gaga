import { Link } from "react-router-dom";
import GAGALENS from "./GAGALENS";
import ContactIcons from "./ContactIcons";

interface MenuProps {
    className?: string;
}

export default function Menu({ className = "" }: MenuProps) {
    return <div className={`bg-white text-gray-500 flex flex-col ${className}`}>

        <GAGALENS className="sm:hidden lg:block" classNameB="text-[15px]" classNameG="text-[46px]" />

        <nav className="sm:mt-[0px] mt-[103px] flex-1">
            <ul className="flex flex-col">
                <li className="order-1 sm:order-2"><Link to="/about" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block">About</Link></li>
                <li className="order-2 sm:order-3"><Link to="/projects" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-300 block">Projects</Link></li>
                <li className="order-3 sm:order-4"><Link to="/photography" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block">Photography</Link></li>
                <li className="order-4 sm:order-5"><Link to="/videography" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block">Videography</Link></li>
                <li className="order-5 sm:order-1"><Link to="/slideshow" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-100 block">Slideshow</Link></li>
                <li className="order-6 sm:order-6"><Link to="/contact" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block">Contact</Link></li>
            </ul>
            <ContactIcons className="mt-32" />
        </nav>
    </div >
}