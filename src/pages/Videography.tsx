import { useEffect, useState } from "react";
import videosData from "../site/videos.json"; // Import JSON directly
import LazyImage from "../components/LazyImage"; // Import the LazyImage component
import { VideoType } from "../types/video"; // Import the VideoType
import PageContainer from "../components/PageContainer";
import Menu from "../components/Menu";
import ContentContainer from "../components/ContentContainer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Videography = () => {
  const [thumbnails, setThumbnails] = useState<VideoType[]>([]); // Use the VideoType here
  const navigate = useNavigate();

  useEffect(() => {
    // Extract ID, thumbnail, and hash from videos.json
    setThumbnails(
      videosData.map(({ id, thumbnail, hash }) => ({ id, thumbnail, hash })),
    );
  }, []);

  return (
    <PageContainer>
      <Menu />
      <ContentContainer>
        {thumbnails.map(({ id, thumbnail, hash }) => (
          <Link key={id} to={`/videography/${id}`}>
            <div className="relative flex aspect-[16/9] items-start justify-center">
              <div
                key={id}
                className="relative cursor-pointer"
                onClick={() => navigate(`/videography/${id}`)}
              >
                <LazyImage
                  src={thumbnail}
                  hash={hash}
                  alt={`Vimeo Thumbnail ${id}`}
                  className="max-h-full max-w-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </ContentContainer>
    </PageContainer>
  );
};

export default Videography;
