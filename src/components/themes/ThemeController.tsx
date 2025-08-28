import { useMyThemes } from "@/hooks/themeHooks";
import { useState } from "react";

import { ColorPicker } from "../inputs/ColorPicker";
import ThemeContainer from "./ThemeContainer";

interface ThemeControllerProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export default function ThemeController({ setTheme }: ThemeControllerProps) {
  const { myThemesData } = useMyThemes();
  const [color, setColor] = useState<null | string>(null);

  return (
    <div className="w-[30rem]">
      <div className="overflow-auto flex gap-3 mb-4">
        {myThemesData?.map((theme) => {
          return (
            <ThemeContainer
              theme={theme}
              className="w-52 h-96"
              key={theme.theme_id}
              isMine={true}
              setTheme={setTheme}
            />
          );
        })}
      </div>
      <ColorPicker
        color={color}
        setColor={(newColor) => {
          setColor(newColor);
          setTheme?.(`${newColor}`);
        }}
        options={["solid"]}
      />
    </div>
  );
}
