import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import SliderImage from "../components/SliderImage";
import { AlbumType as AlbumType, PhotoType } from "../types/albums";
import albums from "../site/data.json";
import FormattedParagraph from "../components/FormattedParagraph";
import BackToHome from "../components/BackToHome";

export default function FromAlbumSlides() {
  const { albumId, photoId } = useParams<{
    albumId: string;
    photoId: string;
  }>();
  // const navigate = useNavigate();

  const album: AlbumType | undefined = albums.find((a) => a.title === albumId);
  if (!album)
    return <div className="text-center text-gray-500">Album not found</div>;

  const imageIndex = album.photos.findIndex(
    (photo: PhotoType) => photo.id === photoId,
  );
  if (imageIndex === -1)
    return <div className="text-center text-gray-500">Photo not found</div>;

  // function handleClose() {
  //   navigate(`/photography/${albumId}`);
  // }

  return (
    <div className="s1 flex w-full flex-col lg:flex-row">
      <Menu />
      <div className="s2 flex flex-1 flex-col lg:overflow-y-auto">
        <h1 className="mb ml-10 mt-10 text-[29px] text-gray-500 lg:hidden">
          <BackToHome />
          {album.title}
        </h1>
        <div className="s3 flex flex-1 flex-col">
          <div className="s4 flex max-h-[500px] w-full md2:max-h-[545px] lg2:max-h-[620px] xl:max-h-[775px] xl2:max-h-[1065px]">
            <SliderImage images={album.photos} startIndex={imageIndex} />
          </div>

          <div className="flex-1 p-6">
            <FormattedParagraph text={album.albumDescription} />
          </div>
        </div>
      </div>

      {/* Close button */}
      {/* <button
        onClick={handleClose}
        className="absolute right-4 top-4 rounded bg-gray-800 px-4 py-2 text-white"
      >
        Close
      </button> */}
    </div>

    // <div className="flex w-full flex-col lg:flex-row">
    //   <Menu />
    //   {/* Content area that is scrollable */}
    //   <div className="flex flex-1 flex-col lg:overflow-y-auto">
    //     <div className="flex w-full">
    //       {/* SliderImage Component */}
    //       <SliderImage images={album.photos} startIndex={imageIndex} />
    //     </div>
    //     <div className="flex-1 p-6">
    //       {/* Render the formatted description */}
    //       {renderFormattedParagraph(
    //         album.albumDescription,
    //         classNameForAlbumText,
    //         classNameForAlbumTextBold,
    //       )}
    //     </div>
    //   </div>

    //   {/* Close button */}
    //   <button
    //     onClick={handleClose}
    //     className="absolute right-4 top-4 rounded bg-gray-800 px-4 py-2 text-white"
    //   >
    //     Close
    //   </button>
    // </div>

    // <div className="flex min-h-screen w-full flex-col lg:flex-row">
    //   <Menu />

    //   <div className="flex flex-col">
    //     <SliderImage images={album.photos} startIndex={imageIndex} />

    //     {renderFormattedParagraph(
    //       album.albumDescription,
    //       classNameForAlbumText,
    //       classNameForAlbumTextBold,
    //     )}
    //   </div>
    //   <button
    //     onClick={handleClose}
    //     className="absolute right-4 top-4 rounded bg-gray-800 px-4 py-2 text-white"
    //   >
    //     Close
    //   </button>
    // </div>
  );
}
