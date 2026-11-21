import AboutTextImg from "../components/AboutTextImage";
import Menu from "../components/Menu";

export default function About() {
  return (
    <div className="mb-10 flex min-h-screen w-full flex-col pb-10 lg:flex-row">
      <Menu />
      <div className="mt-[60px] flex-1 lg:mx-10">
        <AboutTextImg className="mb-10 lg:max-w-[1300px]" />
      </div>
    </div>
  );
}
