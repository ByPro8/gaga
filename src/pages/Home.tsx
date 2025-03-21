import Menu from "../components/Menu"
import MainImage from "../components/MainImage"
import { Link } from "react-router-dom"
import ContactIcons from "../components/ContactIcons"
import GAGALENS from "../components/GAGALENS"


export default function Home() {
    return (
        <div className="h-screen w-full flex sm:flex-col lg:flex-row">
            <GAGALENS
                className='hidden sm:block lg:hidden text-center sm:pt-18 sm:mb-[60px] md:mb-[80px] sm:pt-10 '
                classNameG="text-[46px] sm:text-[60px] lg:text-[46px] sm:mb-2 "
                classNameB="text-[15xp] sm:text-[20px]"
            />

            <Menu className="sm:w-[20%] w-[100%] text-center sm:text-right sm:pl-10 sm:hidden lg:block lg:w-[20%] pt-10" />
            <MainImage className="w-[80%] hidden sm:block sm:flex sm:w-[100%] lg:w-[80%]" />


            <div className="mt-20 hidden sm:flex sm:flex-col lg:hidden">
                <ul className="flex flex-row flex-wrap sm:gap-4 md:gap-8 text-gray-500 hidden sm:flex sm:justify-center sm:text-center lg:hidden">
                    <li className="order-1 sm:order-2">
                        <Link to="/about" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block">
                            About
                        </Link>
                    </li>
                    <li className="order-2 sm:order-3">
                        <Link to="/projects" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-300 block">
                            Projects
                        </Link>
                    </li>
                    <li className="order-3 sm:order-4">
                        <Link to="/photography" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block">
                            Photography
                        </Link>
                    </li>
                    <li className="order-4 sm:order-5">
                        <Link to="/videography" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block">
                            Videography
                        </Link>
                    </li>
                    <li className="order-5 sm:order-1">
                        <Link to="/slideshow" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-100 block">
                            Slideshow
                        </Link>
                    </li>
                    <li className="order-6 sm:order-6">
                        <Link to="/contact" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block">
                            Contact
                        </Link>
                    </li>
                </ul>
                <ContactIcons className="hidden sm:flex sm:mt-10" />
            </div>
        </div>)
}