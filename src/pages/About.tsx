import { PortableText, type PortableTextComponents } from "@portabletext/react";
import PageContainer from "../components/PageContainer";
import Menu from "../components/Menu";
import ContentContainer from "../components/ContentContainer";
import LazyImage from "../components/LazyImage";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { buildOptimizedImageUrl, getBlurPreviewUrl } from "../lib/sanity";

// How Sanity's rich-text bio paragraphs, bold, and italic text render on the About page
const bioTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-[17px] leading-relaxed text-gray-500 last:mb-0 sm:text-[18px]">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-demi text-gray-700">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function About() {
  const { settings } = useSiteSettings();

  const heading = settings?.aboutHeading || "About";
  const profilePhotoUrl = settings?.profilePhoto
    ? buildOptimizedImageUrl(settings.profilePhoto, { width: 700, quality: 85 })
    : "";
  const profileBlurPreview = getBlurPreviewUrl(settings?.profilePhoto);

  return (
    <PageContainer>
      <Menu />
      <ContentContainer title={heading} showTitleOnDesktop={true}>
        {/* Keep prose capped at a comfortable editorial reading width on large & ultrawide screens */}
        <article className="flow-root max-w-[780px]">
          {profilePhotoUrl && (
            <div className="mx-auto mb-6 max-w-[300px] sm:float-right sm:mb-4 sm:ml-8 sm:w-[260px]">
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
        </article>
      </ContentContainer>
    </PageContainer>
  );
}
