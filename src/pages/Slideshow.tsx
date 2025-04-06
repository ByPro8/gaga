import { useMemo } from "react";
import Menu from "../components/Menu";
import albums from "../site/data.json";
import shuffleArray from "../functions/shuffleArr";
import { PhotoType } from "../types/albums"; // Import the PhotoType
import SliderImage from "../components/SliderImage";
import BackToHome from "../components/BackToHome";
import TabletMenu from "../components/TabletMenu";

interface ShuffledImage extends PhotoType {
  albumId: string;
}

export default function Slideshow() {
  // Collect all album photos and include album name
  const images = useMemo(() => {
    let shuffledImages: ShuffledImage[] = albums.flatMap((album) =>
      album.photos.map((photo) => ({
        id: photo.id,
        src: photo.src,
        desc: photo.desc || album.title, // Fallback to album title if no description
        imageHash: photo.imageHash,
        albumId: album.title, // Store album name
      })),
    );

    // Shuffle multiple times to increase randomness
    for (let i = 0; i < 3; i++) {
      shuffledImages = shuffleArray(shuffledImages);
    }

    return shuffledImages;
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Menu />
      <SliderImage images={images} random={true} />
      <TabletMenu />
    </div>
  );
}
