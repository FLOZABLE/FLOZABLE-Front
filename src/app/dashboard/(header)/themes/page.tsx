"use client";

import { useCreateThemeModal } from "@/components/structure/ModalProviders";
import ThemeContainer from "@/components/themes/ThemeContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useThemes } from "@/hooks/themeHooks";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const PAGE_LENGTH = 10;

export default function Themes() {
  const { themesData, themesIsLoading } = useThemes();

  const { setCreateThemeModal } = useCreateThemeModal();

  const [page, setPage] = useState(1);

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
              themesData
                .slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH)
                .map((group, i) => {
                  return <ThemeContainer key={i} theme={group} />;
                })
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p>No data available!</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (page <= 1) return;
                    setPage(page - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>{page}</PaginationLink>
                {/* <PaginationLink href="#">1</PaginationLink> */}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (page * PAGE_LENGTH >= (themesData?.length || 0)) return;
                    setPage(page + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </main>
  );
}
