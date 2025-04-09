import { useState, useEffect } from "react";

// Function to calculate image max height based on screen size
function calculateImageHeight(screenWidth: number): number {
  if (screenWidth < 1024) {
    return window.innerHeight * 0.6; // For screens less than 1024px
  } else if (screenWidth >= 1024 && screenWidth < 1280) {
    return window.innerHeight * 0.6; // For 1024px - 1279px
  } else if (screenWidth >= 1280 && screenWidth < 1440) {
    return window.innerHeight * 0.7; // For 1280px - 1439px
  } else if (screenWidth >= 1440 && screenWidth < 1920) {
    return window.innerHeight * 0.8; // For 1440px - 1919px
  } else if (screenWidth >= 1920) {
    return window.innerHeight * 0.9; // For 1920px and larger
  }
  return window.innerHeight * 0.6; // Default if no match
}

// Function to calculate padding based on screen size
function calculatePadding(screenWidth: number): number {
  if (screenWidth < 1024) {
    return 500; // For screens less than 1024px
  } else if (screenWidth >= 1024 && screenWidth < 1280) {
    return 500; // For 1024px - 1279px
  } else if (screenWidth >= 1280 && screenWidth < 1440) {
    return 620; // For 1280px - 1439px
  } else if (screenWidth >= 1440 && screenWidth < 1920) {
    return 775; // For 1440px - 1919px
  } else if (screenWidth >= 1920) {
    return 1025; // For 1920px and larger
  }
  return 500; // Default padding
}

// Custom hook to calculate values on window resize
function useResponsiveValues() {
  const [maxHeight, setMaxHeight] = useState<number>(
    calculateImageHeight(window.innerWidth),
  );
  const [padding, setPadding] = useState<number>(
    calculatePadding(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => {
      setMaxHeight(calculateImageHeight(window.innerWidth)); // Update maxHeight on resize
      setPadding(calculatePadding(window.innerWidth)); // Update padding on resize
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { maxHeight, padding };
}

export default useResponsiveValues;
