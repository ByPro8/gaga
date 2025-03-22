import GAGALENS from "../components/GAGALENS";
import Menu from "../components/Menu";
import gaga from "../assets/about//GagaKapanadze.jpg";
export default function About() {
  return (
    <div className="flex h-screen w-full flex-col">
      <GAGALENS
        className="w-[100%] pt-8 text-center"
        classNameG="text-[46px]"
        classNameB="text-[15px]"
      />
      <div className="mt-10 items-center justify-center px-10">
        <img src={gaga} alt="Picture" />
      </div>

      <h1>
        Levan Gaga Kapanadze is a filmmaker, photographer, and media producer
        with over 15 years of experience in video production, photography, and
        media management. As the founder of Araki Production, he has
        collaborated with international organizations such as UNFPA, UNDP, WHO,
        and USAID, as well as various commercial brands and businesses. His work
        covers a wide range of topics, including gender equality, health,
        education, and social development, bringing complex issues to life
        through compelling visuals. As the Media Studio Manager at Free
        University of Tbilisi, he has played a key role in shaping the
        university’s visual identity, producing high-quality educational content
        and promotional videos that enhance student engagement and academic
        outreach. His work has been showcased in exhibitions and publications,
        reflecting a deep passion for storytelling that informs and inspires
      </h1>

      {/* <Menu className="w-[100%] pt-10 text-center sm:hidden sm:w-[20%] sm:pl-10 sm:text-right lg:block lg:w-[30%] lg:pl-0 lg2:w-[25%] xl:w-[20%]" /> */}
      {/* <div className="w-[80%] sm:block sm:flex sm:w-[100%] lg:w-[70%] lg:pt-11 lg2:w-[75%] xl:w-[80%] xl:pr-[50px] xl:pr-[66px]"></div> */}
    </div>
  );
}
