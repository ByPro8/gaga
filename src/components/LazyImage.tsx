import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  // Tiny base64 blur image returned automatically by Sanity (metadata.lqip)
  blurPreviewUrl?: string;
  // Set eager={true} for main/fullscreen photos so they start downloading immediately
  eager?: boolean;
  // Explicit image fit prevents Tailwind "object-cover" from overriding "object-contain"
  fit?: "cover" | "contain";
  // Mark above-the-fold hero / active slide photos as high download priority
  highPriority?: boolean;
  className?: string;
  wrapperClassName?: string;
  style?: React.CSSProperties;
}

export default function LazyImage({
  src,
  alt,
  blurPreviewUrl,
  eager = false,
  fit = "cover",
  highPriority = false,
  className = "",
  wrapperClassName = "h-full w-full",
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

  const objectFitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={style}
    >
      {/* Instant blurred preview while the real WebP/AVIF photo downloads */}
      {blurPreviewUrl && !isLoaded && (
        <img
          src={blurPreviewUrl}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full scale-105 blur-md ${objectFitClass}`}
        />
      )}

      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={highPriority ? "high" : undefined}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`relative z-10 h-full w-full transition-opacity duration-200 ${objectFitClass} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}
