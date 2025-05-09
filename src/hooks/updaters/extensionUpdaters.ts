import { WebsiteSetting } from "@/types/website";
import { useUpdater } from "../otherHooks";

export function useExtensionSettingsUpdater() {
  return useUpdater<{ settings: WebsiteSetting[] }, "settings">(
    ["extensionSettings"],
    "settings"
  );
}
