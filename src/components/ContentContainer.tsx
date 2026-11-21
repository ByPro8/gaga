import type { ReactNode } from "react";
import BackToHome from "./BackToHome";

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
  title?: string;
  // Optional header block shown above the grid (e.g. album title + description)
  headerContent?: ReactNode;
}

export default function ContentContainer({
  children,
  className = "",
  title = "",
  headerContent,
}: ContentContainerProps) {
  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="ml-10 mt-10 text-[29px] text-gray-500 lg:hidden">
        <BackToHome />
        {title}
      </h1>
      <div className="min-h-0 w-full min-w-0 self-start overflow-y-auto px-10 pb-10 scrollbar-hide sm:scrollbar-default lg:gap-10 lg:px-10">
        <div className="mb-6 mt-4 w-full md:mt-8 lg:mt-[55px]">
          {headerContent && <div className="mb-10">{headerContent}</div>}
          <div className={className}>{children}</div>
        </div>
      </div>
    </div>
  );
}
