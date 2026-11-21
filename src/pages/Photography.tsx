import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import LazyImage from "../components/LazyImage";
import PageContainer from "../components/PageContainer";
import ContentContainer from "../components/ContentContainer";
import { useSiteSettings } from "../context/SiteSettingsContext";
import {
  buildOptimizedImageUrl,
  fetchGalleries,
  getBlurPreviewUrl,
} from "../lib/sanity";
import type { CmsGallery } from "../types/cms";

interface PhotographyProps {
  // Reuse this exact page for both Photography ("album") and Photo Stories ("photoStory")
  galleryType?: "album" | "photoStory";
  basePath?: string;
  pageTitle?: string;
}

// Map Gaga's 1 / 2 / 3 per-row choice from Sanity into responsive Tailwind grid columns
function getGridColumnsClass(perRow: 1 | 2 | 3): string {
  if (perRow === 1) return "grid-cols-1";
  if (perRow === 3) return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2";
}

export default function Photography({
  galleryType = "album",
  basePath = "/photography",
  pageTitle = "Photography",
}: PhotographyProps) {
  const { settings } = useSiteSettings();
  const [galleries, setGalleries] = useState<CmsGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchGalleries(galleryType)
      .then((data) => {
        if (isMounted) setGalleries(data);
      })
      .catch((error) => {
        console.error(`Could not load ${galleryType} list from Sanity:`, error);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [galleryType]);

  // Read grid density from Sanity Site Settings (defaults to 2 per row)
  const itemsPerRow: 1 | 2 | 3 =
    galleryType === "photoStory"
      ? (settings?.storiesPerRow ?? 2)
      : (settings?.albumsPerRow ?? 2);

  // Request appropriately sized cover images based on how large each card is on screen
  const coverImageWidth = itemsPerRow === 1 ? 1400 : itemsPerRow === 2 ? 900 : 700;

  return (
    <PageContainer>
      <Menu />
      <ContentContainer
        className={`grid gap-8 ${getGridColumnsClass(itemsPerRow)}`}
        title={pageTitle}
      >
        {isLoading ? (
          <p className="text-gray-400">Loading...</p>
        ) : galleries.length === 0 ? (
          <p className="text-gray-400">No items published yet.</p>
        ) : (
          galleries.map((gallery) => {
            const coverUrl = buildOptimizedImageUrl(gallery.coverImage, {
              width: coverImageWidth,
              quality: 82,
            });
            const blurPreview = getBlurPreviewUrl(gallery.coverImage);

            return (
              <Link
                key={gallery._id}
                to={`${basePath}/${encodeURIComponent(gallery.title)}`}
                className="group block"
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gray-100 transition duration-300 group-hover:opacity-90">
                  {coverUrl && (
                    <LazyImage
                      src={coverUrl}
                      blurPreviewUrl={blurPreview}
                      alt={gallery.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* Gallery title and optional year(s) below the cover photo */}
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h2 className="text-lg text-gray-700 transition-colors group-hover:text-black">
                    {gallery.title}
                  </h2>
                  {gallery.years && (
                    <span className="shrink-0 text-sm text-gray-400">
                      {gallery.years}
                    </span>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </ContentContainer>
    </PageContainer>
  );
}
