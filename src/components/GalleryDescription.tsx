import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface GalleryDescriptionProps {
  mainDescription?: PortableTextBlock[];
  secondaryNote?: string;
}

// How Sanity's main gallery description renders (supports bold, italic, and multiple paragraphs)
const descriptionTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 text-xl text-gray-500 last:mb-0 sm:text-2xl">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function GalleryDescription({
  mainDescription,
  secondaryNote,
}: GalleryDescriptionProps) {
  const hasMainDescription = Boolean(mainDescription && mainDescription.length > 0);
  const hasSecondaryNote = Boolean(secondaryNote && secondaryNote.trim().length > 0);

  if (!hasMainDescription && !hasSecondaryNote) {
    return null;
  }

  return (
    <div>
      {hasMainDescription && (
        <PortableText
          value={mainDescription!}
          components={descriptionTextComponents}
        />
      )}

      {/* Smaller exhibition or secondary note */}
      {hasSecondaryNote && (
        <p className="mt-3 whitespace-pre-line text-sm text-gray-400 sm:text-base">
          {secondaryNote}
        </p>
      )}
    </div>
  );
}
