"use client";

import GroupContainer from "@/components/groups/GroupContainer";
import MyGroupsViewer from "@/components/groups/MyGroupsViewer";
import { useCreateGroupModal } from "@/components/structure/ModalProviders";
import { Button } from "@/components/ui/button";
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
import { useGroups } from "@/hooks/groupHook";
import { useRankings } from "@/hooks/rankingHooks";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

const PAGE_LENGTH = 20;

export default function Groups() {
  const { groups, groupsIsLoading } = useGroups();
  const { rankingsData } = useRankings(
    "day",
    new Date(new Date().setHours(0, 0, 0, 0)),
  );

  const [page, setPage] = useState(1);

  const { setCreateGroupModal } = useCreateGroupModal();

  return (
    <main className="p-5">
      <Card className="p-6">
        <MyGroupsViewer />
      </Card>
      <Card className="mt-10 mb-32" id="tour1-step19">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Groups</CardTitle>
          <div>
            
          </div>
          <Button
            effect={"expandIcon"}
            iconPlacement="right"
            icon={Plus}
            onClick={() => {
              setCreateGroupModal((prev) => !prev);
            }}>
            Create group
          </Button>
        </CardHeader>
        <CardContent>
          {groupsIsLoading && <Loader2 className="animate-spin" />}
          <div className="grid grid-cols-[repeat(auto-fill,_20rem)] gap-4 justify-center">
            {groups?.length ? (
              groups
                .slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH)
                .map((group, i) => {
                  return (
                    <GroupContainer
                      key={i}
                      group={group}
                      rankings={rankingsData}
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
                    if (page * PAGE_LENGTH >= (groups?.length || 0)) return;
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
