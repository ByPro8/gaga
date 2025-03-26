import Menu from "../components/Menu";
///
// import { useParams, Link } from "react-router-dom";
// import albums from "../data/data.json";
import projects from "../site/projects";
// import LazyImage from "../components/LazyImage";
// import { AlbumType as AlbumType, PhotoType } from "../types/albums";
////

export default function Album() {
  console.log(projects);

  // const { albumId } = useParams<{ albumId: string }>(); // Ensure `albumId` is typed
  // const album: AlbumType | undefined = albums.find((a) => a.title === albumId);

  // if (!album)
  //   return <div className="text-center text-gray-500">Album not found</div>;

  return (
    <div className="flex h-screen w-full flex-col text-gray-500 sm:flex-col lg:flex-row">
      <Menu />

      {/* <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 flex h-[80vh] max-w-[1400px] flex-wrap justify-center gap-6 overflow-y-auto p-6 sm:w-full lg:w-[70%] lg:pl-0 lg2:w-[75%] xl:w-[80%]">
        {album.photos.map((photo: PhotoType) => (
          <Link key={photo.id} to={`/photography/${albumId}/${photo.id}`}>
            <LazyImage
              src={photo.src}
              hash={photo.imageHash}
              alt={photo.desc || "Photo"}
            />
          </Link>
        ))}
      </div>

      <Link
        to="/photography"
        className="absolute left-4 top-4 rounded bg-gray-800 px-4 py-2 text-white"
      >
        Back
      </Link> */}
    </div>
  );
}
