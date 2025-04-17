import { Link } from "react-router-dom";

interface GAGALENSProps {
  className?: string;
  classNameG?: string;
  classNameB?: string;
}

export default function GAGALENS({
  className = "",
  classNameG = "",
  classNameB = "",
}: GAGALENSProps) {
  return (
    <Link
      to="/"
      className={`${className} text-inherit hover:text-inherit hover:no-underline focus:no-underline`}
    >
      <div className="flex flex-col font-bold">
        <h1 className={`font-demi text-gaga1 ${classNameG}`}>GAGALENS</h1>
        <h1
          className={`font-extralight lg:self-end ${classNameB} text-inherit no-underline hover:text-inherit`}
        >
          By Levan Gaga Kapanadze
        </h1>
      </div>
    </Link>
  );
}
