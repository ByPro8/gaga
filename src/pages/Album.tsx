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

// Map Gaga's per-gallery 1 / 2 / 3 photos-per-row setting into responsive grid columns
function getPhotoGridClass(perRow: 1 | 2 | 3): string {
  if (perRow === 1) return "grid-cols-1 max-w-[960px] gap-10";
  if (perRow === 3) return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8";
  return "grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8";
}

export default function Album({
  galleryType = "album",
  basePath = "/photography",
}: AlbumProps) {
  const { albumId } = useParams<{ albumId: string }>();
  const [gallery, setGallery] = useState<CmsGallery | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const parentSectionLabel =
    galleryType === "photoStory" ? "Back to Photo Stories" : "Back to Photography";

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
        <ContentContainer
          title={albumId || ""}
          backTo={basePath}
          backLabel={parentSectionLabel}
        >
          <p className="text-gray-400">Loading...</p>
        </ContentContainer>
      </PageContainer>
    );
  }

  if (!gallery) {
    return (
      <PageContainer>
        <Menu />
        <ContentContainer
          title="Not found"
          showTitleOnDesktop={true}
          backTo={basePath}
          backLabel={parentSectionLabel}
        >
          <p className="text-gray-500">Gallery not found.</p>
        </ContentContainer>
      </PageContainer>
    );
  }

  const photosPerRow: 1 | 2 | 3 = gallery.photosPerRow ?? 2;
  const photoWidth = photosPerRow === 1 ? 1400 : photosPerRow === 2 ? 950 : 700;
  const encodedTitle = encodeURIComponent(gallery.title);

  const hasDescription =
    Boolean(gallery.mainDescription && gallery.mainDescription.length > 0) ||
    Boolean(gallery.secondaryNote && gallery.secondaryNote.trim().length > 0);

  // On desktop (lg+), show the album title, years & description cleanly under the left sidebar menu
  // so the photos start flush at the top aligned with GAGALENS (no duplicate title or back arrow).
  const desktopSidebarInfo = (
    <div>
      <div className="mb-2.5 flex flex-wrap items-baseline justify-end gap-x-2">
        <span className="text-base font-demi text-gray-700">
          {gallery.title}
        </span>
        {gallery.years && (
          <span className="text-xs text-gray-400">{gallery.years}</span>
        )}
      </div>
      {hasDescription && (
        <GalleryDescription
          mainDescription={gallery.mainDescription}
          secondaryNote={gallery.secondaryNote}
          compact={true}
        />
      )}
    </div>
  );

  return (
    <PageContainer>
      <Menu sidebarContent={desktopSidebarInfo} />
      <ContentContainer
        title={gallery.title}
        titleMeta={gallery.years}
        showTitleOnDesktop={false}
        backTo={basePath}
        backLabel={parentSectionLabel}
        headerContent={
          hasDescription ? (
            <GalleryDescription
              mainDescription={gallery.mainDescription}
              secondaryNote={gallery.secondaryNote}
            />
          ) : undefined
        }
        hideHeaderOnDesktop={true}
        className={`grid ${getPhotoGridClass(photosPerRow)}`}
      >
        {gallery.photos.length === 0 ? (
          <p className="text-gray-400">No photos in this gallery yet.</p>
        ) : (
          gallery.photos.map((photo, index) => {
            const photoUrl = buildOptimizedImageUrl(photo, {
              width: photoWidth,
              quality: 82,
            });
            const blurPreview = getBlurPreviewUrl(photo);

            return (
              <Link
                key={photo._key}
                to={`${basePath}/${encodedTitle}/${photo._key}`}
                className="group block transition-opacity duration-200 hover:opacity-90"
              >
                {photosPerRow === 1 ? (
                  /* 1-per-row: cap height to 78dvh and never crop so the whole image fits cleanly on screen */
                  <div className="flex w-full items-center justify-start">
                    <LazyImage
                      src={photoUrl}
                      blurPreviewUrl={blurPreview}
                      alt={photo.altText || photo.cornerNote || gallery.title}
                      fit="contain"
                      eager={index === 0}
                      wrapperClassName="w-full"
                      className="max-h-[78dvh] w-auto max-w-full"
                    />
                  </div>
                ) : (
                  /* 2-per-row & 3-per-row: aligned 3:2 gallery frames with full uncropped photo */
                  <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden">
                    <LazyImage
                      src={photoUrl}
                      blurPreviewUrl={blurPreview}
                      alt={photo.altText || photo.cornerNote || gallery.title}
                      fit="contain"
                      eager={index < 2}
                    />
                  </div>
                )}
              </Link>
            );
          })
        )}
      </ContentContainer>
    </PageContainer>
  );
}
