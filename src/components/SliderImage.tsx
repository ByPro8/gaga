import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LazyImage from "./LazyImage";

export interface SlideImageItem {
  id: string;
  src: string;
  alt?: string;
  desc?: string;
  // Optional short note shown in the bottom corner when viewing this photo fullscreen
  cornerNote?: string;
  // Optional tiny blur preview from Sanity
  blurPreviewUrl?: string;
}

interface SliderImageProps {
  images: SlideImageItem[];
  random?: boolean;
  startIndex?: number;
  // Base URL for updating the browser link when moving between photos (e.g. "/photography" or "/photo-stories")
  basePath?: string;
}

export default function SliderImage({
  images,
  random = false,
  startIndex = 0,
  basePath = "/photography",
}: SliderImageProps) {
  const navigate = useNavigate();
  const { albumId } = useParams();

  const [maxHeight, setMaxHeight] = useState(() => window.innerHeight * 0.9);
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (images.length === 0) return 0;
    if (random) return Math.floor(Math.random() * images.length);
    return Math.min(Math.max(startIndex, 0), images.length - 1);
  });

  // Sync current index if the URL changes to a different photo
  useEffect(() => {
    if (!random && images.length > 0) {
      setCurrentIndex(Math.min(Math.max(startIndex, 0), images.length - 1));
    }
  }, [startIndex, random, images.length]);

  // Update max image height when the browser window is resized
  useEffect(() => {
    const updateHeight = () => setMaxHeight(window.innerHeight * 0.9);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Preload ONLY the next and previous photos (instead of all 50+ photos at once)
  useEffect(() => {
    if (images.length <= 1) return;

    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    const nextPreload = new Image();
    nextPreload.src = images[nextIndex].src;

    if (prevIndex !== nextIndex) {
      const prevPreload = new Image();
      prevPreload.src = images[prevIndex].src;
    }
  }, [currentIndex, images]);

  const showNextImage = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((previousIndex) => {
      const nextIndex = (previousIndex + 1) % images.length;
      if (!random && albumId) {
        navigate(`${basePath}/${encodeURIComponent(albumId)}/${images[nextIndex].id}`);
      }
      return nextIndex;
    });
  }, [images, random, albumId, navigate, basePath]);

  const showPreviousImage = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((previousIndex) => {
      const prevIndex = (previousIndex - 1 + images.length) % images.length;
      if (!random && albumId) {
        navigate(`${basePath}/${encodeURIComponent(albumId)}/${images[prevIndex].id}`);
      }
      return prevIndex;
    });
  }, [images, random, albumId, navigate, basePath]);

  // Allow Left and Right keyboard arrows to switch photos
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") showNextImage();
      if (event.key === "ArrowLeft") showPreviousImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showNextImage, showPreviousImage]);

  if (images.length === 0) {
    return (
      <div className="mx-auto flex flex-1 items-center justify-center p-10 text-gray-500">
        No photos to display yet.
      </div>
    );
  }

  const activePhoto = images[currentIndex] || images[0];
  const cornerNoteText = activePhoto.cornerNote;

  return (
    <div className="mx-auto mt-10 px-6 pb-[40px] sm:block sm:px-10 lg:mt-0 lg:h-screen lg:pb-[100px] lg:pt-[55px]">
      <div className="relative w-full max-w-full">
        <LazyImage
          src={activePhoto.src}
          blurPreviewUrl={activePhoto.blurPreviewUrl}
          alt={activePhoto.alt || activePhoto.desc || "Portfolio photo"}
          eager={true}
          className="h-full w-full object-contain lg:mt-0"
          style={{ maxHeight: `${maxHeight}px` }}
        />

        {/* Optional short corner note set by Gaga in Sanity */}
        {cornerNoteText && (
          <div className="pointer-events-none absolute bottom-3 right-3 z-20 max-w-[75%] rounded bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur-sm sm:text-sm">
            {cornerNoteText}
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Previous photo"
              className="absolute left-0 top-0 z-10 flex h-full w-[50px] items-center justify-center rounded-none border-0 text-gray-500 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-0 active:bg-black/30 active:outline-none sm:w-[70px]"
            >
              <ArrowLeft className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>

            <button
              type="button"
              onClick={showNextImage}
              aria-label="Next photo"
              className="absolute right-0 top-0 z-10 flex h-full w-[50px] items-center justify-center rounded-none border-0 text-gray-500 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-0 active:bg-black/30 active:outline-none sm:w-[70px]"
            >
              <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
