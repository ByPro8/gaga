import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface ImageSliderProps {
  random?: boolean;
  images: { id: string; src: string; desc: string; imageHash: string }[];
  startIndex?: number;
}

export function Slider({ random, images, startIndex = 0 }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(startIndex);
  const navigate = useNavigate();
  const { albumId } = useParams();

  function showNextImage() {
    setImageIndex((index) => {
      const nextIndex = index === images.length - 1 ? 0 : index + 1;
      if (!random) navigate(`/photography/${albumId}/${images[nextIndex].id}`);
      return nextIndex;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      const prevIndex = index === 0 ? images.length - 1 : index - 1;
      if (!random) navigate(`/photography/${albumId}/${images[prevIndex].id}`);
      return prevIndex;
    });
  }

  return (
    <div className="py-10">
      <div className="relative w-full">
        <div className="flex w-full overflow-hidden">
          {images.map(({ src, desc }, index) => (
            <img
              key={src}
              src={src}
              alt={desc}
              aria-hidden={imageIndex !== index}
              className="h-full w-full shrink-0 grow-0 object-cover transition-transform duration-100 ease-in-out"
              style={{ transform: `translateX(${-100 * imageIndex}%)` }}
            />
          ))}
        </div>
        <button
          onClick={showPrevImage}
          className="absolute bottom-0 left-0 top-0 border-0 p-4 transition-colors ease-in-out focus:outline-none"
        >
          <ArrowLeft className="h-8 w-8 text-white" />
        </button>
        <button
          onClick={showNextImage}
          className="absolute bottom-0 right-0 top-0 border-0 p-4 transition-colors ease-in-out focus:outline-none"
        >
          <ArrowRight className="h-8 w-8 text-white" />
        </button>
        <div id="after-image-slider-controls" />
      </div>
    </div>
  );
}
