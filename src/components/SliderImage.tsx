import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import LazyImage from "./LazyImage";

interface Image {
  id: string;
  src: string;
  desc: string;
  imageHash: string;
}

interface SliderImageProps {
  images: Image[];
  random?: boolean;
  startIndex?: number;
}

export default function SliderImage({
  images,
  random,
  startIndex = 0,
}: SliderImageProps) {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [maxHeight, setMaxHeight] = useState(window.innerHeight * 0.9);
  const [currentIndex, setCurrentIndex] = useState(
    random ? Math.floor(Math.random() * images.length) : startIndex,
  );

  useEffect(() => {
    const updateHeight = () => {
      const screenWidth = window.innerWidth;
      let calculatedMaxHeight = window.innerHeight * 0.9; // Default maxHeight for large screens

      if (screenWidth < 1024) {
        calculatedMaxHeight = window.innerHeight * 0.6; // For smaller screens (<1024px)
      } else if (screenWidth >= 1024 && screenWidth < 1280) {
        calculatedMaxHeight = window.innerHeight * 0.6; // For screens between 1024px and 1280px
      } else if (screenWidth >= 1280 && screenWidth < 1440) {
        calculatedMaxHeight = window.innerHeight * 0.7; // For screens between 1280px and 1440px
      } else if (screenWidth >= 1440 && screenWidth < 1920) {
        calculatedMaxHeight = window.innerHeight * 0.8; // For screens between 1440px and 1920px
      } else if (screenWidth >= 1920) {
        calculatedMaxHeight = window.innerHeight * 0.9; // For screens 1920px and above
      }

      setMaxHeight(calculatedMaxHeight);
    };

    window.addEventListener("resize", updateHeight);

    // Initial call on component mount to set the values
    updateHeight();

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    images.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % images.length;
      if (!random) navigate(`/photography/${albumId}/${images[newIndex].id}`);
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + images.length) % images.length;
      if (!random) navigate(`/photography/${albumId}/${images[newIndex].id}`);
      return newIndex;
    });
  };

  return (
    <div className="s5 mx-auto mt-10 px-6 pb-[40px] sm:block sm:px-10 lg:mt-0 lg:h-screen lg:pb-[100px] lg:pt-[60px]">
      <div className="s6 relative w-full max-w-full shadow-2xl">
        <LazyImage
          src={images[currentIndex].src}
          hash={images[currentIndex].imageHash}
          alt={images[currentIndex].desc}
          className="h-full w-full object-contain lg:mt-0"
          style={{ maxHeight: `${maxHeight}px` }}
        />

        <button
          onClick={prevImage}
          className="absolute left-0 top-0 flex h-full w-[50px] items-center justify-center rounded-none border-0 text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-0 active:bg-black/30 active:outline-none sm:w-[70px]"
        >
          <ArrowLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-0 top-0 flex h-full w-[50px] items-center justify-center rounded-none border-0 text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-0 active:bg-black/30 active:outline-none sm:w-[70px]"
        >
          <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  );
}
