import { Link } from "react-router-dom";
import insta from '../assets/images/logos/instagram-outline-svgrepo-com.svg';
import linkedin from '../assets/images/logos/linkedin-svgrepo-com.svg';
import vimeo from '../assets/images/logos/vimeo-svgrepo-com.svg';

interface MenuProps {
    className?: string;
}

export default function Menu({ className = "" }: MenuProps) {
    return <div className={`bg-white text-gray-500 flex flex-col ${className}`}>
        <Link to='/'>
            <div className="text-black">
                <h1 className=" text-black text-[46px] font-normal italic text-gaga1 "> GAGALENS</h1>
                <h1 className=" text-black text-[15xp] font-extralight text-black "> By Levan Gaga Kapanadze</h1>
                {/* ///////////// <Link to="/" className="hover:text-gray-300">Home</Link> ////////// */}
            </div>
        </Link>

        <nav className="mt-[103px] flex-1">
            <ul className=''>
                <Link to="/slideshow" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-100 block">Slideshow</Link>
                <Link to="/about" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block ">About</Link>
                <Link to="/projects" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-300 block">Projects</Link>
                <Link to="/photography" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block">Photography</Link>
                <Link to="/videography" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block">Videography</Link>
                <Link to="/contact" className="py-3 font-extralight text-[18px] hover:text-black transition-all duration-200 block mt-10 ">Contact</Link>
            </ul>
            <div className="flex justify-center space-x-6 mt-12">
                <img src={insta} alt="Icon 1" className="w-10 h-10" />
                <img src={linkedin} alt="Icon 2" className="w-10 h-10" />
                <img src={vimeo} alt="Icon 3" className="w-10 h-10" />
            </div>
        </nav>
    </div>
}