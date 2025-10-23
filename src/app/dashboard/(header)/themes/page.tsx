"use client";

import { useCreateThemeModal } from "@/components/structure/ModalProviders";
import ThemeContainer from "@/components/themes/ThemeContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useThemes } from "@/hooks/themeHooks";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const PAGE_LENGTH = 30;

export default function Themes() {
  const { themesData, themesIsLoading } = useThemes();

  const { setCreateThemeModal } = useCreateThemeModal();

  const [page, setPage] = useState(1);

  const { ref: inViewRef, inView } = useInView();

  useEffect(() => {
    if (!themesData?.length || !inView) return;
    setPage((page) => {
      if (page * PAGE_LENGTH < themesData?.length) return page + 1;
      return page;
    });
  }, [inView, themesData?.length]);

  return (
    <main className="p-5">
      <div className="flex justify-between w-full items-center mb-5 z-10">
        <h1 className="text-2xl font-semibold">Themes</h1>
        <div>
          <Button
            onClick={() => {
              setCreateThemeModal((prev) => ({ ...prev, opened: true }));
            }}>
            Create theme
          </Button>
        </div>
      </div>
      <Card className="mt-10 mb-32" id="tour1-step19">
        <CardContent>
          {themesIsLoading && <Loader2 className="animate-spin" />}
          <div className="grid grid-cols-[repeat(auto-fill,_20rem)] gap-4 justify-center">
            {themesData?.length ? (
              themesData.slice(0, page * PAGE_LENGTH).map((theme, i) => {
                return (
                  <ThemeContainer
                    key={i}
                    theme={theme}
                    ref={(el) => {
                      if (i === page * PAGE_LENGTH - 3) {
                        inViewRef(el);
                      }
                    }}
                  />
                );
              })
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p>No data available!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
