import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import videosData from "../site/videos.json"; // Import JSON directly
import LazyImage from "../components/LazyImage"; // Import the LazyImage component
import { VideoType } from "../types/video"; // Import the VideoType

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
    <div className="grid grid-cols-2 gap-4 p-4">
      {thumbnails.map(({ id, thumbnail, hash }) => (
        <div
          key={id}
          className="cursor-pointer"
          onClick={() => navigate(`/videography/${id}`)}
        >
          <LazyImage
            src={thumbnail}
            hash={hash}
            alt={`Vimeo Thumbnail ${id}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Videography;
