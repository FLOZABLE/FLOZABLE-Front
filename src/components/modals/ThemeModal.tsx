"use client";

import ThemeButton from "../buttons/ThemeButton";
//import parser from "html-react-parser";
import { useThemeModal } from "../structure/ModalProviders";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  //CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";
import YoutubePlayer from "../youtube/YouTubePlayer";

export default function ThemeModal() {
  const { themeModal, setThemeModal } = useThemeModal();

  return (
    <Credenza
      open={themeModal.opened}
      onOpenChange={(opened) => {
        setThemeModal((prev) => ({ ...prev, opened }));
      }}>
      <CredenzaContent className="h-[90vh] min-w-[90vw] flex flex-col">
        <CredenzaHeader className="">
          <CredenzaTitle className="text-2xl">
            {themeModal.theme?.name}
          </CredenzaTitle>
          {/* <CredenzaDescription>
            {parser(themeModal.theme?.description || "")}
          </CredenzaDescription> */}
        </CredenzaHeader>
        <CredenzaBody className="flex-1 flex justify-center items-center">
          <div className="w-full h-full relative overflow-hidden rounded-xl">
            <YoutubePlayer
              className="absolute top-0 left-0 w-full h-full"
              volume={0}
              videoId={themeModal.theme?.video_id}
            />
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          {themeModal.theme && <ThemeButton theme={themeModal.theme} />}
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
