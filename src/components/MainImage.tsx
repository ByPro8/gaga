import { useState, useEffect } from "react";

export default function MainImage() {
  const [maxHeight, setMaxHeight] = useState(window.innerHeight * 0.9);

  useEffect(() => {
    const updateHeight = () => setMaxHeight(window.innerHeight * 0.9);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="h-screen px-10 pb-[100px] pt-10">
      <div className="relative w-full max-w-full">
        <img
          src="/home.webp"
          alt=""
          style={{ maxHeight: `${maxHeight}px` }}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
