import { useState, useEffect } from "react";

// Define the threshold for small screens (in pixels)
const SMALL_SCREEN_THRESHOLD = 768;

// Custom hook to determine if the screen size is small
function useScreenSize() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < SMALL_SCREEN_THRESHOLD);
    }

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once to set initial state
    handleResize();

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return { isSmallScreen };
}

export default useScreenSize;
