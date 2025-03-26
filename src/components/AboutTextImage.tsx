import gaga from "../assets/about/GagaKapanadze.jpg";

interface AboutTextImgProps {
  className?: string;
}

export default function AboutTextImg({ className = "" }: AboutTextImgProps) {
  return (
    <div className={`mx-auto px-6 lg:px-0 ${className}`}>
      <h1 className="mb-[48px] hidden text-[30px] text-black lg:block">
        ABOUT
      </h1>
      <div>
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
      </div>
    </div>
  );
}
