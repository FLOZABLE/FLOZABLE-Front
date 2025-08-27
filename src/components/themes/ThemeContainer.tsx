import { useAccount } from "@/hooks/accountHooks";
import { cn } from "@/lib/utils";
import { Theme } from "@/types/themeTypes";
import parser from "html-react-parser";
import Image from "next/image";
import { ComponentProps, useCallback, useState } from "react";

import CopyLinkButton from "../buttons/CopyLinkButton";
import LikeButton from "../buttons/LikeButton/LikeButton";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface ThemeContainerProps extends ComponentProps<"div"> {
  theme: Theme;
}

export default function ThemeContainer({
  theme,
  className,
  ...props
}: ThemeContainerProps) {
  const { account } = useAccount();

  const [liked, setLiked] = useState<string[]>([]);

  const onLike = useCallback(() => {}, []);

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-5 flex flex-col gap-2 bg-background",
        className,
      )}
      {...props}>
      <h3 className="font-semibold truncate">{theme.name}</h3>
      <div className="mb-5">{parser(theme.description)}</div>
      <div className="flex gap-1 mt-auto">
        {/* <Badge variant={"outline"}>
          <UserRound />
          {group.members.length}
        </Badge>
        <Badge variant={"outline"}>
          <Goal />
          {group.goal_hr}
        </Badge>
        <Badge variant={"outline"}>
          <Hourglass />
          {totalTime}
        </Badge>
        <Badge variant={"outline"}>
          <Heart />
          {liked.length}
        </Badge> */}
      </div>
      <div className="w-full relative h-full">
        <Image
          src={`https://img.youtube.com/vi/${theme.video_id}/hqdefault.jpg`}
          fill // This makes the image fill its parent
          style={{ objectFit: "cover" }} // Optional: Controls how the image fits within its container
          alt=""
          className="w-fit"
        />
      </div>
      {theme.tags.length ? (
        <div className="flex gap-1 overflow-auto pb-3">
          {theme.tags.map((tag, i) => (
            <Badge key={i} variant={"secondary"}>
              #{tag}
            </Badge>
          ))}
        </div>
      ) : null}
      <div className="flex justify-between relative">
        {/* <CopyButton value="ddddd" /> */}
        <CopyLinkButton link={`/dashboard/themes?theme=${theme.theme_id}`} />

        <Button className="absolute-center" onClick={() => {}}></Button>
        <LikeButton
          liked={liked.includes(account?.user_id || "")}
          onClick={onLike}
        />
      </div>
    </div>
  );
}
