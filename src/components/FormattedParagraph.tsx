export default function FormattedParagraph({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g); // split by bold parts

  const classNameForAlbumText = "text-black ";
  const classNameForAlbumTextBold = "font-bold";

  return (
    <p className={classNameForAlbumText}>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const boldText = part.slice(2, -2);
          return (
            <span key={index} className={classNameForAlbumTextBold}>
              {boldText}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}
