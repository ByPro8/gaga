import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { buildOptimizedImageUrl, getBlurPreviewUrl } from "../lib/sanity";
import LazyImage from "./LazyImage";

interface AboutTextImgProps {
  className?: string;
}

// How Sanity's rich-text paragraphs, bold, and italic text look on the About page
const bioTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-xl text-gray-500 last:mb-0">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="text-[19px] font-bold">{children}</span>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function AboutTextImg({ className = "" }: AboutTextImgProps) {
  const navigate = useNavigate();
  const { settings } = useSiteSettings();

  const heading = settings?.aboutHeading || "About";
  const profilePhotoUrl = settings?.profilePhoto
    ? buildOptimizedImageUrl(settings.profilePhoto, { width: 700, quality: 85 })
    : "";
  const profileBlurPreview = getBlurPreviewUrl(settings?.profilePhoto);

  return (
    <div className={`px-6 lg:px-0 ${className}`}>
      <h1 className="mb-[30px] text-[30px] text-gray-500 lg:mb-[48px] lg:block">
        <button
          onClick={() => navigate("/")}
          className="items-center rounded-md border-0 py-2 pr-4 text-gray-500 transition focus:outline-none focus:ring-0 active:outline-none lg:hidden"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>{" "}
        {heading}
      </h1>
      <div>
        {profilePhotoUrl && (
          <div className="float-center mx-auto mb-4 max-w-[325px] sm:float-right sm:ml-4 sm:w-[270px]">
            <LazyImage
              src={profilePhotoUrl}
              alt="Levan Gaga Kapanadze"
              blurPreviewUrl={profileBlurPreview}
              eager
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {settings?.aboutBio && settings.aboutBio.length > 0 && (
          <PortableText
            value={settings.aboutBio}
            components={bioTextComponents}
          />
        )}
      </div>
    </div>
  );
}
