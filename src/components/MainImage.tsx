import { useState, useEffect } from "react";

export default function MainImage() {
  const isUltraWide = () => window.innerWidth >= 2560;
  const getInitialMaxHeight = () =>
    isUltraWide() ? window.innerHeight * 0.9 : window.innerHeight * 0.85;

  const [imageSrc, setImageSrc] = useState("/home.webp");
  const [maxHeight, setMaxHeight] = useState(getInitialMaxHeight());

  useEffect(() => {
    const updateSize = () => {
      const newMaxHeight = isUltraWide()
        ? window.innerHeight * 0.9
        : window.innerHeight * 0.85;
      setMaxHeight(newMaxHeight);

      if (isUltraWide()) {
        const highRes = new Image();
        highRes.src = "/home-L.webp";

        // Once loaded, switch to high-res image
        highRes.onload = () => {
          setImageSrc("/home-L.webp");
        };
      } else {
        setImageSrc("/home.webp");
      }
    };

    updateSize(); // Run on mount
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="mx-auto hidden px-10 pb-[40px] sm:block lg:h-screen lg:pb-[100px] lg:pt-[60px]">
      <div className="relative w-full max-w-full">
        <img
          src={imageSrc}
          alt=""
          style={{ maxHeight: `${maxHeight}px` }}
          className="mt-[48px] h-full w-full object-contain lg:mt-0"
        />
      </div>
    </div>
  );
}
