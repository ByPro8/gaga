import Menu from "../components/Menu";
import MainImage from "../components/MainImage";
import MobileBGIMG from "../components/MobileBGIMG";

export default function Home() {
  return (
    <div className="relative isolate flex min-h-[100dvh] w-full flex-col lg:h-[100dvh] lg:flex-row lg:overflow-hidden">
      {/* Single semantic heading for SEO & screen readers on the Home page */}
      <h1 className="sr-only">GAGALENS — Levan Gaga Kapanadze</h1>

      {/* Mobile-only full-bleed background photo with soft readability wash */}
      <MobileBGIMG />

      {/* Unified responsive navigation (mobile centered, tablet top bar, desktop sidebar) */}
      <Menu isHome={true} />

      {/* Tablet & desktop hero wallpaper */}
      <MainImage />
    </div>
  );
}
