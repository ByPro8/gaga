import GAGALENS from "../components/GAGALENS";
import gaga from "../assets/about//GagaKapanadze.jpg";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="flex h-screen w-full flex-col">
      <GAGALENS
        className="w-[100%] pt-8 text-center"
        classNameG="text-[46px]"
        classNameB="text-[15px]"
      />
      {/* <div className="mt-10 items-center justify-center sm:hidden">
        <img src={gaga} alt="Picture" className="px-8" />
      </div>
      <h1 className="text-blac mt-10 bg-white px-8 pb-10 text-gray-500 sm:hidden">
        <strong>Levan Gaga Kapanadze</strong> is a filmmaker, photographer, and
        media producer with over 15 years of experience in video production,
        photography, and media management. As the founder of{" "}
        <strong>Araki Production</strong>, he has collaborated with
        international organizations such as{" "}
        <strong>UNFPA, UNDP, WHO, and USAID</strong>, as well as various
        commercial brands and businesses. His work covers a wide range of
        topics, including gender equality, health, education, and social
        development, bringing complex issues to life through compelling visuals.
        <h1>
          <br />
          <strong>
            As the Media Studio Manager at Free University of Tbilisi
          </strong>
          , he has played a key role in shaping the university’s visual
          identity, producing high-quality educational content and promotional
          videos that enhance student engagement and academic outreach.{" "}
        </h1>{" "}
        <br />
        <h1>
          His work has been showcased in exhibitions and publications, As the
          Media Studio Manager at Free reflecting a deep passion for
          storytelling that informs and inspires
        </h1>
        <div className="mt-4 flex justify-end">
          <Link
            to="/projects"
            className="bg-white text-gray-500 hover:text-black"
          >
            Check my Projects --<span>&gt;</span>
          </Link>
        </div>
      </h1> */}
      ////////////////////////////////////// ///////////// ////////////
      <div className="mx-auto max-w-3xl p-6">
        <img
          src={gaga}
          alt="Profile"
          className="sm:shape-[circle()] ms:h-[255px] float-center mx-auto mb-4 max-w-[325px] sm:float-right sm:ml-4 sm:w-[170px]"
        />
        <p className="text-lg text-gray-500">
          <strong>Levan Gaga Kapanadze</strong> is a filmmaker, photographer,
          and media producer with over 15 years of experience in video
          production, photography, and media management. As the founder of{" "}
          <strong>Araki Production</strong>, he has collaborated with
          international organizations such as{" "}
          <strong>UNFPA, UNDP, WHO, and USAID</strong>, as well as various
          commercial brands and businesses. His work covers a wide range of
          topics, including gender equality, health, education, and social
          development, bringing complex issues to life through compelling
          visuals. His work has been showcased in exhibitions and publications,
          reflecting a deep passion for storytelling that informs and inspires.
          As the Media Studio Manager at Free University of Tbilisi, he has
          played a key role in shaping the university’s visual identity,
          producing high-quality educational content and promotional videos that
          enhance student engagement and academic outreach.
        </p>
        <div className="mt-4 flex justify-end">
          <Link
            to="/projects"
            className="bg-white text-gray-500 hover:text-black"
          >
            Check my Projects --<span>&gt;</span>
          </Link>
        </div>
      </div>
      /////////// ////////////
      {/* <Menu className="w-[100%] pt-10 text-center sm:hidden sm:w-[20%] sm:pl-10 sm:text-right lg:block lg:w-[30%] lg:pl-0 lg2:w-[25%] xl:w-[20%]" /> */}
      {/* <div className="w-[80%] sm:block sm:flex sm:w-[100%] lg:w-[70%] lg:pt-11 lg2:w-[75%] xl:w-[80%] xl:pr-[50px] xl:pr-[66px]"></div> */}
    </div>
  );
}
