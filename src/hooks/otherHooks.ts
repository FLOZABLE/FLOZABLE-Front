import { ApiResponse } from "@/types/responseTypes";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
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

export function useModalState<T>(
  initialState: T,
  resetOnPathChange: boolean = true,
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

export function useMediaQuery(query: string): boolean {
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

export function useUpdater<TData extends object, TKey extends keyof TData>(
  baseQueryKey: unknown[],
  nestedField: TKey,
) {
  const queryClient = useQueryClient();

  return async (
    newData: TData[TKey] | ((oldValue: TData[TKey]) => TData[TKey]),
    dynamicKey?: unknown, // optional if needed
  ) => {
    const queryKey = dynamicKey ? [...baseQueryKey, dynamicKey] : baseQueryKey;

    let updatedFieldValue: TData[TKey] | undefined;

    await queryClient.setQueryData<ApiResponse<TData>>(queryKey, (oldData) => {
      if (!oldData?.data) return oldData;

      const prev = oldData.data[nestedField];
      const updatedValue =
        typeof newData === "function"
          ? (newData as (prev: TData[TKey]) => TData[TKey])(prev)
          : newData;

      updatedFieldValue = updatedValue;

      return {
        ...oldData,
        data: {
          ...oldData.data,
          [nestedField]: updatedValue,
        },
      };
    });

    return updatedFieldValue;
  };
}

export function useInfiniteUpdater<
  TData extends object,
  TKey extends keyof TData,
>(baseQueryKey: unknown[], nestedField: TKey) {
  const queryClient = useQueryClient();

  return async (
    newData: TData[TKey] | ((oldValue: TData[TKey]) => TData[TKey]),
    //dynamicKey?: unknown, // optional if needed
  ) => {
    //const queryKey = dynamicKey ? [...baseQueryKey, dynamicKey] : baseQueryKey;

    let updatedFieldValue: TData[TKey] | undefined;

    await queryClient.setQueriesData<InfiniteData<ApiResponse<TData>>>(
      { queryKey: baseQueryKey, type: "active", exact: false },
      (oldData) => {
        if (!oldData) return oldData;

        const updatedValues = oldData.pages
          .map((page) => {
            const prev = page.data?.[nestedField];
            if (!prev) return;
            const updatedValue =
              typeof newData === "function"
                ? (newData as (prev: TData[TKey]) => TData[TKey])(prev)
                : newData;

            return updatedValue;
          })
          .filter((value) => value);

        return {
          ...oldData,
          ...updatedValues,
        };
      },
    );

    return updatedFieldValue;
  };
}

export function useRemoveSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const removeParams = (paramsToRemove: string[] | string) => {
    const params = new URLSearchParams(searchParams.toString());

    const keys = Array.isArray(paramsToRemove)
      ? paramsToRemove
      : [paramsToRemove];
    keys.forEach((key) => {
      params.delete(key);
    });

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return removeParams;
}

export function useUpdateSearchParam() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return updateParam;
}

export function useFullscreen(): boolean {
  const [isFullscreen, setIsFullscreen] = useState(
    typeof document !== "undefined" && document.fullscreenElement !== null,
  );

  useEffect(() => {
    function handleChange() {
      setIsFullscreen(document.fullscreenElement !== null);
    }

    document.addEventListener("fullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  return isFullscreen;
}

export const useMessageSound = () => {
  const messageAudio = useMemo(() => {
    if (typeof window !== "undefined") {
      return new Audio("/audio/message.mp3");
    }
    return null;
  }, []);

  const playMessageSound = useCallback(() => {
    messageAudio?.play();
  }, [messageAudio]);

  return { playMessageSound };
};
