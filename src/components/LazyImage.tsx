import { useState } from "react";
import { Blurhash } from "react-blurhash";

export default function LazyImage({
  src,
  hash,
  alt,
  className,
}: {
  src: string;
  hash: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="items-left relative flex flex-col">
      {!loaded && (
        <Blurhash
          hash={hash || "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
          width={300}
          height={300}
          className="absolute left-0 top-0"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`object-cover shadow-md transition-all duration-500 ease-in-out ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </div>
  );
}
