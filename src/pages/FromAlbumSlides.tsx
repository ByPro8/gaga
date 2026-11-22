import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SliderImage, { type SlideImageItem } from "../components/SliderImage";
import {
  buildOptimizedImageUrl,
  fetchGalleries,
  getBlurPreviewUrl,
  getResponsiveSlideWidth,
} from "../lib/sanity";
import type { CmsGallery } from "../types/cms";

interface FromAlbumSlidesProps {
  galleryType?: "album" | "photoStory";
  basePath?: string;
}

// Clean fullscreen white-gallery photo viewer (side menu intentionally hidden)
export default function FromAlbumSlides({
  galleryType = "album",
  basePath = "/photography",
}: FromAlbumSlidesProps) {
  const navigate = useNavigate();
  const { albumId, photoId } = useParams<{
    albumId: string;
    photoId: string;
  }>();

  const [gallery, setGallery] = useState<CmsGallery | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [slideWidth] = useState(getResponsiveSlideWidth);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchGalleries(galleryType)
      .then((allGalleries) => {
        if (!isMounted) return;
        const matched = allGalleries.find((item) => item.title === albumId);
        setGallery(matched || null);
      })
      .catch((error) => {
        console.error("Could not load gallery slides from Sanity:", error);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [galleryType, albumId]);

  const slideImages: SlideImageItem[] = useMemo(() => {
    if (!gallery) return [];
    return gallery.photos.map((photo) => ({
      id: photo._key,
      src: buildOptimizedImageUrl(photo, { width: slideWidth, quality: 85 }),
      blurPreviewUrl: getBlurPreviewUrl(photo),
      cornerNote: photo.cornerNote,
      alt: photo.altText || photo.cornerNote || gallery.title,
    }));
  }, [gallery, slideWidth]);

  const albumPath = albumId
    ? `${basePath}/${encodeURIComponent(albumId)}`
    : basePath;

  const currentIndex = useMemo(() => {
    const found = slideImages.findIndex((slide) => slide.id === photoId);
    return found === -1 ? 0 : found;
  }, [slideImages, photoId]);

  const handleSlideChange = useCallback(
    (_nextIndex: number, activeSlide: SlideImageItem) => {
      if (!albumId) return;
      // Replace history entry so browser Back returns cleanly to the album grid
      navigate(
        `${basePath}/${encodeURIComponent(albumId)}/${activeSlide.id}`,
        { replace: true },
      );
    },
    [albumId, basePath, navigate],
  );

  const handleBackToAlbum = useCallback(() => {
    navigate(albumPath);
  }, [navigate, albumPath]);

  if (isLoading) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center bg-white p-8 text-gray-400">
        Loading...
      </div>
    );
  }

  if (!gallery || slideImages.length === 0) {
    return (
      <div className="flex h-[100dvh] w-full flex-col items-center justify-center gap-4 bg-white p-8 text-gray-500">
        <p>Photo not found.</p>
        <Link
          to={basePath}
          className="inline-flex items-center gap-2 text-sm text-gray-600 underline underline-offset-4 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to gallery
        </Link>
      </div>
    );
  }

  const activePhoto = slideImages[currentIndex] || slideImages[0];

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-white p-4 sm:p-7 lg:p-10">
      {/* Slim top margin bar: back to parent album on left, random all-albums slideshow on right */}
      <header className="mb-3 flex shrink-0 items-center justify-between gap-4 sm:mb-5">
        <Link
          to={albumPath}
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900 sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span className="truncate">{gallery.title}</span>
        </Link>

        <Link
          to="/slideshow"
          className="inline-flex shrink-0 items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-gray-900 sm:text-sm"
          title="View random photos from all albums"
        >
          <span>All Albums Slideshow</span>
          <ArrowRight className="h-3.5 w-3.5 text-gaga" />
        </Link>
      </header>

      {/* Main unobstructed photo stage */}
      <main className="flex min-h-0 flex-1">
        <SliderImage
          images={slideImages}
          startIndex={currentIndex}
          onSlideChange={handleSlideChange}
          onEscape={handleBackToAlbum}
        />
      </main>

      {/* Calm bottom margin: optional photo note on bottom-left, subtle counter on bottom-right */}
      <footer className="mt-3 flex min-h-[24px] shrink-0 items-end justify-between gap-6 sm:mt-5">
        <p className="max-w-[75%] text-xs leading-relaxed text-gray-500 sm:text-sm">
          {activePhoto?.cornerNote || ""}
        </p>

        {slideImages.length > 1 && (
          <span className="shrink-0 text-xs tabular-nums text-gray-400">
            {currentIndex + 1} / {slideImages.length}
          </span>
        )}
      </footer>
    </div>
  );
}
