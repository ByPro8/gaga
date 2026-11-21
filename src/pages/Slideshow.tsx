import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import TabletMenu from "../components/TabletMenu";
import SliderImage, { type SlideImageItem } from "../components/SliderImage";
import shuffleArray from "../functions/shuffleArr";
import {
  buildOptimizedImageUrl,
  fetchSlideshowPhotos,
  getBlurPreviewUrl,
} from "../lib/sanity";

export default function Slideshow() {
  const [slides, setSlides] = useState<SlideImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchSlideshowPhotos()
      .then((photos) => {
        if (!isMounted) return;

        // Build high-res slides only from photos Gaga checked "Include in Slideshow Page"
        let mappedSlides: SlideImageItem[] = photos.map((photo) => ({
          id: photo.photoKey,
          src: buildOptimizedImageUrl(photo.image, { width: 2200, quality: 85 }),
          blurPreviewUrl: getBlurPreviewUrl(photo.image),
          cornerNote: photo.cornerNote,
          alt: photo.altText || photo.galleryTitle,
        }));

        // Shuffle thoroughly for a fresh order on each visit
        for (let i = 0; i < 3; i++) {
          mappedSlides = shuffleArray(mappedSlides);
        }

        setSlides(mappedSlides);
      })
      .catch((error) => {
        console.error("Could not load Slideshow photos from Sanity:", error);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Menu />
      {isLoading ? (
        <div className="mx-auto flex flex-1 items-center justify-center p-10 text-gray-400">
          Loading...
        </div>
      ) : (
        <SliderImage images={slides} random={true} />
      )}
      <TabletMenu />
    </div>
  );
}
