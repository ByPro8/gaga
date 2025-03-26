import GAGALENS from "../components/GAGALENS";
import AboutTextImg from "../components/AboutTextImage";
import Menu from "../components/Menu";
import TabletMenu from "../components/TabletMenu";

export default function About() {
  return (
    <div className="flex min-h-screen w-full pt-6">
      {/* Menu */}
      <Menu />

      {/* About Text Image Section */}
      <div className="flex-1 pt-6 lg:ml-16">
        <AboutTextImg className="mx-auto lg:max-w-[1300px]" />
      </div>
    </div>
  );
}
