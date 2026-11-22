import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface GalleryDescriptionProps {
  mainDescription?: PortableTextBlock[];
  secondaryNote?: string;
  // Compact styling when displayed inside the left desktop sidebar under the menu
  compact?: boolean;
}

const defaultTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 text-[17px] leading-relaxed text-gray-500 last:mb-0 sm:text-[18px]">
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

const compactTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-2.5 text-[13px] leading-relaxed text-gray-500 last:mb-0 xl25:text-[15px]">
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

export default function GalleryDescription({
  mainDescription,
  secondaryNote,
  compact = false,
}: GalleryDescriptionProps) {
  const hasMainDescription = Boolean(
    mainDescription && mainDescription.length > 0,
  );
  const hasSecondaryNote = Boolean(
    secondaryNote && secondaryNote.trim().length > 0,
  );

  if (!hasMainDescription && !hasSecondaryNote) {
    return null;
  }

  return (
    <div className={compact ? "" : "max-w-[780px]"}>
      {hasMainDescription && (
        <PortableText
          value={mainDescription!}
          components={compact ? compactTextComponents : defaultTextComponents}
        />
      )}

      {/* Smaller exhibition or secondary note */}
      {hasSecondaryNote && (
        <p
          className={
            compact
              ? "mt-3 whitespace-pre-line text-xs leading-relaxed text-gray-400"
              : "mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-400 sm:text-base"
          }
        >
          {secondaryNote}
        </p>
      )}
    </div>
  );
}
