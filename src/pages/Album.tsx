import { useParams, Link } from "react-router-dom";
import albums from "../site/data.json";
import LazyImage from "../components/LazyImage";
import { AlbumType as AlbumType, PhotoType } from "../types/albums";
import Menu from "../components/Menu";
import PageContainer from "../components/PageContainer";
import ContentContainer from "../components/ContentContainer";

export default function Album() {
  const { albumId } = useParams<{ albumId: string }>(); // Ensure `albumId` is typed
  const album: AlbumType | undefined = albums.find((a) => a.title === albumId);

  if (!album)
    return <div className="text-center text-gray-500">Album not found</div>;

  return (
    <PageContainer>
      <Menu />
      <ContentContainer
        className="grid grid-cols-2 gap-8 sm:grid-cols-2 xl_1500:grid-cols-2"
        title="Albums"
        button={true}
        album={album}
      >
        {album.photos.map((photo: PhotoType) => (
          <Link key={photo.id} to={`/photography/${albumId}/${photo.id}`}>
            <div className="relative flex aspect-[16/9] items-start justify-center overflow-hidden">
              <LazyImage
                src={photo.src}
                hash={photo.imageHash}
                alt={photo.desc || "Photo"}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </Link>
        ))}
      </ContentContainer>

      {/* <Link
        to="/photography"
        className="absolute left-4 top-4 rounded bg-gray-800 px-4 py-2 text-white"
      >
        Back
      </Link> */}
    </PageContainer>
  );
}
