import Menu from "../components/Menu";
import MainImage from "../components/MainImage";
import TabletMenu from "../components/TabletMenu";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full sm:flex-col lg:flex-row">
      <Menu isHome={true} />
      <MainImage />
      <TabletMenu />
    </div>
  );
}
