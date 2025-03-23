import Menu from "../components/Menu";
import MainImage from "../components/MainImage";
import TabletMenu from "../components/TabletMenu";
import GAGALENS from "../components/GAGALENS";

export default function Home() {
  return (
    <div className="flex h-screen w-full sm:flex-col lg:flex-row">
      {/* tablet GAGALENS */}
      <GAGALENS
        className="sm:pt-18 hidden text-center sm:mb-[60px] sm:block sm:pt-10 md:mb-[80px] lg:hidden"
        classNameG="text-[46px] sm:text-[60px] lg:text-[46px] sm:mb-2 "
        classNameB="text-[15xp] sm:text-[20px]"
      />
      {/* tablet GAGALENS /> */}

      {/*Normal menu and image  */}
      <Menu className="w-[100%] pt-10 text-center sm:hidden sm:w-[20%] sm:pl-10 sm:text-right lg:block lg:w-[30%] lg:pl-0 lg2:w-[25%] xl:w-[20%]" />
      <MainImage className="hidden w-[80%] sm:block sm:flex sm:w-[100%] lg:w-[70%] lg:pt-11 lg2:w-[75%] xl:w-[80%] xl:pr-[50px] xl:pr-[66px]" />
      {/*Normal menu and image />  */}

      {/* tablet menu */}
      <TabletMenu />
      {/* tablet menu /> */}
    </div>
  );
}
