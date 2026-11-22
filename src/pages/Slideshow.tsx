import { useCallback, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import Menu from "../components/Menu";
import SliderImage, { type SlideImageItem } from "../components/SliderImage";
import shuffleArray from "../functions/shuffleArr";
import {
  buildOptimizedImageUrl,
  fetchSlideshowPhotos,
  getBlurPreviewUrl,
  getResponsiveSlideWidth,
} from "../lib/sanity";

export default function Slideshow() {
  const [slides, setSlides] = useState<SlideImageItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [slideWidth] = useState(getResponsiveSlideWidth);

  useEffect(() => {
    let isMounted = true;

    fetchSlideshowPhotos()
      .then((photos) => {
        if (!isMounted) return;

        let mappedSlides: SlideImageItem[] = photos.map((photo) => ({
          id: photo.photoKey,
          src: buildOptimizedImageUrl(photo.image, {
            width: slideWidth,
            quality: 85,
          }),
          blurPreviewUrl: getBlurPreviewUrl(photo.image),
          cornerNote: photo.cornerNote,
          alt: photo.altText || photo.galleryTitle,
        }));

        // Shuffle for a fresh random sequence on every visit
        mappedSlides = shuffleArray(mappedSlides);

        setSlides(mappedSlides);
        setActiveIndex(0);
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
  }, [slideWidth]);

  const handleSlideChange = useCallback((nextIndex: number) => {
    setActiveIndex(nextIndex);
  }, []);

  const activeNote = slides[activeIndex]?.cornerNote;

  return (
    <PageContainer>
      {/* Desktop shows the active photo's optional note at the bottom-left under the side menu */}
      <Menu bottomNote={activeNote} />

      {/* Top-aligned: sticks neatly below the nav on mobile/tablet, and flush with GAGALENS (52px) on desktop */}
      <main className="flex min-h-0 flex-1 flex-col bg-white px-4 pb-8 pt-6 sm:px-8 sm:pt-6 lg:h-[100dvh] lg:px-10 lg:pb-10 lg:pt-[52px] xl:px-12">
        <h1 className="sr-only">Slideshow</h1>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center p-10 text-gray-400">
            Loading...
          </div>
        ) : (
          <>
            <div className="flex h-[68dvh] min-h-0 w-full shrink-0 lg:h-full lg:flex-1">
              <SliderImage
                images={slides}
                startIndex={activeIndex}
                align="top"
                onSlideChange={handleSlideChange}
              />
            </div>

            {/* On mobile & tablet (where the desktop sidebar is hidden), show the photo note neatly below */}
            {activeNote && (
              <p className="mt-4 px-2 text-left text-sm leading-relaxed text-gray-500 lg:hidden">
                {activeNote}
              </p>
            )}
          </>
        )}
      </main>
    </PageContainer>
  );
}
