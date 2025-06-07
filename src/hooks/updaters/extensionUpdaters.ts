import { WebsiteSetting } from "@/types/websiteTypes";
import { useUpdater } from "../otherHooks";

export function useExtensionSettingsUpdater() {
  return useUpdater<{ settings: WebsiteSetting[] }, "settings">(
    ["extensionSettings"],
    "settings"
  );
}
