import { Theme } from "@/types/themeTypes";

import { useUpdater } from "../otherHooks";

export function useMyThemesUpdater() {
  return useUpdater<{ themes: Theme[] }, "themes">(["myThemes"], "themes");
}
