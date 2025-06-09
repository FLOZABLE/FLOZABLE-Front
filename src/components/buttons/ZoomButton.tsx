import AnimatedSwitchButton from "./AnimatedSwitchButton";
import { exitFullscreen } from "@/lib/utils";
import { Maximize2, Minimize2 } from "lucide-react";
import { useFullscreen } from "@/hooks/otherHooks";

export default function ZoomButton() {
  const isFullScreen = useFullscreen();
  return (
    <AnimatedSwitchButton
      onIcon={<Minimize2 />}
      offIcon={<Maximize2 />}
      clicked={isFullScreen}
      onClick={() => {
        if (isFullScreen) {
          exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }}
      variant={"ghost"}
    />
  );
}
