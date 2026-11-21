import instagramIcon from "../assets/images/logos/instagram.svg";
import linkedinIcon from "../assets/images/logos/Linkedin.svg";
import vimeoIcon from "../assets/images/logos/Vimeo.svg";
import { useSiteSettings } from "../context/SiteSettingsContext";

interface ContactIconsProps {
  className?: string;
  iconClassName?: string;
}

export default function ContactIcons({
  className = "",
  iconClassName = "",
}: ContactIconsProps) {
  const { settings } = useSiteSettings();

  // Only show social icons that have a link filled in inside Sanity Site Settings
  const socialLinks = [
    { name: "Instagram", url: settings?.instagramUrl, icon: instagramIcon },
    { name: "LinkedIn", url: settings?.linkedinUrl, icon: linkedinIcon },
    { name: "Vimeo", url: settings?.vimeoUrl, icon: vimeoIcon },
  ].filter((link) => Boolean(link.url));

  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <div className={`flex justify-center space-x-3 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="transition-opacity duration-200 hover:opacity-70"
        >
          <img
            src={social.icon}
            alt={social.name}
            className={`xxl:h-12 xxl:w-12 xl25:h-[35px] xl25:w-[35px] h-8 w-8 lg:w-[28px] ${iconClassName}`}
          />
        </a>
      ))}
    </div>
  );
}
