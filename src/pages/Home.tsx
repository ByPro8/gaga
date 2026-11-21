import Menu from "../components/Menu";
import MainImage from "../components/MainImage";
import TabletMenu from "../components/TabletMenu";
import MobileBGIMG from "../components/MobileBGIMG";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <MobileBGIMG />
      {/* Content on top of background */}
      <div className="z-10 flex min-h-screen w-full sm:flex-col lg:flex-row">
        <Menu isHome={true} />
        <MainImage />
        <TabletMenu />
      </div>
    </div>
  );
}
