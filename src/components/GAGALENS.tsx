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
    <Link to="/" className={`${className}`}>
      <div className="font-bold">
        <h1 className={`text-gaga4 ${classNameG}`}> GAGALENS</h1>
        <h1 className={`font-extralight text-black ${classNameB}`}>
          {" "}
          By Levan Gaga Kapanadze
        </h1>
      </div>
    </Link>
  );
}
