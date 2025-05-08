import { ComponentProps } from "react";
import AudioPlayer from "./AudioPlayer";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import NumberFlow from "@number-flow/react";

const audios = [
  {
    id: "Fire",
    source: "../../audio/Fire.mp3",
  },
  {
    id: "Forest",
    source: "../../audio/Forest.mp3",
  },
  {
    id: "Rain",
    source: "../../audio/Rain.mp3",
  },
  {
    id: "Wave",
    source: "../../audio/Wave.mp3",
  },
  {
    id: "Wind",
    source: "../../audio/Wind.mp3",
  },
];

interface AudioControllerProps extends ComponentProps<"div"> {
  themeVolume: number;
  setThemeVolume: (volume: number) => void;
}

export default function AudioController({
  themeVolume,
  setThemeVolume,
}: AudioControllerProps) {
  return (
    <div className="w-[20rem]">
      Theme
      <div className="flex gap-5">
        <Slider
          defaultValue={[themeVolume]}
          max={100}
          step={1}
          onValueCommit={(volume) => {
            setThemeVolume(volume[0]);
          }}
        />
        <Badge variant={"secondary"}>
          <NumberFlow value={themeVolume} />
        </Badge>
      </div>
      {audios.map((audio, i) => {
        return <AudioPlayer key={i} source={audio.source} name={audio.id} />;
      })}
    </div>
  );
}
