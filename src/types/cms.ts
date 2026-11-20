import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

// An image returned from Sanity, including its built-in tiny blur preview (blurPreviewUrl)
export interface CmsImage {
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// Helper type accepted by our image URL builder
export type OptimizableImage = CmsImage | SanityImageSource;

// Single photo inside a Photo Album or Photo Story
export interface CmsGalleryPhoto extends CmsImage {
  _key: string;
  includeInSlideshow?: boolean;
  cornerNote?: string;
  altText?: string;
}

// A full Photo Album or Photo Story document
export interface CmsGallery {
  _id: string;
  _type: "album" | "photoStory";
  title: string;
  years?: string;
  coverImage?: CmsImage;
  photosPerRow?: 1 | 2 | 3;
  mainDescription?: PortableTextBlock[];
  secondaryNote?: string;
  photos: CmsGalleryPhoto[];
}

// A single photo flattened for the random Slideshow page
export interface CmsSlideshowPhoto {
  photoKey: string;
  galleryType: "album" | "photoStory";
  galleryTitle: string;
  image: CmsGalleryPhoto;
  cornerNote?: string;
  altText?: string;
}

// A video from the Videography section
export interface CmsVideo {
  _id: string;
  title: string;
  vimeoId: string;
  embedUrl: string;
  description?: string;
  customCoverImage?: CmsImage;
  vimeoThumbnailUrl?: string;
  aspectRatio?: string;
}

// A single credit inside a project year
export interface CmsProjectEntry {
  _key: string;
  role: string;
  title: string;
  company?: string;
  isFeatured?: boolean;
}

// A year group on the Projects page (for example: "2024" or "2020 - 2022")
export interface CmsProjectYear {
  _id: string;
  yearLabel: string;
  sortYear: number;
  entries: CmsProjectEntry[];
}

// Global settings for Home, About, Contact, Social Links, Browser Tab, and Grids
export interface CmsSiteSettings {
  homeWallpaper?: CmsImage;
  mobileWallpaper?: CmsImage;
  instagramUrl?: string;
  vimeoUrl?: string;
  linkedinUrl?: string;
  aboutHeading?: string;
  profilePhoto?: CmsImage;
  aboutBio?: PortableTextBlock[];
  contactHeading?: string;
  contactIntroText?: string;
  contactEmail?: string;
  albumsPerRow?: 1 | 2 | 3;
  storiesPerRow?: 1 | 2 | 3;
  videosPerRow?: 3 | 4 | 5;
  browserTabTitle?: string;
  browserTabIcon?: CmsImage;
  shareDescription?: string;
  sharePreviewImage?: CmsImage;
}
