import { useEffect, useState } from "react";
import videosData from "../site/videos.json";
import LazyImage from "../components/LazyImage";
import { VideoType } from "../types/video";
import PageContainer from "../components/PageContainer";
import Menu from "../components/Menu";
import ContentContainer from "../components/ContentContainer";
import { X } from "lucide-react";

const Videography = () => {
  const [thumbnails, setThumbnails] = useState<VideoType[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedVideoAspectRatio, setSelectedVideoAspectRatio] = useState<
    string | null
  >(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    // Dynamically set max height based on the window size
    const updateHeight = () => {
      setMaxHeight(window.innerHeight * 0.9); // Max height is 90% of the screen height
    };

    updateHeight(); // Set initial height
    window.addEventListener("resize", updateHeight); // Update height on resize

    return () => window.removeEventListener("resize", updateHeight); // Clean up on unmount
  }, []);

  useEffect(() => {
    setThumbnails(
      videosData.map(({ id, thumbnail, hash, aspectRatio, title }) => ({
        id,
        thumbnail,
        hash,
        aspectRatio, // Add aspect ratio data
        title,
      })),
    );
  }, []);

  const handleThumbnailClick = (id: string, aspectRatio: string) => {
    console.log(id);
    setSelectedVideoId(id);
    setSelectedVideoAspectRatio(aspectRatio); // Set aspect ratio when video is clicked
  };

  const closeOverlay = () => {
    setSelectedVideoId(null);
    setSelectedVideoAspectRatio(null); // Reset aspect ratio when overlay is closed
  };

  return (
    <PageContainer>
      <Menu />
      <ContentContainer
        className="grid-cols-1 lg:grid-cols-2"
        title="Home"
        button={false}
      >
        {thumbnails.map(({ id, thumbnail, hash, aspectRatio, title }) => (
          <div className="flex flex-col">
            <div
              key={id}
              className="relative flex aspect-[16/9] cursor-pointer items-center justify-center"
              onClick={() => handleThumbnailClick(id, aspectRatio)} // Pass aspect ratio here
            >
              <LazyImage
                src={thumbnail}
                hash={hash}
                alt={`Vimeo Thumbnail ${id}`}
                className="max-h-full max-w-full"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <h1 className="mt-3 text-xl font-bold text-black text-gray-500">
              {title}
            </h1>
          </div>
        ))}
      </ContentContainer>

      {/* Overlay */}
      {selectedVideoId && selectedVideoAspectRatio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
          <button
            onClick={closeOverlay}
            className="absolute right-4 top-4 z-50 text-white hover:text-gray-300"
          >
            <X size={36} />
          </button>

          {/* Video player with dynamic max-height */}
          <div
            className="relative w-[90vw] max-w-[1680px]"
            style={{
              maxHeight: `${maxHeight}px`, // Apply the dynamic max-height
              aspectRatio: selectedVideoAspectRatio || "16/9", // Use aspect ratio dynamically
            }}
          >
            <iframe
              src={`https://player.vimeo.com/video/${selectedVideoId}`}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute left-0 top-0 h-full w-full rounded-xl"
            />
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Videography;
