import { useState } from "react";
import { Link } from "react-router-dom";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import PageContainer from "../components/PageContainer";
import Menu from "../components/Menu";
import ContentContainer from "../components/ContentContainer";
import LazyImage from "../components/LazyImage";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { buildOptimizedImageUrl, getBlurPreviewUrl } from "../lib/sanity";

type DesktopAboutLook = "split-caption" | "classic-wrap";

const DESKTOP_LOOKS: Array<{ id: DesktopAboutLook; label: string }> = [
  { id: "split-caption", label: "1. Bio + Portrait Colophon" },
  { id: "classic-wrap", label: "2. Classic Wrap (No Heading)" },
];

// How Sanity's rich-text bio paragraphs, bold, and italic text render
const bioTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-[16px] leading-[1.8] text-gray-500 last:mb-0 sm:text-[17px]">
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
  // Temporary 2-option switcher for desktop comparison — remove once we lock in 1 or 2
  const [desktopLook, setDesktopLook] =
    useState<DesktopAboutLook>("split-caption");

  const heading = settings?.aboutHeading || "About";
  const profilePhotoUrl = settings?.profilePhoto
    ? buildOptimizedImageUrl(settings.profilePhoto, { width: 800, quality: 85 })
    : "";
  const profileBlurPreview = getBlurPreviewUrl(settings?.profilePhoto);

  const fullBioContent =
    settings?.aboutBio && settings.aboutBio.length > 0 ? (
      <PortableText value={settings.aboutBio} components={bioTextComponents} />
    ) : null;

  return (
    <PageContainer>
      <Menu />
      <ContentContainer>
        {/* Single semantic page heading (tablet & desktop already highlight "About" in the nav) */}
        <h1 className="sr-only">{heading} — Levan Gaga Kapanadze</h1>

        {/* =================================================================
            MOBILE (< 640px) — LOCKED IN
           ================================================================= */}
        <article className="sm:hidden">
          <header className="mb-7 flex items-center justify-between gap-5 border-b border-gray-100 pb-7">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400">
                <span className="h-1.5 w-1.5 rounded-full bg-gaga" />
                <span>{heading}</span>
              </div>
              <p className="mt-2 text-[23px] font-normal leading-snug text-gray-800">
                Levan Gaga Kapanadze
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-gray-500">
                Filmmaker · Photographer · Media Producer
              </p>
              <p className="mt-1 text-xs text-gray-400">Tbilisi, Georgia</p>
            </div>

            {profilePhotoUrl && (
              <div className="h-[144px] w-[114px] shrink-0 overflow-hidden bg-gray-50">
                <LazyImage
                  src={profilePhotoUrl}
                  alt="Levan Gaga Kapanadze"
                  blurPreviewUrl={profileBlurPreview}
                  eager
                  className="object-top"
                />
              </div>
            )}
          </header>

          {fullBioContent}
        </article>

        {/* =================================================================
            TABLET (640px – 1023px) — LOCKED IN
           ================================================================= */}
        <article className="mx-auto hidden flow-root max-w-[780px] sm:block lg:hidden">
          {profilePhotoUrl && (
            <div className="float-right mb-5 ml-8 w-[250px] overflow-hidden bg-gray-50 md:w-[270px]">
              <LazyImage
                src={profilePhotoUrl}
                alt="Levan Gaga Kapanadze"
                blurPreviewUrl={profileBlurPreview}
                eager
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          {fullBioContent}
        </article>

        {/* =================================================================
            DESKTOP (1024px+) — FINAL 2 OPTIONS (portrait locked at 270px)
           ================================================================= */}
        <div className="hidden lg:block">
          {/* TEMPORARY 2-OPTION PILL — tucked bottom-left */}
          <div className="fixed bottom-4 left-4 z-50 flex items-center gap-1 rounded-full border border-gray-200 bg-white/95 p-1 backdrop-blur-sm">
            {DESKTOP_LOOKS.map((look, index) => (
              <button
                key={look.id}
                type="button"
                title={look.label}
                onClick={() => setDesktopLook(look.id)}
                className={`h-7 w-7 rounded-full border-0 text-xs transition-colors focus:outline-none ${
                  desktopLook === look.id
                    ? "bg-gaga1 font-demi text-gray-900"
                    : "bg-transparent text-gray-400 hover:text-gray-800"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* 1. BIO LEFT + STICKY 270px PORTRAIT & QUIET COLOPHON RIGHT */}
          {desktopLook === "split-caption" && (
            <article className="mx-auto grid max-w-[980px] grid-cols-[minmax(0,1fr)_270px] items-start gap-12 xl:gap-16">
              <div>{fullBioContent}</div>

              <aside className="sticky top-[52px]">
                {profilePhotoUrl && (
                  <div className="w-[270px] overflow-hidden bg-gray-50">
                    <LazyImage
                      src={profilePhotoUrl}
                      alt="Levan Gaga Kapanadze"
                      blurPreviewUrl={profileBlurPreview}
                      eager
                      className="h-auto w-full object-cover"
                    />
                  </div>
                )}

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="text-base font-demi text-gray-700">
                    Levan Gaga Kapanadze
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">
                    Filmmaker, Photographer &amp; Media Producer
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-400">
                    Tbilisi, Georgia
                  </p>
                  <div className="my-3.5 h-[2px] w-8 bg-gaga" />
                  <Link
                    to="/contact"
                    className="text-sm text-gray-500 underline underline-offset-4 transition-colors hover:text-gray-900"
                  >
                    Get in touch →
                  </Link>
                </div>
              </aside>
            </article>
          )}

          {/* 2. CLASSIC ORIGINAL WRAP (centered in right canvas, 270px portrait, no "About" heading) */}
          {desktopLook === "classic-wrap" && (
            <article className="mx-auto flow-root max-w-[780px]">
              {profilePhotoUrl && (
                <div className="float-right mb-6 ml-10 w-[270px] overflow-hidden bg-gray-50">
                  <LazyImage
                    src={profilePhotoUrl}
                    alt="Levan Gaga Kapanadze"
                    blurPreviewUrl={profileBlurPreview}
                    eager
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}
              {fullBioContent}
            </article>
          )}
        </div>
      </ContentContainer>
    </PageContainer>
  );
}
