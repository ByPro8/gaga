import { useEffect, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  // Tiny base64 blur image returned automatically by Sanity (metadata.lqip)
  blurPreviewUrl?: string;
  // Kept optional for temporary compatibility with pages not yet switched to Sanity
  hash?: string;
  // Set eager={true} for main/fullscreen photos so they start downloading immediately
  eager?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function LazyImage({
  src,
  alt,
  blurPreviewUrl,
  eager = false,
  className = "",
  style,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset fade-in state whenever the photo URL changes (e.g. clicking Next in the slider)
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={style}
    >
      {/* Instant blurred preview while the real WebP/AVIF photo downloads */}
      {blurPreviewUrl && !isLoaded && (
        <img
          src={blurPreviewUrl}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-md"
        />
      )}

      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`relative z-10 h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}
