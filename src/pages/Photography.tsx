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

      <ContentContainer>
        {albums.map((album: AlbumType) => (
          <Link key={album.title} to={`/photography/${album.title}`}>
            <div className="shadow-custom relative flex aspect-square items-center justify-center transition duration-300 hover:shadow-none">
              <LazyImage
                src={album.thumbnail}
                hash={album.albumHash}
                alt={album.title}
                className="max-h-full max-w-full"
              />
            </div>
          </Link>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}
