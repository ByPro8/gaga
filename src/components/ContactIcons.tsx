import insta from "../assets/images/logos/instagram-outline-svgrepo-com.svg"
import linkedin from "../assets/images/logos/linkedin-svgrepo-com-new.svg"
import vimeo from "../assets/images/logos/vimeo-svgrepo-com.svg"

interface ContactIconsProps {
    className?: string;
}

export default function ContactIcons({ className = "" }: ContactIconsProps) {
    return <div className={`flex justify-center space-x-6 ${className}`}>
        <img src={insta} alt="Icon 1" className="w-8 h-8 lg:w-5" />
        <img src={linkedin} alt="Icon 2" className="w-8 h-8 lg:w-5" />
        <img src={vimeo} alt="Icon 3" className="w-8 h-8 lg:w-5" />
    </div>
}