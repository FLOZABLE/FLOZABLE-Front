import { postThemeLike } from "@/apis/themeApi";
import { useAccount } from "@/hooks/accountHooks";
import {
  useMyThemesUpdater,
  useThemesUpdater,
} from "@/hooks/updaters/themeUpdaters";
import { cn } from "@/lib/utils";
import { Theme } from "@/types/themeTypes";
import parser from "html-react-parser";
import { Heart } from "lucide-react";
import Image from "next/image";
import { ComponentProps, useCallback, useEffect, useState } from "react";

import CopyLinkButton from "../buttons/CopyLinkButton";
import LikeButton from "../buttons/LikeButton/LikeButton";
import ThemeButton from "../buttons/ThemeButton";
import { useThemeModal } from "../structure/ModalProviders";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface ThemeContainerProps extends ComponentProps<"div"> {
  theme: Theme;
  isMine?: boolean;
  setTheme?: React.Dispatch<React.SetStateAction<string>>;
}

export default function ThemeContainer({
  theme,
  isMine,
  className,
  setTheme,
  ...props
}: ThemeContainerProps) {
  const themesUpdater = useThemesUpdater();
  const myThemesUpdater = useMyThemesUpdater();

  const { setThemeModal } = useThemeModal();

  const { account } = useAccount();

  const [liked, setLiked] = useState<string[]>([]);

  const onLike = useCallback(async () => {
    if (!account?.user_id) return;

    const like = !liked.includes(account?.user_id);
    const response = await postThemeLike(theme.theme_id, like);
    if (!response.success) return;

    const updatedThemes = await themesUpdater((prev) => {
      const newThemes = [...prev];
      const themeIndex = newThemes.findIndex(
        (_theme) => _theme.theme_id === theme.theme_id,
      );
      if (themeIndex === -1) return prev;

      if (like) {
        newThemes[themeIndex].likes.push(account.user_id);
      } else {
        newThemes[themeIndex].likes = newThemes[themeIndex].likes.filter(
          (like) => like !== account.user_id,
        );
      }
      return newThemes;
    });

    await myThemesUpdater((prev) => {
      const newThemes = [...prev];
      const themeIndex = newThemes.findIndex(
        (_theme) => _theme.theme_id === theme.theme_id,
      );
      if (themeIndex === -1) return prev;

      if (like) {
        newThemes[themeIndex].likes.push(account.user_id);
      } else {
        newThemes[themeIndex].likes = newThemes[themeIndex].likes.filter(
          (like) => like !== account.user_id,
        );
      }
      return newThemes;
    });

    const newTheme = updatedThemes?.find(
      (_theme) => _theme.theme_id === theme.theme_id,
    );
    if (newTheme?.likes) {
      setLiked([...newTheme.likes]);
    }
  }, [theme, account, liked]);

  useEffect(() => {
    setLiked(theme.likes);
  }, [theme.likes]);

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-5 flex flex-col gap-2 bg-background relative",
        className,
      )}
      {...props}>
      <h3 className="font-semibold truncate shrink-0">{theme.name}</h3>
      <div className="overflow-auto">{parser(theme.description)}</div>
      <div className="relative h-20 mt-auto shrink-0">
        <Image
          src={`https://img.youtube.com/vi/${theme.video_id}/hqdefault.jpg`}
          fill // This makes the image fill its parent
          style={{ objectFit: "cover" }} // Optional: Controls how the image fits within its container
          alt=""
          className="w-fit rounded-xl"
        />
      </div>
      {isMine ? (
        <Button
          onClick={() => {
            setTheme?.(theme.video_id);
          }}>
          Apply it
        </Button>
      ) : (
        <Button
          onClick={() => {
            setThemeModal((prev) => ({ ...prev, theme, opened: true }));
          }}>
          Try it
        </Button>
      )}
      <div className="flex gap-1">
        <Badge variant={"outline"}>
          <Heart />
          {liked.length}
        </Badge>
      </div>
      {theme.tags.length ? (
        <div className="flex gap-1 overflow-auto pb-3 shrink-0">
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

        <ThemeButton theme={theme} />
        <LikeButton
          liked={liked.includes(account?.user_id || "")}
          onClick={onLike}
        />
      </div>
    </div>
  );
}
