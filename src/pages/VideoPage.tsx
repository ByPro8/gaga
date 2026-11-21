import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import PageContainer from "../components/PageContainer";
import ContentContainer from "../components/ContentContainer";
import { fetchVideos } from "../lib/sanity";
import type { CmsVideo } from "../types/cms";

// Styles each Vimeo player frame according to its saved aspect ratio
function getVideoFrameStyle(ratio: string): React.CSSProperties {
  switch (ratio) {
    case "1/1":
      return { aspectRatio: "1 / 1", margin: "0 auto", maxHeight: "500px" };
    case "256/135":
      return { width: "100%", aspectRatio: "310 / 167", margin: "0 auto" };
    case "1024/429":
      return { width: "100%", aspectRatio: "1024 / 429", margin: "0 auto" };
    case "96/41":
      return { width: "100%", aspectRatio: "96 / 41", margin: "0 auto" };
    case "64/27":
      return { width: "100%", aspectRatio: "64 / 27", margin: "0 auto" };
    case "8/5":
      return { width: "100%", aspectRatio: "8 / 5", margin: "0 auto" };
    default: {
      // Also support any custom ratio like "4/3" or default to 16/9
      const validRatio = /^\d+\s*\/\s*\d+$/.test(ratio) ? ratio : "16 / 9";
      return { width: "100%", aspectRatio: validRatio, margin: "0 auto" };
    }
  }
}

export default function VideoPage() {
  const { vimeoId } = useParams<{ vimeoId: string }>();
  const [video, setVideo] = useState<CmsVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchVideos()
      .then((allVideos) => {
        if (!isMounted) return;
        const matched = allVideos.find((item) => item.vimeoId === vimeoId);
        setVideo(matched || null);
      })
      .catch((error) => {
        console.error("Could not load Video from Sanity:", error);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [vimeoId]);

  if (isLoading) {
    return (
      <PageContainer>
        <Menu />
        <ContentContainer title="Videography">
          <p className="text-gray-400">Loading...</p>
        </ContentContainer>
      </PageContainer>
    );
  }

  if (!video) {
    return (
      <PageContainer>
        <Menu />
        <ContentContainer title="Videography">
          <p className="text-gray-500">Video not found.</p>
        </ContentContainer>
      </PageContainer>
    );
  }

  const videoStyle = getVideoFrameStyle(video.aspectRatio || "16/9");

  return (
    <PageContainer>
      <Menu />
      <ContentContainer title={video.title}>
        <div className="relative w-full" style={videoStyle}>
          <iframe
            src={video.embedUrl}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute left-0 top-0 h-full w-full rounded-md border-none"
          />
        </div>

        <div className="mt-6">
          <h1 className="text-2xl font-demi text-gray-700">{video.title}</h1>
          {video.description && (
            <p className="mt-3 whitespace-pre-line text-lg text-gray-600">
              {video.description}
            </p>
          )}
        </div>
      </ContentContainer>
    </PageContainer>
  );
}
