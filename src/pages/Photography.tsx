import Menu from "../components/Menu";
import img from "../assets/images/main.webp";
import GAGALENS from "../components/GAGALENS";
import { Link } from "react-router-dom";
import ContactIcons from "../components/ContactIcons";

export default function Photography() {
  const images = [
    { src: img, desc: "somewhere over the rainbow" },
    { src: img, desc: "somewhere over the rainbow" },
    { src: img, desc: "somewhere over the rainbow" },
    { src: img, desc: "somewhere over the rainbow" },
    { src: img, desc: "somewhere over the rainbow" },
    { src: img, desc: "somewhere over the rainbow" },
    { src: img, desc: "somewhere over the rainbow" },
    { src: img, desc: "somewhere over the rainbow" },
    { src: img, desc: "somewhere over the rainbow" },
    { src: img, desc: "somewhere over the rainbow" },
  ];

  return (
    <div className="flex h-screen w-full flex-col text-gray-500 sm:flex-col lg:flex-row">
      {/* <div className="flex">
        <Link
          to="/"
          className="mr-auto bg-white pl-4 pt-4 font-light text-gray-500 hover:text-gray-800"
        >
          Menu
        </Link>
        <div className="flex flex-col">
          <h1 className="pr-4 pt-4 italic text-gaga1">GAGALENS</h1>
          <ContactIcons
            className="justify-start space-x-2"
            iconClassName="w-3 h-3"
          />
        </div>
      </div> */}

      <Menu className="hidden w-[100%] pt-10 text-center sm:hidden sm:w-[20%] sm:pl-10 sm:text-right lg:block lg:w-[30%] lg:pl-0 lg2:w-[25%] xl:w-[20%]" />
      <div className="flex w-[100%] max-w-[1400px] flex-wrap justify-center gap-6 p-6 sm:w-[100%] lg:w-[70%] lg:pl-0 lg2:w-[75%] xl:w-[80%]">
        {images.map((img, index) => (
          <div key={index} className="items-left flex flex-col">
            <img
              src={img.src}
              alt={img.desc}
              className="h-[300px] w-[300px] object-cover shadow-md transition-all duration-300 hover:scale-105"
            />
            <span className="mt-2 text-sm font-normal text-gray-500">
              {img.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
