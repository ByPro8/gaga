import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import videosData from "../site/videos.json";
import LazyImage from "../components/LazyImage";
import { VideoType } from "../types/video";
import PageContainer from "../components/PageContainer";
import Menu from "../components/Menu";
import ContentContainer from "../components/ContentContainer";

const Videography = () => {
  const [thumbnails, setThumbnails] = useState<VideoType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setThumbnails(
      videosData.map(({ id, thumbnail, hash, aspectRatio, title }) => ({
        id,
        thumbnail,
        hash,
        aspectRatio,
        title,
      })),
    );
  }, []);

  return (
    <PageContainer>
      <Menu />
      <ContentContainer
        className="grid grid-cols-2 gap-8"
        title="Home"
        button={false}
      >
        {thumbnails.map(({ id, thumbnail, hash, title }) => (
          <div key={id} className="flex flex-col">
            <div
              className="relative flex aspect-[16/9] cursor-pointer items-center justify-center"
              onClick={() => navigate(`/videography/${id}`)}
            >
              <LazyImage
                src={thumbnail}
                hash={hash}
                alt={`Vimeo Thumbnail ${id}`}
                className="max-h-full max-w-full"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <h1 className="mt-3 text-xl font-demi text-gray-700">{title}</h1>
          </div>
        ))}
      </ContentContainer>
    </PageContainer>
  );
};

export default Videography;
