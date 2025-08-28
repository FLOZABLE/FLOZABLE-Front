import { postThemeSave, postThemeUnsave } from "@/apis/themeApi";
import { useMyThemes } from "@/hooks/themeHooks";
import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";

import { Button, ButtonProps } from "../ui/button";

interface ThemeButtonProps extends ButtonProps {
  themeId: string;
}

export default function ThemeButton({
  themeId,
  className,
  ...props
}: ThemeButtonProps) {
  const { myThemesData } = useMyThemes();

  const onSave = useCallback(async () => {
    const response = await postThemeSave(themeId);
  }, [themeId]);

  const onUnsave = useCallback(async () => {
    const response = await postThemeUnsave(themeId);
  }, [themeId]);

  const isSaved = useMemo(() => {
    return myThemesData?.find((myTheme) => myTheme.theme_id === themeId);
  }, [themeId]);

  return (
    <Button
      className={cn("", className)}
      {...props}
      onClick={() => {
        if (isSaved) {
          onUnsave();
        } else {
          onSave();
        }
      }}>
      {isSaved ? "Unsave" : "Save"}
    </Button>
  );
}
