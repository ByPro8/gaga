// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Menu from "../components/Menu";
// import BackToHome from "../components/BackToHome";

export default function VimeoPlayer() {
  // const { vimeoId } = useParams();
  // const [iframeSize, setIframeSize] = useState({
  //   width: "100%",
  //   height: "100%",
  // });
  // const [aspectRatio, setAspectRatio] = useState(16 / 9); // Default fallback

  // useEffect(() => {
  //   const fetchVideoInfo = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://vimeo.com/api/v2/video/${vimeoId}.json`,
  //       );
  //       const data = await response.json();

  //       if (data && data.length > 0) {
  //         const { width, height } = data[0];
  //         setAspectRatio(width / height);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch video data", error);
  //     }
  //   };

  //   const updateSize = () => {
  //     const screenWidth = window.innerWidth;
  //     const screenHeight = window.innerHeight;

  //     // Menu width depending on screen size
  //     let menuWidth = 0;
  //     if (screenWidth >= 1440) {
  //       menuWidth = 240;
  //     } else if (screenWidth >= 1024) {
  //       menuWidth = 230;
  //     }

  //     // Set a buffer to avoid horizontal scroll
  //     const buffer = 20; // Buffer for safe margin
  //     const availableWidth = screenWidth - menuWidth - buffer;

  //     // Calculate the height based on aspect ratio and available width
  //     const calculatedHeight = availableWidth / aspectRatio;

  //     // Top and Bottom Padding (40px each)
  //     const padding = 400;
  //     const totalVerticalPadding = padding * 2; // 40px top + 40px bottom

  //     // Ensure the height doesn't exceed the screen height (with padding)
  //     let finalHeight = calculatedHeight;

  //     // Check if the video + padding exceeds the screen height
  //     if (finalHeight + totalVerticalPadding > screenHeight) {
  //       finalHeight = screenHeight - totalVerticalPadding;
  //     }

  //     // Adjust the width based on the final height and aspect ratio
  //     const finalWidth = finalHeight * aspectRatio;

  //     setIframeSize({
  //       width: `${finalWidth}px`,
  //       height: `${finalHeight}px`,
  //     });
  //   };

  //   if (vimeoId) {
  //     fetchVideoInfo().then(updateSize);
  //   }

  //   window.addEventListener("resize", updateSize);
  //   return () => window.removeEventListener("resize", updateSize);
  // }, [vimeoId, aspectRatio]);

  // if (!vimeoId) return <div>Video not found</div>;

  return (
    <></>
    // <div className="flex min-h-screen w-full flex-col lg:flex-row">
    //   <Menu />
    //   <BackToHome />

    //   <div className="relative flex-grow">
    //     <iframe
    //       title="Vimeo Player"
    //       src={`https://player.vimeo.com/video/${vimeoId}`}
    //       allowFullScreen
    //       className="absolute left-10 top-10"
    //       style={{
    //         width: iframeSize.width,
    //         height: iframeSize.height,
    //       }}
    //     ></iframe>
    //   </div>
    // </div>
  );
}
