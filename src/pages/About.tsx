import GAGALENS from "../components/GAGALENS";
import AboutTextImg from "../components/AboutTextImage";
import Menu from "../components/Menu";
import TabletMenu from "../components/TabletMenu";

export default function About() {
  return (
    <div className="mx-auto flex h-screen flex-col pt-6 lg:flex-row">
      <GAGALENS
        className="w-[100%] pt-8 text-center lg:hidden"
        classNameG="text-[46px]"
        classNameB="text-[15px]"
      />

      <Menu />
      <AboutTextImg className="pt-6 xl:ml-16" />

      <TabletMenu />
    </div>
  );
}
