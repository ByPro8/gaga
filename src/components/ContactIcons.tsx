import insta from "../assets/images/logos/instagram.svg";
import linkedin from "../assets/images/logos/Linkedin.svg";
import vimeo from "../assets/images/logos/Vimeo.svg";

interface ContactIconsProps {
  className?: string;
  iconClassName?: string;
}

export default function ContactIcons({
  className = "",
  iconClassName = "",
}: ContactIconsProps) {
  return (
    <div className={`flex justify-center space-x-6 ${className}`}>
      <img
        src={insta}
        alt="Icon 1"
        className={`h-8 w-8 lg:w-[28px] ${iconClassName}`}
      />
      <img
        src={linkedin}
        alt="Icon 2"
        className={`h-8 w-8 lg:w-[28px] ${iconClassName}`}
      />
      <img
        src={vimeo}
        alt="Icon 3"
        className={`h-8 w-8 lg:w-[28px] ${iconClassName}`}
      />
    </div>
  );
}
