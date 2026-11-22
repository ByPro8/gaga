import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  // Tiny base64 blur image returned automatically by Sanity (metadata.lqip)
  blurPreviewUrl?: string;
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
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // When the photo URL changes (or on first mount in Safari with a cached image),
  // check if the browser ALREADY finished loading it so we never get stuck on the blur!
  useEffect(() => {
    const img = imageRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  return (
    <div className="relative h-full w-full overflow-hidden" style={style}>
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
        ref={imageRef}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`relative z-10 h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}
