import NumberFlow from "@number-flow/react";
import { Slider } from "../ui/slider";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../ui/badge";

type AudioPlayerProps = {
  source: string;
  name: string;
};

export default function AudioPlayer({ source, name }: AudioPlayerProps) {
  const [volume, setVolume] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const audio = new Audio(source);
      audio.loop = true;

      audioRef.current = audio;
    } catch (err) {
      console.log(err);
    }

    return () => {
      //remove audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [source]);

  useEffect(() => {
    if (!audioRef?.current) return;

    if (volume > 0) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    audioRef.current.volume = volume / 100;
  }, [volume]);

  return (
    <div>
      {name}
      <div className="flex gap-5">
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={(volume) => {
            setVolume(volume[0]);
          }}
        />
        <Badge variant={"secondary"}>
          <NumberFlow value={volume} />
        </Badge>
      </div>
    </div>
  );
}
