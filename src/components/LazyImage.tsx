import { useState } from "react";
import { Blurhash } from "react-blurhash";

export default function LazyImage({
  src,
  hash,
  alt,
  className,
  style,
}: {
  src: string;
  hash: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    // <div className="items-left relative flex flex-col">
    //   {!loaded && (
    //     <Blurhash
    //       hash={hash || "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
    //       width={300}
    //       height={300}
    //       className="absolute left-0 top-0"
    //     />
    //   )}
    //   <img
    //     src={src}
    //     alt={alt}
    //     loading="lazy"
    //     onLoad={() => setLoaded(false)}
    //     className={`object-cover shadow-md transition-all duration-500 ease-in-out ${
    //       loaded ? "opacity-100" : "opacity-0"
    //     } ${className}`}
    //     style={style}
    //   />
    //   {/* <Blurhash
    //     hash={hash || "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
    //     width={300}
    //     height={300}
    //     className="absolute left-0 top-0"
    //   /> */}
    // </div>

    <>
      {/* Always keep a placeholder for Blurhash */}
      <div className="absolute left-0 top-0 h-full w-full">
        {!loaded && (
          <Blurhash
            hash={hash || "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
            width="100%"
            height="100%"
            className="absolute left-0 top-0"
          />
        )}
      </div>

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`object-cover shadow-md transition-opacity duration-100 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        style={style}
      />
    </>
  );
}
