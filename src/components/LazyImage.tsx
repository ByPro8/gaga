import { useState } from "react";
import { Blurhash } from "react-blurhash";
// import { motion } from "framer-motion";

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
    <div className="s2 relative h-full w-full overflow-hidden" style={style}>
      {!loaded && (
        <Blurhash
          hash={hash || "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
          width="100%"
          height="100%"
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover ${className}`}
        style={{ position: "relative", zIndex: 1 }}
      />
    </div>
  );
}
