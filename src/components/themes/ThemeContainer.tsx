import { postThemeSave, postThemeUnsave } from "@/apis/themeApi";
import { useAccount } from "@/hooks/accountHooks";
import { useMyThemes } from "@/hooks/themeHooks";
import { cn } from "@/lib/utils";
import { Theme } from "@/types/themeTypes";
import parser from "html-react-parser";
import { Heart } from "lucide-react";
import Image from "next/image";
import { ComponentProps, useCallback, useState } from "react";

import CopyLinkButton from "../buttons/CopyLinkButton";
import LikeButton from "../buttons/LikeButton/LikeButton";
import { useThemeModal } from "../structure/ModalProviders";
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
  const { setThemeModal } = useThemeModal();

  const { account } = useAccount();

  const { myThemesData, myThemesIsLoading } = useMyThemes();

  const [liked, setLiked] = useState<string[]>([]);

  const onLike = useCallback(() => {}, []);

  const onSave = useCallback(async () => {
    const response = await postThemeSave(theme.theme_id);
  }, [theme]);

  const onUnsave = useCallback(async () => {
    const response = await postThemeUnsave(theme.theme_id);
  }, [theme]);

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-5 flex flex-col gap-2 bg-background relative",
        className,
      )}
      {...props}>
      <h3 className="font-semibold truncate">{theme.name}</h3>
      <div className="mb-5">{parser(theme.description)}</div>
      <div className="relative h-20">
        <Image
          src={`https://img.youtube.com/vi/${theme.video_id}/hqdefault.jpg`}
          fill // This makes the image fill its parent
          style={{ objectFit: "cover" }} // Optional: Controls how the image fits within its container
          alt=""
          className="w-fit rounded-xl"
        />
      </div>
      <Button
        onClick={() => {
          setThemeModal((prev) => ({ ...prev, theme, opened: true }));
        }}>
        Try it
      </Button>
      <div className="flex gap-1 mt-auto">
        <Badge variant={"outline"}>
          <Heart />
          {liked.length}
        </Badge>
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

        {myThemesData?.find(
          (myTheme) => myTheme.theme_id === theme.theme_id,
        ) ? (
          <Button className="absolute-center" onClick={onUnsave}>
            Unsave
          </Button>
        ) : (
          <Button className="absolute-center" onClick={onSave}>
            Save
          </Button>
        )}
        <LikeButton
          liked={liked.includes(account?.user_id || "")}
          onClick={onLike}
        />
      </div>
    </div>
  );
}
