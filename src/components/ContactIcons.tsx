import instagramIcon from "../assets/images/logos/instagram.svg";
import linkedinIcon from "../assets/images/logos/Linkedin.svg";
import vimeoIcon from "../assets/images/logos/Vimeo.svg";
import { useSiteSettings } from "../context/SiteSettingsContext";

interface ContactIconsProps {
  className?: string;
  iconClassName?: string;
  align?: "left" | "center" | "right";
}

const ALIGN_CLASSES = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
} as const;

export default function ContactIcons({
  className = "",
  iconClassName = "",
  align = "center",
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
    <div
      className={`flex items-center gap-3 ${ALIGN_CLASSES[align]} ${className}`}
    >
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="inline-flex transition-opacity duration-200 hover:opacity-70"
        >
          <img
            src={social.icon}
            alt={social.name}
            className={`h-7 w-7 xl25:h-9 xl25:w-9 xxl:h-11 xxl:w-11 ${iconClassName}`}
          />
        </a>
      ))}
    </div>
  );
}
