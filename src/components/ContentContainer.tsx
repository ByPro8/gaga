import BackToHome from "./BackToHome";
import FormattedParagraph from "./FormattedParagraph";
import { AlbumType as AlbumType } from "../types/albums";

export default function ContentContainer({
  children,
  className = "", // default to an empty string if no className is provided
  title = "", // default to "Albums" if no title is provided
  button = false,
  album = {
    title: "",
    albumDescription: "",
    thumbnail: "",
    albumHash: "",
    photos: [],
  },
}: {
  children: React.ReactNode;
  className?: string; // className is optional
  title?: string; // title is optional with a default value of "Albums"
  button: boolean;
  album?: AlbumType;
}) {
  return (
    <div className="flex h-full w-full flex-col pt-[60px]">
      <h1 className="mb-4 ml-10 text-[29px] text-gray-500 lg:hidden">
        <BackToHome />
        {title}
      </h1>
      <div
        className={`min-h-0 w-full min-w-0 self-start !overflow-y-auto overflow-y-auto px-10 pb-10 scrollbar-hide sm:scrollbar-default lg:gap-10 lg:overflow-y-auto lg:px-10`}
      >
        <div className="mb-6 w-full">
          <h1 className={`mb-10 text-2xl ${!button ? "hidden" : ""}`}>
            <FormattedParagraph text={album.albumDescription} />
          </h1>
          <div className={`${className}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
