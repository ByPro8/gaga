import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface SlideImageItem {
  id: string;
  src: string;
  alt?: string;
  // Optional short note set by Gaga in Sanity
  cornerNote?: string;
  // Optional tiny blur preview from Sanity
  blurPreviewUrl?: string;
}

interface SliderImageProps {
  images: SlideImageItem[];
  startIndex?: number;
  // "top" aligns the photo's top edge with GAGALENS / tablet nav; "center" centers it in fullscreen lightbox
  align?: "top" | "center";
  // Called cleanly from user events (never inside setState) when the active slide changes
  onSlideChange?: (nextIndex: number, activeSlide: SlideImageItem) => void;
  // Optional Escape key handler (e.g. close fullscreen viewer back to album)
  onEscape?: () => void;
  className?: string;
}

export default function SliderImage({
  images,
  startIndex = 0,
  align = "center",
  onSlideChange,
  onEscape,
  className = "",
}: SliderImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (images.length === 0) return 0;
    return Math.min(Math.max(startIndex, 0), images.length - 1);
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync currentIndex if parent changes startIndex (e.g. browser back/forward)
  useEffect(() => {
    if (images.length > 0) {
      const clamped = Math.min(Math.max(startIndex, 0), images.length - 1);
      setCurrentIndex(clamped);
    }
  }, [startIndex, images.length]);

  const activePhoto = images[currentIndex] || images[0];

  // If the preloaded or cached image is already ready, show it immediately with zero blur flash
  useEffect(() => {
    const img = imageRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [activePhoto?.src]);

  // Preload the next 2 photos and previous 1 photo in the background so arrow clicks feel instant
  useEffect(() => {
    if (images.length <= 1) return;

    const offsetsToPreload = images.length > 2 ? [1, 2, -1] : [1];
    const preloadedIndices = new Set<number>();

    for (const offset of offsetsToPreload) {
      const idx = (currentIndex + offset + images.length) % images.length;
      if (idx === currentIndex || preloadedIndices.has(idx)) continue;
      preloadedIndices.add(idx);

      const preload = new Image();
      preload.src = images[idx].src;
    }
  }, [currentIndex, images]);

  const goToOffset = useCallback(
    (offset: number) => {
      if (images.length <= 1) return;
      const nextIndex = (currentIndex + offset + images.length) % images.length;
      setCurrentIndex(nextIndex);
      onSlideChange?.(nextIndex, images[nextIndex]);
    },
    [currentIndex, images, onSlideChange],
  );

  const showNextImage = useCallback(() => goToOffset(1), [goToOffset]);
  const showPreviousImage = useCallback(() => goToOffset(-1), [goToOffset]);

  // Keyboard shortcuts: Left / Right arrows to browse, Escape to return to album
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") showNextImage();
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "Escape" && onEscape) onEscape();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showNextImage, showPreviousImage, onEscape]);

  // Phone touch-swipe handlers (horizontal swipe switches photos without hijacking vertical scroll)
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || images.length <= 1) return;

    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    // Only trigger swipe when gesture is clearly horizontal and exceeds 45px
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        showNextImage();
      } else {
        showPreviousImage();
      }
    }
  };

  if (images.length === 0 || !activePhoto) {
    return (
      <div className="flex flex-1 items-center justify-center p-10 text-gray-400">
        No photos to display yet.
      </div>
    );
  }

  const isTopAligned = align === "top";
  const stageAlignClass = isTopAligned ? "items-start" : "items-center";
  // Keep arrows at a steady spot in the stage whether the photo is loading, portrait, or landscape
  const arrowVerticalClass = isTopAligned
    ? "top-[36%] -translate-y-1/2"
    : "top-1/2 -translate-y-1/2";

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative flex h-full min-h-[280px] w-full flex-1 select-none justify-center ${stageAlignClass} ${className}`}
    >
      {/* Left navigation arrow */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={showPreviousImage}
          aria-label="Previous photo"
          className={`absolute left-1 z-20 flex h-11 w-11 items-center justify-center rounded-full border-0 bg-white/85 text-gray-500 transition-colors hover:bg-white hover:text-gray-900 focus:outline-none sm:left-2 sm:h-12 sm:w-12 ${arrowVerticalClass}`}
        >
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}

      {/* Photo stage with clean horizontal breathing room for the arrows */}
      <div
        className={`relative flex h-full w-full justify-center px-12 sm:px-16 ${stageAlignClass}`}
      >
        {activePhoto.blurPreviewUrl && !isLoaded && (
          <img
            src={activePhoto.blurPreviewUrl}
            alt=""
            aria-hidden="true"
            className="pointer-events-none max-h-full max-w-full object-contain opacity-60 blur-md"
          />
        )}

        <img
          ref={imageRef}
          src={activePhoto.src}
          alt={activePhoto.alt || "Portfolio photo"}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={`max-h-full max-w-full object-contain transition-opacity duration-200 ${
            isLoaded ? "opacity-100" : "absolute opacity-0"
          }`}
        />
      </div>

      {/* Right navigation arrow */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={showNextImage}
          aria-label="Next photo"
          className={`absolute right-1 z-20 flex h-11 w-11 items-center justify-center rounded-full border-0 bg-white/85 text-gray-500 transition-colors hover:bg-white hover:text-gray-900 focus:outline-none sm:right-2 sm:h-12 sm:w-12 ${arrowVerticalClass}`}
        >
          <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}
    </div>
  );
}
