import { useMemo } from "react";
import Menu from "../components/Menu";
import { Slider } from "../components/Slider";
import albums from "../data/data.json";
import shuffleArray from "../functions/shuffleArr";
// Function to shuffle an array randomly

export default function Slideshow() {
  // Collect all album photos and include album name
  const images = useMemo(() => {
    let shuffledImages = albums.flatMap((album) =>
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
    <div className="mx-auto flex h-screen w-full max-w-[1760px] sm:flex-col lg:flex-row">
      <Menu />
      <Slider images={images} random={true} />
    </div>
  );
}
