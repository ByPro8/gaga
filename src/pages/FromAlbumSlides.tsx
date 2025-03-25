import { useParams, useNavigate } from "react-router-dom";
import albums from "../data/data.json";
import Menu from "../components/Menu";
import { Slider } from "../components/Slider";

export default function FromAlbumSlides() {
  const { albumId, photoId } = useParams();
  const navigate = useNavigate();

  const album = albums.find((a) => a.title === albumId);
  if (!album)
    return <div className="text-center text-gray-500">Album not found</div>;

  const imageIndex = album.photos.findIndex((photo) => photo.id === photoId);
  if (imageIndex === -1)
    return <div className="text-center text-gray-500">Photo not found</div>;

  function handleClose() {
    navigate(`/photography/${albumId}`);
  }

  return (
    <div className="mx-auto flex h-screen w-full max-w-[1760px] sm:flex-col lg:flex-row">
      <Menu />
      <Slider images={album.photos} startIndex={imageIndex} />
      <button
        onClick={handleClose}
        className="absolute right-4 top-4 rounded bg-gray-800 px-4 py-2 text-white"
      >
        Close
      </button>
    </div>
  );
}
