"use client";

import { DatePicker } from "@/components/buttons/DatePicker";
import RankingTrendChart from "@/components/charts/RankingTrendChart";
import TopLeaderboard from "@/components/leaderboard/TopLeaderboard";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SelectorWrapper from "@/components/ui/select";
import UserContainer from "@/components/users/UserContainer";
import { useAccount } from "@/hooks/accountHooks";
import { useUpdateSearchParam } from "@/hooks/otherHooks";
import { useRankings } from "@/hooks/rankingsHooks";
import { ViewerType } from "@/types/others";
import { secondConverter } from "@/utils/tools";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PAGE_LENGTH = 30;

export default function Leaderboard() {
  const [viewDate, setViewDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState<ViewerType>("day");

  const { account } = useAccount();
  const { rankingsData, rankingsIsLoading } = useRankings(viewer, viewDate);

  const router = useRouter();

  const searchParams = useSearchParams();
  const page: number = parseInt(searchParams.get("page") || "1");

  const updateSearchParam = useUpdateSearchParam();

  useEffect(() => {
    updateSearchParam("page", "1");
  }, [viewDate, viewer]);

  return (
    <main className="p-5">
      <div className="flex justify-between w-full items-center mb-5 z-10">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <div className="flex gap-3 fixed right-8 top-16 z-10">
          <DatePicker
            viewDate={viewDate}
            setViewDate={setViewDate}
            viewer={viewer}
          />
          <SelectorWrapper
            value={viewer}
            onChange={(viewer: ViewerType) => {
              setViewer(viewer);
            }}
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1/2 flex flex-col gap-4">
          <RankingTrendChart
            viewDate={viewDate}
            viewer={viewer}
            userId={account?.user_id}
            className="h-[30rem]"
          />
          <Card className="">
            <CardHeader>
              <CardTitle>Study Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="min-h-96">
              {rankingsIsLoading && <Loader2 className="animate-spin" />}
              {rankingsData?.length ? (
                rankingsData
                  .slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH)
                  .map((rankingInfo, i) => {
                    return (
                      <div key={i} className="flex items-center">
                        {rankingInfo.ranking}
                        <UserContainer
                          userinfo={rankingInfo}
                          onClick={() => {
                            router.push(
                              `/dashboard/user/${rankingInfo.user_id}`
                            );
                          }}
                        />
                        <Badge className="ml-auto" variant={"secondary"}>
                          {secondConverter({ sec: rankingInfo.study_time })}
                        </Badge>
                      </div>
                    );
                  })
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <p>
                    No data available for this date. Start studying to get on
                    the leaderboard!
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (page <= 1) return;
                        updateSearchParam("page", (page - 1).toString());
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
                        if (page * PAGE_LENGTH >= (rankingsData?.length || 0))
                          return;
                        updateSearchParam("page", (page + 1).toString());
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </div>
        <div className="shrink-0 w-92">
          <TopLeaderboard
            viewer={viewer}
            viewDate={viewDate}
            className="flex-1/3"
          />
        </div>
      </div>
    </main>
  );
}
