import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import SliderImage, { type SlideImageItem } from "../components/SliderImage";
import GalleryDescription from "../components/GalleryDescription";
import BackToHome from "../components/BackToHome";
import {
  buildOptimizedImageUrl,
  fetchGalleries,
  getBlurPreviewUrl,
} from "../lib/sanity";
import type { CmsGallery } from "../types/cms";

interface FromAlbumSlidesProps {
  galleryType?: "album" | "photoStory";
  basePath?: string;
}

export default function FromAlbumSlides({
  galleryType = "album",
  basePath = "/photography",
}: FromAlbumSlidesProps) {
  const { albumId, photoId } = useParams<{
    albumId: string;
    photoId: string;
  }>();

  const [gallery, setGallery] = useState<CmsGallery | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // Convert Sanity photos into high-res slide items for SliderImage
  const slideImages: SlideImageItem[] = useMemo(() => {
    if (!gallery) return [];
    return gallery.photos.map((photo) => ({
      id: photo._key,
      src: buildOptimizedImageUrl(photo, { width: 2200, quality: 85 }),
      blurPreviewUrl: getBlurPreviewUrl(photo),
      cornerNote: photo.cornerNote,
      alt: photo.altText || photo.cornerNote || gallery.title,
    }));
  }, [gallery]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <Menu />
        <div className="flex flex-1 items-center justify-center p-10 text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <Menu />
        <div className="flex flex-1 items-center justify-center p-10 text-gray-500">
          Gallery not found.
        </div>
      </div>
    );
  }

  const startIndex = slideImages.findIndex((slide) => slide.id === photoId);
  if (startIndex === -1) {
    return (
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <Menu />
        <div className="flex flex-1 items-center justify-center p-10 text-gray-500">
          Photo not found.
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <Menu />
      <div className="flex flex-1 flex-col lg:overflow-y-auto">
        <h1 className="ml-10 mt-10 text-[29px] text-gray-500 lg:hidden">
          <BackToHome />
          {gallery.title}
        </h1>
        <div className="flex flex-1 flex-col">
          <div className="flex max-h-[500px] w-full md2:max-h-[545px] lg2:max-h-[620px] xl:max-h-[775px] xl2:max-h-[1065px]">
            <SliderImage
              images={slideImages}
              startIndex={startIndex}
              basePath={basePath}
            />
          </div>

          <div className="flex-1 p-6">
            <GalleryDescription
              mainDescription={gallery.mainDescription}
              secondaryNote={gallery.secondaryNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
