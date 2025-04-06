import gaga from "../assets/about/GagaKapanadze.jpg";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface AboutTextImgProps {
  className?: string;
}

export default function AboutTextImg({ className = "" }: AboutTextImgProps) {
  const navigate = useNavigate();
  const BoldClassname = "text-[19px] font-bold";
  return (
    <div className={`mx-auto px-6 lg:px-0 ${className}`}>
      <h1 className="mb-[30px] text-[30px] text-gray-500 lg:mb-[48px] lg:block">
        <button
          onClick={() => navigate("/")}
          className="items-center rounded-md border-0 py-2 pr-4 text-gray-500 transition focus:outline-none focus:ring-0 active:outline-none lg:hidden"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>{" "}
        About
      </h1>
      <div>
        <img
          src={gaga}
          alt="Profile"
          className="sm:shape-[circle()] ms:h-[255px] float-center mx-auto mb-4 max-w-[325px] sm:float-right sm:ml-4 sm:w-[170px]"
        />
        <p className="text-xl text-gray-500">
          <span className={BoldClassname}>Levan Gaga Kapanadze</span> is a
          filmmaker, photographer, and media producer with over 15 years of
          experience in video production, photography, and media management. As
          the founder of <span className={BoldClassname}>Araki Production</span>
          , he has collaborated with international organizations such as{" "}
          <span className={BoldClassname}>UNFPA, UNDP, WHO, and USAID</span>, as
          well as various commercial brands and businesses. His work covers a
          wide range of topics, including gender equality, health, education,
          and social development, bringing complex issues to life through
          compelling visuals. His work has been showcased in exhibitions and
          publications, reflecting a deep passion for storytelling that informs
          and inspires. As the Media Studio Manager at Free University of
          Tbilisi, he has played a key role in shaping the university’s visual
          identity, producing high-quality educational content and promotional
          videos that enhance student engagement and academic outreach.
        </p>
      </div>
    </div>
  );
}
