import { useState, useEffect } from "react";

export default function MainImage() {
  const [maxHeight, setMaxHeight] = useState(window.innerHeight * 0.9);

  useEffect(() => {
    const updateHeight = () => setMaxHeight(window.innerHeight * 0.9);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="hidden px-10 pb-[40px] sm:block lg:h-screen lg:pb-[100px] lg:pt-10">
      <div className="relative w-full max-w-full">
        <img
          src="/home.webp"
          alt=""
          style={{ maxHeight: `${maxHeight}px` }}
          className="mt-[48px] h-full w-full object-contain lg:mt-0"
        />
      </div>
    </div>
  );
}
