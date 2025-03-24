import Menu from "../components/Menu";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

export default function Photography() {
  const images = [
    {
      src: "/Albums/Horizon/00167847.webp",
      desc: "Somewhere over the rainbow",
      hash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
    },
    {
      src: "/Albums/Horizon/03A.webp",
      desc: "Somewhere over the rainbow",
      hash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    },
    {
      src: "/Albums/Horizon/08AA.webp",
      desc: "Somewhere over the rainbow",
      hash: "L9ASgYI9xtRjJtbFjZWB00~Wrrbc",
    },
    {
      src: "/Albums/Horizon/1.webp",
      desc: "Somewhere over the rainbow",
      hash: "LHA-V]%h4.ay5Zofz:S#M{ofD*j[",
    },
    {
      src: "/Albums/Horizon/10.webp",
      desc: "Somewhere over the rainbow",
      hash: "LLHVd*j[00oy-;j[oLj[~qj[j[j[",
    },
    {
      src: "/Albums/Horizon/10A.webp",
      desc: "Somewhere over the rainbow",
      hash: "LMEkFROJR*t6?bRjM{Rj%gt7Rjj[",
    },
    {
      src: "/Albums/Horizon/11.webp",
      desc: "Somewhere over the rainbow",
      hash: "L5AdK~%N%Mj[00j[4mof?vayRjj[",
    },
    {
      src: "/Albums/Horizon/IMG_0394.webp",
      desc: "Somewhere over the rainbow",
      hash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
    },
    {
      src: "/Albums/Horizon/IMG_1410done.webp",
      desc: "Somewhere over the rainbow",
      hash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
    },
    {
      src: "/Albums/Horizon/IMG_7534done.webp",
      desc: "Somewhere over the rainbow",
      hash: "L9ASgYI9xtRjJtbFjZWB00~Wrrbc",
    },
    {
      src: "/Albums/Horizon/IMG_8149a.webp",
      desc: "Somewhere over the rainbow",
      hash: "LHA-V]%h4.ay5Zofz:S#M{ofD*j[",
    },
    {
      src: "/Albums/Horizon/IMG_8660a.webp",
      desc: "Somewhere over the rainbow",
      hash: "LLHVd*j[00oy-;j[oLj[~qj[j[j[",
    },
  ];
  return (
    <div className="flex h-screen w-full flex-col text-gray-500 sm:flex-col lg:flex-row">
      <Menu />

      <div className="flex w-[100%] max-w-[1400px] flex-wrap justify-center gap-6 p-6 sm:w-[100%] lg:w-[70%] lg:pl-0 lg2:w-[75%] xl:w-[80%]">
        {images.map((img, index) => (
          <LazyImage key={index} src={img.src} hash={img.hash} alt={img.desc} />
        ))}
      </div>
    </div>
  );
}

function LazyImage({
  src,
  hash,
  alt,
}: {
  src: string;
  hash: string;
  alt: string;
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
        className={`h-[300px] w-[300px] object-cover shadow-md transition-all duration-500 ease-in-out ${loaded ? "opacity-100" : "opacity-0"}`}
      />
      <span className="mt-2 text-sm font-normal text-gray-500">{alt}</span>
    </div>
  );
}
