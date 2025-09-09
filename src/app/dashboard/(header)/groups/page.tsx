"use client";

import GroupContainer from "@/components/groups/GroupContainer";
import MyGroupsViewer from "@/components/groups/MyGroupsViewer";
import { FloatingLabelInput } from "@/components/inputs/FloatingLabelInput";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
import {
  getGroupSearchSchema,
  getGroupSearchSchemaValues,
} from "@/schemas/groupSchemas";
import { Group } from "@/types/groupTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";

const PAGE_LENGTH = 20;

export default function Groups() {
  const [fetchedQuery, setFetchedQuery] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);

  const { ref: inViewRef, inView } = useInView();
  const { setCreateGroupModal } = useCreateGroupModal();

  const { rankingsData } = useRankings(
    "day",
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const { groupsData, groupsIsLoading, fetchNextPage, hasNextPage } =
    useGroups(fetchedQuery);

  const form = useForm<getGroupSearchSchemaValues>({
    resolver: zodResolver(getGroupSearchSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = useCallback(async (data: getGroupSearchSchemaValues) => {
    setFetchedQuery(data.name);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("fetch");
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (!groupsData?.pages) return;

    const allGroups: Group[] = [];
    groupsData.pages.map((page) => {
      if (!page?.data?.groups) return;

      allGroups.push(...page.data.groups);
    });
    setGroups(allGroups);
  }, [groupsData]);

  return (
    <main className="p-5">
      <Card className="p-6">
        <MyGroupsViewer />
      </Card>
      <Card className="mt-10 mb-32" id="tour1-step19">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Groups</CardTitle>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-x-3 flex justify-center">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          placeholder="Name"
                          label="Search Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  <Search />
                </Button>
              </form>
            </Form>
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
              groups.map((group, i) => {
                return (
                  <GroupContainer
                    key={i}
                    group={group}
                    rankings={rankingsData}
                    ref={(el) => {
                      if (i === groups.length - 10) {
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
        {/* <CardFooter>
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
        </CardFooter> */}
      </Card>
    </main>
  );
}
