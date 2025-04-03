import { usePathname } from "next/navigation";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

function useModalState<T>(
  initialState: T,
  resetOnPathChange: boolean = true
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);
  const pathname = usePathname();

  useEffect(() => {
    if (resetOnPathChange) {
      setState(initialState);
    }
  }, [pathname, resetOnPathChange, initialState]);

  return [state, setState];
}

function useMediaQuery(query: string): boolean {
  const [value, setValue] = useState<boolean>(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

export { useWindowSize, useModalState, useMediaQuery };
