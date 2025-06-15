import {
  HeadphoneOff,
  Headset,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";

import AnimatedSwitchButton from "../buttons/AnimatedSwitchButton";
import { useCallOptions } from "../structure/Providers";
import { Command, CommandGroup, CommandItem } from "../ui/command";

//interface CallControllerProps {}

export default function CallController({} /* : CallControllerProps */) {
  const { isMic, setIsMic, isCam, setIsCam, isHeadphone, setIsHeadphone } =
    useCallOptions();

  return (
    <div className="w-[15rem]">
      <Command>
        <CommandGroup>
          <CommandItem>
            <p>Microphone</p>
            <AnimatedSwitchButton
              className="ml-auto"
              onIcon={<Mic className="text-white" />}
              offIcon={<MicOff />}
              onClick={() => {
                setIsMic((prev) => !prev);
              }}
              clicked={isMic}
            />
          </CommandItem>
          <CommandItem>
            <p>Camera</p>
            <AnimatedSwitchButton
              className="ml-auto"
              onIcon={<Video className="text-white" />}
              offIcon={<VideoOff />}
              onClick={() => {
                setIsCam((prev) => !prev);
              }}
              clicked={isCam}
            />
          </CommandItem>
          <CommandItem>
            <p>Headphone</p>
            <AnimatedSwitchButton
              className="ml-auto"
              onIcon={<Headset className="text-white" />}
              offIcon={<HeadphoneOff />}
              onClick={() => {
                setIsHeadphone((prev) => !prev);
              }}
              clicked={isHeadphone}
            />
          </CommandItem>
        </CommandGroup>
      </Command>
    </div>
  );
}
