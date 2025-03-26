// import albums from "../data/data.json";
import Menu from "../components/Menu";
// import LazyImage from "../components/LazyImage";
// import { Link } from "react-router-dom";
// import { AlbumType } from "../types/albums";

export default function Photography() {
  return (
    <div className="flex h-screen w-full flex-col text-gray-500 sm:flex-col lg:flex-row">
      <Menu />

      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 flex h-[80vh] max-w-[1400px] flex-wrap justify-center gap-6 overflow-y-auto p-6 sm:w-full lg:w-[70%] lg:pl-0 lg2:w-[75%] xl:w-[80%]">
        {/* {albums.map((album: AlbumType) => (
          <Link key={album.title} to={`/photography/${album.title}`}>
            <LazyImage
              src={album.thumbnail}
              hash={album.albumHash}
              alt={album.title}
            />
          </Link>
        ))} */}
      </div>
    </div>
  );
}
