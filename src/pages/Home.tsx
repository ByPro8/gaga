import Menu from "../components/Menu";
import MainImage from "../components/MainImage";
import TabletMenu from "../components/TabletMenu";
import GAGALENS from "../components/GAGALENS";

export default function Home() {
  return (
    <div className="flex h-screen w-full max-w-[1760px] sm:flex-col lg:flex-row">
      {/* tablet GAGALENS */}
      <GAGALENS
        className="sm:pt-18 hidden text-center sm:mb-[60px] sm:block sm:pt-10 md:mb-[80px] lg:hidden"
        classNameG="text-[46px] sm:text-[60px] lg:text-[46px] sm:mb-2 "
        classNameB="text-[15xp] sm:text-[20px]"
      />
      {/* tablet GAGALENS /> */}

      {/*Normal menu and image  */}
      <Menu />
      <MainImage />
      {/*Normal menu and image />  */}

      {/* tablet menu */}
      <TabletMenu />
      {/* tablet menu /> */}
    </div>
  );
}
