import { useSiteSettings } from "../context/SiteSettingsContext";
import { buildOptimizedImageUrl } from "../lib/sanity";

export default function MobileBGIMG() {
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
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 sm:hidden"
    >
      <img
        src={imageSrc}
        alt=""
        loading="eager"
        decoding="async"
        className="h-full w-full object-cover"
      />
      {/* Soft white gallery wash so centered links and GAGALENS title stay effortlessly readable */}
      <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px]" />
    </div>
  );
}
