import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";

import { useCallOptions } from "../structure/Providers";

export default function MyContextMenu() {
  const { isCam, setIsCam, isMic, setIsMic } = useCallOptions();

  return (
    <ContextMenuContent>
      <ContextMenuItem
        onClick={() => {
          setIsCam((prev) => !prev);
        }}>
        {isCam ? "Turn off camera" : "Turn on camera"}
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => {
          setIsMic((prev) => !prev);
        }}>
        {isMic ? "Turn off mic" : "Turn on mic"}
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
