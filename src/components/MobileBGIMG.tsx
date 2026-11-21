import { useSiteSettings } from "../context/SiteSettingsContext";
import { buildOptimizedImageUrl } from "../lib/sanity";

const MobileBGIMG = () => {
  const { settings } = useSiteSettings();

  // Prefer the optional Mobile wallpaper from Sanity; otherwise reuse the main Home wallpaper
  const mobileWallpaper = settings?.mobileWallpaper || settings?.homeWallpaper;

  const imageSrc = mobileWallpaper
    ? buildOptimizedImageUrl(mobileWallpaper, {
        width: 1000,
        quality: 82,
      })
    : "";

  if (!imageSrc) {
    return null;
  }

  return (
    <img
      src={imageSrc}
      alt="Background"
      loading="eager"
      decoding="async"
      className="fixed inset-0 -z-10 h-full w-full object-cover sm:hidden"
    />
  );
};

export default MobileBGIMG;
