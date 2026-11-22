import { useEffect, useRef, useState } from "react";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { buildOptimizedImageUrl } from "../lib/sanity";

export default function MainImage() {
  const { settings } = useSiteSettings();
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Only watch the 2560px threshold so ultrawide monitors get a sharper Sanity image
  const [isUltraWide, setIsUltraWide] = useState(
    () => window.matchMedia("(min-width: 2560px)").matches,
  );
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 2560px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsUltraWide(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Load Home wallpaper directly from Sanity (auto-sized for standard vs 2560px+ screens)
  const imageSrc = settings?.homeWallpaper
    ? buildOptimizedImageUrl(settings.homeWallpaper, {
        width: isUltraWide ? 2800 : 1800,
        quality: 85,
      })
    : "";

  // Check if Safari/browser already loaded the image from cache so it never stays invisible
  useEffect(() => {
    const img = imageRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setIsImageLoaded(true);
    } else {
      setIsImageLoaded(false);
    }
  }, [imageSrc]);

  return (
    /* Top-aligned: sticks neatly below the nav on tablet, and flush with GAGALENS (52px) on desktop */
    <main className="hidden min-w-0 flex-1 items-start justify-center px-6 pb-8 pt-6 sm:flex lg:h-[100dvh] lg:justify-start lg:px-10 lg:pb-10 lg:pt-[52px] xl:px-12">
      {imageSrc && (
        <img
          ref={imageRef}
          src={imageSrc}
          alt="Levan Gaga Kapanadze portfolio wallpaper"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
          className={`max-h-[75dvh] w-auto max-w-full object-contain transition-opacity duration-300 lg:max-h-[calc(100dvh-92px)] ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </main>
  );
}
