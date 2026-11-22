import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type {
  CmsGallery,
  CmsImage,
  CmsProjectYear,
  CmsSiteSettings,
  CmsSlideshowPhoto,
  CmsVideo,
  OptimizableImage,
} from "../types/cms";

// Connection to your Gagalens Sanity cloud project.
// Uses the fast global CDN in production, and live uncached API on localhost so edits show up immediately.
export const sanityClient = createClient({
  projectId: "vhc079ss",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: !import.meta.env.DEV,
});

const imageUrlBuilder = createImageUrlBuilder(sanityClient);

// Converts any Sanity image into an automatic WebP/AVIF URL sized for the screen.
// Example: width = 800 for fast album grids, width = 2200 for sharp fullscreen photos.
export function buildOptimizedImageUrl(
  image: OptimizableImage | null | undefined,
  options: { width?: number; height?: number; quality?: number } = {},
): string {
  // Guard against empty/unfinished image slots in Sanity (e.g. { asset: null })
  if (!image) return "";
  if (typeof image === "object" && "asset" in image && !image.asset) return "";

  const { width, height, quality = 82 } = options;
  try {
    let builder = imageUrlBuilder
      .image(image)
      .auto("format") // Automatically serves WebP or AVIF
      .fit("max") // Never stretches small images larger than their original size
      .quality(quality);

    if (width) builder = builder.width(width);
    if (height) builder = builder.height(height);

    return builder.url();
  } catch {
    return "";
  }
}

// Reads Sanity's built-in tiny blur preview (base64 data URL) for instant loading
export function getBlurPreviewUrl(image?: CmsImage | null): string | undefined {
  return image?.asset?.metadata?.lqip;
}

// Reusable Sanity projection for every image field (gets URL + blur preview + dimensions + crop)
const IMAGE_FIELDS = `{
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions { width, height, aspectRatio }
    }
  },
  crop,
  hotspot
}`;

// Simple in-memory cache so navigating back & forth between pages is instant
const queryCache = new Map<string, Promise<unknown>>();

function fetchWithCache<T>(cacheKey: string, query: string): Promise<T> {
  if (!queryCache.has(cacheKey)) {
    const request = sanityClient.fetch<T>(query).catch((error) => {
      // If a request fails (e.g. offline), remove it from cache so retry works
      queryCache.delete(cacheKey);
      throw error;
    });
    queryCache.set(cacheKey, request);
  }
  return queryCache.get(cacheKey) as Promise<T>;
}

// 1. Fetch Home, About, Contact, Social Links, Browser Tab, and Grid settings
export function fetchSiteSettings(): Promise<CmsSiteSettings | null> {
  const query = `coalesce(*[_id == "siteSettings"][0], *[_type == "siteSettings"][0]) {
    homeWallpaper ${IMAGE_FIELDS},
    mobileWallpaper ${IMAGE_FIELDS},
    instagramUrl,
    vimeoUrl,
    linkedinUrl,
    aboutHeading,
    profilePhoto ${IMAGE_FIELDS},
    aboutBio,
    "clientLogos": coalesce(clientLogos[defined(logo.asset)], [])[] {
      _key,
      name,
      logo ${IMAGE_FIELDS}
    },
    contactHeading,
    contactIntroText,
    contactEmail,
    albumsPerRow,
    storiesPerRow,
    videosPerRow,
    shareDescription,
    sharePreviewImage ${IMAGE_FIELDS}
  }`;

  return fetchWithCache<CmsSiteSettings | null>("siteSettings", query);
}

// 2. Fetch all Photo Albums OR all Photo Stories in Gaga's drag-and-drop order
export function fetchGalleries(
  galleryType: "album" | "photoStory",
): Promise<CmsGallery[]> {
  const query = `*[_type == "${galleryType}"] | order(orderRank asc) {
    _id,
    _type,
    title,
    years,
    photosPerRow,
    mainDescription,
    secondaryNote,
    coverImage ${IMAGE_FIELDS},
    "photos": coalesce(photos[defined(asset)], [])[] {
      _key,
      includeInSlideshow,
      cornerNote,
      altText,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height, aspectRatio }
        }
      },
      crop,
      hotspot
    }
  }`;

  return fetchWithCache<CmsGallery[]>(`galleries-${galleryType}`, query);
}

// Picks an optimal Sanity image width for the visitor's current screen & retina density
// so phones download ~70% smaller files while large desktop displays stay razor-sharp.
export function getResponsiveSlideWidth(): number {
  if (typeof window === "undefined") return 1800;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const targetWidth = window.innerWidth * pixelRatio;
  if (targetWidth <= 900) return 1000;
  if (targetWidth <= 1800) return 1600;
  return 2200;
}

// 3. Fetch Slideshow photos from Photo Albums ONLY (Photo Stories stay separate).
// Every album photo is included automatically unless Gaga explicitly turns it OFF in Sanity.
export async function fetchSlideshowPhotos(): Promise<CmsSlideshowPhoto[]> {
  const albums = await fetchGalleries("album");
  const slideshowPhotos: CmsSlideshowPhoto[] = [];

  for (const album of albums) {
    for (const photo of album.photos || []) {
      if (photo.includeInSlideshow !== false && photo.asset?.url) {
        slideshowPhotos.push({
          photoKey: photo._key,
          galleryType: album._type,
          galleryTitle: album.title,
          image: photo,
          cornerNote: photo.cornerNote,
          altText: photo.altText || photo.cornerNote || album.title,
        });
      }
    }
  }

  return slideshowPhotos;
}

// 4. Fetch all Videos in Gaga's drag-and-drop order
export function fetchVideos(): Promise<CmsVideo[]> {
  const query = `*[_type == "video"] | order(orderRank asc) {
    _id,
    title,
    vimeoId,
    embedUrl,
    description,
    vimeoThumbnailUrl,
    aspectRatio,
    customCoverImage ${IMAGE_FIELDS}
  }`;

  return fetchWithCache<CmsVideo[]>("videos", query);
}

// 5. Fetch all Projects grouped by year (newest first)
export function fetchProjects(): Promise<CmsProjectYear[]> {
  const query = `*[_type == "projectYear"] | order(sortYear desc) {
    _id,
    yearLabel,
    sortYear,
    "entries": coalesce(entries, [])[] {
      _key,
      role,
      title,
      company,
      isFeatured
    }
  }`;

  return fetchWithCache<CmsProjectYear[]>("projects", query);
}
