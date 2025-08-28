import { Theme } from "@/types/themeTypes";

import { useUpdater } from "../otherHooks";

export function useThemesUpdater() {
  return useUpdater<{ themes: Theme[] }, "themes">(["themes"], "themes");
}

export function useMyThemesUpdater() {
  return useUpdater<{ themes: Theme[] }, "themes">(["myThemes"], "themes");
}
