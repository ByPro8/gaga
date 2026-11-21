import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchSiteSettings } from "../lib/sanity";
import type { CmsSiteSettings } from "../types/cms";

interface SiteSettingsContextValue {
  settings: CmsSiteSettings | null;
  isLoading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  settings: null,
  isLoading: true,
});

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
