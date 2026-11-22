import type { ReactNode } from "react";
import BackToHome from "./BackToHome";

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
  title?: string;
  // Optional muted text beside the title (e.g. album years "2007–2016")
  titleMeta?: string;
  // Show the page <h1> on desktop too (used on About & Contact; photo grids stay flush at top)
  showTitleOnDesktop?: boolean;
  // Optional back-button destination & accessible label (shown on mobile/tablet only)
  backTo?: string;
  backLabel?: string;
  // Hide the back arrow on mobile/tablet too (for top-level pages that already have the mobile menu)
  hideBackButton?: boolean;
  // Optional header block shown above the main content
  headerContent?: ReactNode;
  // Hide headerContent on desktop (e.g. when desktop shows the album description under the left menu)
  hideHeaderOnDesktop?: boolean;
}

export default function ContentContainer({
  children,
  className = "",
  title = "",
  titleMeta,
  showTitleOnDesktop = false,
  backTo = "/",
  backLabel = "Back to home",
  hideBackButton = false,
  headerContent,
  hideHeaderOnDesktop = false,
}: ContentContainerProps) {
  return (
    /* Top padding matches Menu's lg:pt-[52px] so content & photos start flush with GAGALENS */
    <main className="w-full min-w-0 flex-1 px-5 pb-16 pt-6 sm:px-8 sm:pt-8 lg:px-10 lg:pb-20 lg:pt-[52px] xl:px-12">
      {title && (
        <h1
          className={`mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[26px] font-normal leading-tight text-gray-700 sm:text-[29px] lg:mb-8 ${
            showTitleOnDesktop ? "" : "lg:hidden"
          }`}
        >
          {!hideBackButton && (
            <span className="lg:hidden">
              <BackToHome to={backTo} label={backLabel} />
            </span>
          )}
          <span>{title}</span>
          {titleMeta && (
            <span className="text-base font-normal text-gray-400">
              {titleMeta}
            </span>
          )}
        </h1>
      )}

      {headerContent && (
        <div
          className={`mb-8 lg:mb-10 ${hideHeaderOnDesktop ? "lg:hidden" : ""}`}
        >
          {headerContent}
        </div>
      )}
      <div className={className}>{children}</div>
    </main>
  );
}
