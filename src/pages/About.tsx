// import GAGALENS from "../components/GAGALENS";
import AboutTextImg from "../components/AboutTextImage";
import Menu from "../components/Menu";
// import TabletMenu from "../components/TabletMenu";

export default function About() {
  return (
    <div className="mb-10 flex min-h-screen w-full flex-col pb-10 lg:flex-row">
      <Menu />
      <img
        src="/home.webp"
        alt="Background"
        className="fixed inset-0 -z-10 h-full w-full object-cover blur-3xl"
      />
      <div className="mt-12 flex-1 lg:mx-16">
        <AboutTextImg className="mx-auto mb-10 lg:max-w-[1300px]" />
      </div>
    </div>
  );
}
