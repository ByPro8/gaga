import { useEffect, useRef, useState } from "react";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { buildOptimizedImageUrl } from "../lib/sanity";

export default function MainImage() {
  const { settings } = useSiteSettings();
  const imageRef = useRef<HTMLImageElement | null>(null);

  const checkIsUltraWide = () => window.innerWidth >= 2560;
  const calculateMaxHeight = () =>
    checkIsUltraWide() ? window.innerHeight * 0.9 : window.innerHeight * 0.85;

  const [isUltraWide, setIsUltraWide] = useState(checkIsUltraWide);
  const [maxHeight, setMaxHeight] = useState(calculateMaxHeight);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsUltraWide(checkIsUltraWide());
      setMaxHeight(calculateMaxHeight());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load Home wallpaper directly from Sanity (auto-sized for normal vs 2560px+ screens)
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
    <div className="mx-auto hidden px-10 pb-[30px] sm:block lg:h-screen lg:pb-[40px] lg:pt-[60px]">
      <div className="relative w-full max-w-full">
        {imageSrc && (
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Levan Gaga Kapanadze portfolio wallpaper"
            loading="eager"
            decoding="async"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
            style={{ maxHeight: `${maxHeight}px` }}
            className={`mt-[48px] h-full w-full object-contain transition-opacity duration-300 lg:mt-0 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </div>
  );
}
