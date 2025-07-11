"use client";

import { postGroupJoin } from "@/apis/groupApi";
import { useAccount } from "@/hooks/accountHooks";
import { useChatRooms } from "@/hooks/chatHooks";
import { useGroups } from "@/hooks/groupHook";
import { useRemoveSearchParams } from "@/hooks/otherHooks";
import { useRankings } from "@/hooks/rankingHooks";
import {
  useGroupsUpdater,
  useMyGroupsUpdater,
} from "@/hooks/updaters/groupUpdaters";
import {
  postGroupJoinSchema,
  PostGroupJoinSchemaValues,
} from "@/schemas/groupSchemas";
import { Group } from "@/types/groupTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import GroupContainer from "../groups/GroupContainer";
import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { useJoinGroupModal } from "../structure/ModalProviders";
import { Button } from "../ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

export default function JoinGroupModal() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group");

  const removeSearchParams = useRemoveSearchParams();

  const { joinGroupModal, setJoinGroupModal } = useJoinGroupModal();
  const updateGroups = useGroupsUpdater();
  const updateMyGroups = useMyGroupsUpdater();

  const { account } = useAccount();

  const { groups } = useGroups();
  const { rankingsData } = useRankings(
    "day",
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const { chatroomsRefetch } = useChatRooms();

  const group: Group | null = useMemo(() => {
    const group = groups?.find(
      (group) => group.group_id === joinGroupModal.group_id,
    );
    return group ? group : null;
  }, [groups, joinGroupModal.group_id]);

  const form = useForm<PostGroupJoinSchemaValues>({
    resolver: zodResolver(postGroupJoinSchema(group?.visibility ?? true)),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: PostGroupJoinSchemaValues) => {
      if (!group?.group_id || !account) return;
      const response = await postGroupJoin(group?.group_id, data.password);
      if (!response.success || !response.data?.group) return;

      const joinedGroup = response.data.group;

      setJoinGroupModal((prev) => ({ ...prev, opened: false }));

      form.reset();

      localStorage.setItem("swiperGroupId", group.group_id);

      updateGroups((prev) => {
        const newGroups = [...prev];
        const groupIndex = newGroups.findIndex(
          (group) => group.group_id === joinGroupModal.group_id,
        );
        if (groupIndex === -1) return prev;

        newGroups[groupIndex] = joinedGroup;
        return newGroups;
      });

      updateMyGroups((prev) => {
        const newGroups = [...prev, joinedGroup.group_id];
        return newGroups;
      });

      chatroomsRefetch();

      const myGroupsViewer = document.querySelector("#myGroupsViewer");
      myGroupsViewer?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    },
    [account, group, joinGroupModal],
  );

  useEffect(() => {
    if (!groupId) return;
    setTimeout(() => {
      setJoinGroupModal((prev) => ({
        ...prev,
        group_id: groupId,
        opened: true,
      }));
    }, 500);
    removeSearchParams("group");
  }, [groupId]);

  return (
    <Credenza
      open={joinGroupModal.opened}
      onOpenChange={(opened) => {
        setJoinGroupModal((prev) => ({ ...prev, opened }));
        form.reset();
      }}>
      <CredenzaContent desktopClassName="!max-w-100">
        <CredenzaHeader className="justify-self-center justify-center items-center text-center">
          <CredenzaTitle className="text-2xl">Join this group?</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="overflow-hidden">
          <div className="flex flex-col gap-4 px-1">
            {group && (
              <GroupContainer
                group={group}
                rankings={rankingsData}
                isJoinButton={false}
              />
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex justify-center flex-col">
                {!group?.visibility && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            placeholder="Password"
                            {...field}
                            label="Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <Button type="submit">Join</Button>
              </form>
            </Form>
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
