import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import PageContainer from "../components/PageContainer";
import Menu from "../components/Menu";
import ContentContainer from "../components/ContentContainer";
import { useSiteSettings } from "../context/SiteSettingsContext";
import {
  buildOptimizedImageUrl,
  fetchVideos,
  getBlurPreviewUrl,
} from "../lib/sanity";
import type { CmsVideo } from "../types/cms";

// Map Gaga's 3 / 4 / 5 videos-per-row choice from Sanity into responsive Tailwind columns
function getVideoGridClass(perRow: 3 | 4 | 5): string {
  if (perRow === 4) {
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }
  if (perRow === 5) {
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl_1500:grid-cols-5";
  }
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}

export default function Videography() {
  const { settings } = useSiteSettings();
  const [videos, setVideos] = useState<CmsVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchVideos()
      .then((data) => {
        if (isMounted) setVideos(data);
      })
      .catch((error) => {
        console.error("Could not load Videos from Sanity:", error);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const videosPerRow: 3 | 4 | 5 = settings?.videosPerRow ?? 3;

  return (
    <PageContainer>
      <Menu />
      <ContentContainer
        className={`grid gap-8 ${getVideoGridClass(videosPerRow)}`}
        title="Videography"
      >
        {isLoading ? (
          <p className="text-gray-400">Loading...</p>
        ) : videos.length === 0 ? (
          <p className="text-gray-400">No videos published yet.</p>
        ) : (
          videos.map((video, index) => {
            // Prefer Gaga's custom uploaded cover photo; fall back to Vimeo's thumbnail URL
            const customCoverUrl = buildOptimizedImageUrl(
              video.customCoverImage,
              { width: 700, quality: 82 },
            );
            const coverUrl = customCoverUrl || video.vimeoThumbnailUrl || "";
            const blurPreview = customCoverUrl
              ? getBlurPreviewUrl(video.customCoverImage)
              : undefined;

            return (
              <Link
                key={video._id}
                to={`/videography/${video.vimeoId}`}
                className="group flex flex-col"
              >
                <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gray-100 transition duration-300 group-hover:opacity-90">
                  {coverUrl && (
                    <LazyImage
                      src={coverUrl}
                      blurPreviewUrl={blurPreview}
                      alt={video.title}
                      eager={index < 3}
                    />
                  )}
                </div>
                <h2 className="mt-3 text-lg font-demi text-gray-700 transition-colors group-hover:text-black">
                  {video.title}
                </h2>
              </Link>
            );
          })
        )}
      </ContentContainer>
    </PageContainer>
  );
}
