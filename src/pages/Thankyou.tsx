// import GAGALENS from "../components/GAGALENS";
import AboutTextImg from "../components/AboutTextImage";
import BackToHome from "../components/BackToHome";
// import TabletMenu from "../components/TabletMenu";

export default function Thankyou() {
  return (
    <div className="mb-10 flex min-h-screen w-full flex-col pb-10 lg:flex-row">
      <BackToHome />

      <div className="mt-12 flex-1 lg:mx-16">
        <AboutTextImg className="mx-auto mb-10 lg:max-w-[1300px]" />
      </div>
    </div>
  );
}
