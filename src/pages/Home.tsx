import Menu from "../components/Menu";
import MainImage from "../components/MainImage";
import TabletMenu from "../components/TabletMenu";

export default function Home() {
  return (
    // <div className="z-11 flex min-h-screen w-full sm:flex-col lg:flex-row">
    //   <Menu isHome={true} />
    //   {/* <MainImage /> */}
    //   <div className="relative z-10">
    //     <img
    //       src="/home.webp"
    //       alt="Background"
    //       className="fixed left-0 top-0 -z-10 h-full w-full object-cover"
    //     />
    //   </div>
    //   <TabletMenu />
    // </div>
    <div className="relative min-h-screen w-full">
      {/* Background image */}
      <img
        src="/home.webp"
        alt="Background"
        className="fixed inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Content on top of background */}
      <div className="z-10 flex min-h-screen w-full sm:flex-col lg:flex-row">
        <Menu isHome={true} />
        <TabletMenu />
        {/* other components */}
      </div>
    </div>
  );
}
