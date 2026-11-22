import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { buildOptimizedImageUrl, fetchSiteSettings } from "../lib/sanity";
import type { CmsSiteSettings } from "../types/cms";

interface SiteSettingsContextValue {
  settings: CmsSiteSettings | null;
  isLoading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  settings: null,
  isLoading: true,
});

function upsertMetaTag(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let tag = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

// Fetches Site Settings from Sanity once when the site opens and shares them with every page.
export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<CmsSiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchSiteSettings()
      .then((data) => {
        if (isMounted) {
          setSettings(data);
        }
      })
      .catch((error) => {
        console.error("Could not load Site Settings from Sanity:", error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Keep meta description & OpenGraph preview image synced with Sanity SEO fields
  useEffect(() => {
    if (settings?.shareDescription) {
      upsertMetaTag("name", "description", settings.shareDescription);
      upsertMetaTag("property", "og:description", settings.shareDescription);
      upsertMetaTag("name", "twitter:description", settings.shareDescription);
    }

    if (settings?.sharePreviewImage) {
      const previewUrl = buildOptimizedImageUrl(settings.sharePreviewImage, {
        width: 1200,
        height: 630,
        quality: 85,
      });
      if (previewUrl) {
        upsertMetaTag("property", "og:image", previewUrl);
        upsertMetaTag("name", "twitter:image", previewUrl);
      }
    }
  }, [settings]);

  return (
    <SiteSettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

// Simple hook any page or component can call: const { settings, isLoading } = useSiteSettings();
export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
