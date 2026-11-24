import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import GAGALENS from "./GAGALENS";
import ContactIcons from "./ContactIcons";

interface MenuProps {
  isHome?: boolean;
  // Optional content shown neatly under the desktop menu (e.g. Album title & description)
  sidebarContent?: ReactNode;
  // Optional short note pinned at the bottom-left under the desktop menu (used on Slideshow)
  bottomNote?: string;
}

// Single source of truth for all site navigation links
const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/photography", label: "Photography" },
  { to: "/photo-stories", label: "Photo Stories" },
  { to: "/videography", label: "Videography" },
  { to: "/slideshow", label: "Slideshow" },
  { to: "/contact", label: "Contact" },
] as const;

// Match both exact pages (/photography) and nested detail pages (/photography/Horizon)
function isNavLinkActive(pathname: string, targetPath: string): boolean {
  return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
}

export default function Menu({
  isHome = false,
  sidebarContent,
  bottomNote,
}: MenuProps) {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Automatically close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock background page scroll while the frosted mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* =================================================================
          1. MOBILE NAVIGATION (< 640px)
             - On Home: centered menu over the soft-washed wallpaper
             - On inner pages: slim top bar + calm frosted white overlay
         ================================================================= */}
      {isHome ? (
        <header className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-start px-6 pb-10 pt-[clamp(4.5rem,17dvh,9.5rem)] text-center sm:hidden">
          <GAGALENS
            className="select-none items-center"
            titleClassName="text-[44px] text-gaga"
            subtitleClassName="mt-1.5 text-[14px] text-gray-600"
          />

          <nav
            aria-label="Main navigation"
            className="mt-8 w-full max-w-[260px]"
          >
            <ul className="flex select-none flex-col">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block py-2 text-[20px] font-normal text-gray-700 transition-colors duration-200 hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ContactIcons className="mt-7 select-none" />
          </nav>
        </header>
      ) : (
        <>
          <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm sm:hidden">
            <div className="grid grid-cols-[52px_1fr_52px] items-center px-4 py-3.5">
              {/* Empty left spacer keeps GAGALENS dead-center */}
              <div aria-hidden="true" />

              <div className="flex justify-center">
                <GAGALENS
                  className="select-none items-center"
                  titleClassName="text-[26px] text-gaga"
                  showSubtitle={false}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((open) => !open)}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-nav-overlay"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  className="inline-flex h-10 items-center justify-center border-0 bg-transparent px-1 text-gray-500 transition-colors hover:text-gray-900 focus:outline-none"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex flex-col items-end gap-[5px]"
                    >
                      <span className="block h-[1.5px] w-5 bg-current" />
                      <span className="block h-[1.5px] w-3.5 bg-current" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Frosted white full-screen veil rendered outside <header>; tap any empty space to close */}
          {isMobileMenuOpen && (
            <div
              id="mobile-nav-overlay"
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 flex flex-col bg-white/35 px-4 pb-8 pt-3.5 backdrop-blur-md sm:hidden"
            >
              <div className="grid grid-cols-[52px_1fr_52px] items-center">
                <div aria-hidden="true" />
                <div className="flex justify-center">
                  <GAGALENS
                    className="select-none items-center"
                    titleClassName="text-[26px] text-gaga"
                    showSubtitle={false}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 items-center justify-center border-0 bg-transparent text-gray-400 hover:text-gray-900 focus:outline-none"
                  >
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <nav
                aria-label="Main navigation"
                onClick={(event) => event.stopPropagation()}
                className="my-auto flex flex-col items-center text-center"
              >
                <ul className="flex select-none flex-col items-center gap-1">
                  {NAV_LINKS.map((item) => {
                    const isActive = isNavLinkActive(pathname, item.to);
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          aria-current={isActive ? "page" : undefined}
                          className={`relative inline-block py-2 text-[21px] tracking-wide transition-colors duration-200 ${isActive
                            ? "font-demi text-gray-900 after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-gaga"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <ContactIcons className="mt-8 select-none" />
              </nav>
            </div>
          )}
        </>
      )}

      {/* =================================================================
          2. TABLET NAVIGATION (640px – 1023px)
             Clean centered wordmark + horizontal links on EVERY page
         ================================================================= */}
      <header
        className={`hidden w-full shrink-0 flex-col items-center bg-white px-4 pt-7 text-center sm:flex md:px-6 lg:hidden ${isHome ? "pb-3" : "border-b border-gray-100 pb-4"
          }`}
      >
        <GAGALENS
          className="select-none items-center"
          titleClassName="text-[42px] text-gaga1"
          subtitleClassName="mt-1 text-[14px] text-gray-400"
        />

        <nav aria-label="Main navigation" className="mt-4 w-full">
          <ul className="flex select-none flex-wrap items-center justify-center gap-x-4 gap-y-1.5 md:gap-x-7">
            {NAV_LINKS.map((item) => {
              const isActive = isNavLinkActive(pathname, item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative block whitespace-nowrap py-1.5 text-[15px] transition-colors duration-200 md:text-[17px] ${isActive
                      ? "font-demi text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-gaga"
                      : "text-gray-500 hover:text-gray-900"
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {isHome && <ContactIcons className="mt-3.5 select-none" />}
        </nav>
      </header>

      {/* =================================================================
          3. DESKTOP SIDEBAR (1024px+ including Ultrawide 2560px+)
             Classic right-aligned GAGALENS sidebar, sticky while page scrolls
         ================================================================= */}
      <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:w-[270px] lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:pl-6 lg:pr-2 lg:pt-[52px] lg:text-right lg2:w-[310px] xl:w-[340px] xl2:w-[380px] xl25:w-[460px] xxl:w-[580px]">
        <GAGALENS
          className="select-none items-end"
          titleClassName="text-[46px] text-gaga1 lg2:text-[50px] xl25:text-[64px] xxl:text-[80px]"
          subtitleClassName="mt-1 text-[15px] text-gray-400 lg2:text-[17px] xl25:text-[22px] xxl:text-[28px]"
        />

        <nav aria-label="Main navigation" className="mt-6 xxl:mt-10">
          <ul className="flex select-none flex-col">
            {NAV_LINKS.map((item) => {
              const isActive = isNavLinkActive(pathname, item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex items-center justify-end gap-2.5 py-2 text-[19px] transition-colors duration-200 xl25:text-[24px] xxl:text-[32px] ${isActive
                      ? "font-demi text-gray-900"
                      : "text-gray-400 hover:text-gray-900"
                      }`}
                  >
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-gaga"
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ContactIcons align="right" className="mt-4 select-none" />
        </nav>

        {/* Optional contextual info under the menu (e.g. Album title & description on desktop) */}
        {sidebarContent && (
          <div className="mt-8 border-t border-gray-100 pb-8 pt-6 text-right">
            {sidebarContent}
          </div>
        )}

        {/* Optional individual photo note pinned at the bottom-left under the sidebar */}
        {bottomNote && (
          <div className="mt-auto pb-8 pt-6 text-right text-sm leading-relaxed text-gray-500">
            {bottomNote}
          </div>
        )}
      </aside>
    </>
  );
}
