import Menu from "../components/Menu";
import img from "../assets/images/main.webp";
import GAGALENS from "../components/GAGALENS";
import { Link } from "react-router-dom";

export default function Photography() {
  const images = [
    { src: img, desc: "დესცრიპტიონ" },
    { src: img, desc: "დესცრიპტიონ" },
    { src: img, desc: "დესცრიპტიონ" },
    { src: img, desc: "დესცრიპტიონ" },
    { src: img, desc: "დესცრიპტიონ" },
    { src: img, desc: "დესცრიპტიონ" },
    { src: img, desc: "დესცრიპტიონ" },
    { src: img, desc: "დესცრიპტიონ" },
    { src: img, desc: "დესცრიპტიონ" },
    { src: img, desc: "დესცრიპტიონ" },
  ];

  return (
    <div className="flex h-screen w-full flex-col text-gray-500 sm:flex-col lg:flex-row">
      {/* <div className="flex">
        <Link
          to="/"
          className="mr-auto bg-white pl-2 pt-4 text-gray-500 hover:text-gray-800"
        >
          Home
        </Link>
        <GAGALENS
          className="ml-auto pr-2 pt-4 text-[24px]"
          classNameG=""
          classNameB="hidden"
        />
      </div> */}

      <Menu className="w-[100%] pt-10 text-center sm:hidden sm:w-[20%] sm:pl-10 sm:text-right lg:block lg:w-[30%] lg:pl-0 lg2:w-[25%] xl:w-[20%]" />
      <div className="flex w-[100%] max-w-[1400px] flex-wrap justify-center gap-6 p-6 sm:w-[100%] lg:w-[70%] lg:pl-0 lg2:w-[75%] xl:w-[80%]">
        {images.map((img, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={img.src}
              alt={img.desc}
              className="h-[300px] w-[300px] rounded-lg object-cover shadow-md transition-all duration-300 hover:scale-105"
            />
            <span className="mt-2 text-lg font-semibold text-gray-700">
              {img.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
