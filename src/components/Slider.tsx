// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowRight, ArrowLeft } from "lucide-react";
// import TabletMenu from "./TabletMenu";

// interface ImageSliderProps {
//   random?: boolean;
//   images: { id: string; src: string; desc: string; imageHash: string }[];
//   startIndex?: number;
// }

// export function Slider({ random, images, startIndex = 0 }: ImageSliderProps) {
//   const [imageIndex, setImageIndex] = useState(startIndex);
//   const navigate = useNavigate();
//   const { albumId } = useParams();
//   const [maxHeight, setMaxHeight] = useState(window.innerHeight * 0.9);

//   useEffect(() => {
//     const updateHeight = () => setMaxHeight(window.innerHeight * 0.9);
//     window.addEventListener("resize", updateHeight);
//     return () => window.removeEventListener("resize", updateHeight);
//   }, []);

//   function showNextImage() {
//     setImageIndex((index) => {
//       const nextIndex = index === images.length - 1 ? 0 : index + 1;
//       if (!random) navigate(`/photography/${albumId}/${images[nextIndex].id}`);
//       console.log("Next Image Index:", nextIndex); // Debugging
//       return nextIndex;
//     });
//   }

//   function showPrevImage() {
//     setImageIndex((index) => {
//       const prevIndex = index === 0 ? images.length - 1 : index - 1;
//       if (!random) navigate(`/photography/${albumId}/${images[prevIndex].id}`);
//       console.log("Prev Image Index:", prevIndex); // Debugging
//       return prevIndex;
//     });
//   }

//   return (
//     <div className="px-10 pb-[40px] sm:block lg:h-screen lg:pb-[100px] lg:pt-10">
//       <div className="relative w-full max-w-full">
//         <div className="flex w-full overflow-hidden">
//           {images.map(({ src, desc }, index) => {
//             console.log("Image Index:", imageIndex, "Current Index:", index); // Log image index and current index

//             return (
//               <img
//                 key={src}
//                 src={src}
//                 alt={desc}
//                 style={{
//                   maxHeight: `${maxHeight}px`, // Ensure maxHeight is applied
//                   transform: `translateX(${-100 * imageIndex}%)`, // Keep the current image in view
//                   visibility: imageIndex === index ? "visible" : "hidden", // Ensure non-active images are hidden
//                   position: imageIndex === index ? "relative" : "absolute", // Remove non-active images from layout
//                   left: imageIndex === index ? "0" : "-100%", // Ensure non-active images are pushed out of view
//                   opacity: imageIndex === index ? 1 : 0, // Ensure non-active images are completely invisible
//                 }}
//                 aria-hidden={imageIndex !== index} // Accessibility: mark non-active images as hidden
//                 className="w-full shrink-0 grow-0 object-contain transition-transform duration-100 ease-in-out"
//               />
//             );
//           })}
//         </div>

//         <button
//           onClick={showPrevImage}
//           className="absolute bottom-0 left-0 top-0 border-0 p-4 transition-colors ease-in-out focus:outline-none"
//         >
//           <ArrowLeft className="h-8 w-8 text-white" />
//         </button>
//         <button
//           onClick={showNextImage}
//           className="absolute bottom-0 right-0 top-0 border-0 p-4 transition-colors ease-in-out focus:outline-none"
//         >
//           <ArrowRight className="h-8 w-8 text-white" />
//         </button>
//       </div>
//       <TabletMenu />
//     </div>
//   );
// }
