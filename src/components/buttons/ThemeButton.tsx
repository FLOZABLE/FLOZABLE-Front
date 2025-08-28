import { postThemeSave, postThemeUnsave } from "@/apis/themeApi";
import { useMyThemes } from "@/hooks/themeHooks";
import { useMyThemesUpdater } from "@/hooks/updaters/themeUpdaters";
import { cn } from "@/lib/utils";
import { Theme } from "@/types/themeTypes";
import { useCallback, useMemo } from "react";

import { Button, ButtonProps } from "../ui/button";

interface ThemeButtonProps extends ButtonProps {
  theme: Theme;
}

export default function ThemeButton({
  theme,
  className,
  ...props
}: ThemeButtonProps) {
  const { myThemesData } = useMyThemes();

  const myThemesUpdater = useMyThemesUpdater();

  const onSave = useCallback(async () => {
    const response = await postThemeSave(theme.theme_id);
    if (!response.success) return;

    myThemesUpdater((prev) => [...prev, theme]);
  }, [theme]);

  const onUnsave = useCallback(async () => {
    const response = await postThemeUnsave(theme.theme_id);
    if (!response.success) return;

    myThemesUpdater((prev) =>
      prev.filter((myOldTheme) => myOldTheme.theme_id !== theme.theme_id),
    );
  }, [theme]);

  const isSaved = useMemo(() => {
    return myThemesData?.find((myTheme) => myTheme.theme_id === theme.theme_id);
  }, [theme, myThemesData]);

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
