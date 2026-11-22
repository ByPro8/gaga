import { Link } from "react-router-dom";

interface GAGALENSProps {
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  showSubtitle?: boolean;
}

// Brand wordmark rendered with <span> elements so each page keeps a single semantic <h1>
export default function GAGALENS({
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  showSubtitle = true,
}: GAGALENSProps) {
  return (
    <Link
      to="/"
      className={`inline-flex flex-col text-inherit no-underline hover:text-inherit hover:no-underline focus:no-underline ${className}`}
    >
      <span className={`font-demi leading-none tracking-tight ${titleClassName}`}>
        GAGALENS
      </span>
      {showSubtitle && (
        <span className={`font-normal leading-snug ${subtitleClassName}`}>
          By Levan Gaga Kapanadze
        </span>
      )}
    </Link>
  );
}
