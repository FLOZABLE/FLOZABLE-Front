import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

// Custom hook to manage modal state with reset on pathname change
function useModalState(initialState, resetOnPathChange = true) {
  const [state, setState] = useState(initialState);
  const pathname = usePathname();

  useEffect(() => {
    if (resetOnPathChange) {
      setState(initialState);
    }
  }, [pathname, resetOnPathChange, initialState]);

  return [state, setState];
}

export { useWindowSize, useModalState };
