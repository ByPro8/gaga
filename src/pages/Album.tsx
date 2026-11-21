import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import Menu from "../components/Menu";
import PageContainer from "../components/PageContainer";
import ContentContainer from "../components/ContentContainer";
import GalleryDescription from "../components/GalleryDescription";
import {
  buildOptimizedImageUrl,
  fetchGalleries,
  getBlurPreviewUrl,
} from "../lib/sanity";
import type { CmsGallery } from "../types/cms";

interface AlbumProps {
  // Reuse this exact page for both Photography albums and Photo Stories
  galleryType?: "album" | "photoStory";
  basePath?: string;
}

// Map Gaga's per-gallery 1 / 2 / 3 photos-per-row setting into Tailwind grid columns
function getPhotoGridClass(perRow: 1 | 2 | 3): string {
  if (perRow === 1) return "grid-cols-1";
  if (perRow === 3) return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2";
}

export default function Album({
  galleryType = "album",
  basePath = "/photography",
}: AlbumProps) {
  const { albumId } = useParams<{ albumId: string }>();
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
        console.error("Could not load gallery from Sanity:", error);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [galleryType, albumId]);

  if (isLoading) {
    return (
      <PageContainer>
        <Menu />
        <ContentContainer title={albumId || ""}>
          <p className="text-gray-400">Loading...</p>
        </ContentContainer>
      </PageContainer>
    );
  }

  if (!gallery) {
    return (
      <PageContainer>
        <Menu />
        <ContentContainer title="Not found">
          <p className="text-gray-500">Gallery not found.</p>
        </ContentContainer>
      </PageContainer>
    );
  }

  const photosPerRow: 1 | 2 | 3 = gallery.photosPerRow ?? 2;
  const photoWidth = photosPerRow === 1 ? 1600 : photosPerRow === 2 ? 1000 : 750;
  const encodedTitle = encodeURIComponent(gallery.title);

  const headerContent = (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline gap-3">
        <h1 className="text-2xl font-normal text-gray-700 sm:text-3xl">
          {gallery.title}
        </h1>
        {gallery.years && (
          <span className="text-base text-gray-400">{gallery.years}</span>
        )}
      </div>

      <GalleryDescription
        mainDescription={gallery.mainDescription}
        secondaryNote={gallery.secondaryNote}
      />
    </div>
  );

  return (
    <PageContainer>
      <Menu />
      <ContentContainer
        className={`grid gap-8 ${getPhotoGridClass(photosPerRow)}`}
        title={gallery.title}
        headerContent={headerContent}
      >
        {gallery.photos.length === 0 ? (
          <p className="text-gray-400">No photos in this gallery yet.</p>
        ) : (
          gallery.photos.map((photo) => {
            const photoUrl = buildOptimizedImageUrl(photo, {
              width: photoWidth,
              quality: 82,
            });
            const blurPreview = getBlurPreviewUrl(photo);

            return (
              <Link
                key={photo._key}
                to={`${basePath}/${encodedTitle}/${photo._key}`}
              >
                <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden">
                  <LazyImage
                    src={photoUrl}
                    blurPreviewUrl={blurPreview}
                    alt={photo.altText || photo.cornerNote || gallery.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              </Link>
            );
          })
        )}
      </ContentContainer>
    </PageContainer>
  );
}
