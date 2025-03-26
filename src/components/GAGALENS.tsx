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
      <div className="text-black">
        <h1 className={`font-bold text-gaga1 ${classNameG}`}> GAGALENS</h1>
        <h1 className={`font-extralight text-black ${classNameB}`}>
          {" "}
          By Levan Gaga Kapanadze
        </h1>
      </div>
    </Link>
  );
}
