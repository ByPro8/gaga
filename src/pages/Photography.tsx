import albums from "../site/data.json";
import Menu from "../components/Menu";
import LazyImage from "../components/LazyImage";
import { Link } from "react-router-dom";
import { AlbumType } from "../types/albums";
import PageContainer from "../components/PageContainer";
import ContentContainer from "../components/ContentContainer";

export default function Photography() {
  return (
    <PageContainer>
      <Menu />
      <ContentContainer
        className="grid-cols-2 sm:grid-cols-2 xl_1500:grid-cols-4"
        title="Home"
      >
        {albums.map((album: AlbumType) => (
          <Link key={album.title} to={`/photography/${album.title}`}>
            <div className="relative flex aspect-square items-center justify-center transition duration-300 hover:shadow-none">
              <LazyImage
                src={album.thumbnail}
                hash={album.albumHash}
                alt={album.title}
                className="object-containobject-contain max-h-full max-w-full"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Link>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}
