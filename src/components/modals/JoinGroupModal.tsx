"use client";

import { useGroups } from "@/hooks/groupHook";
import { useJoinGroupModal } from "../structure/ModalProviders";
import {
  Credenza,
  CredenzaBody,
  CredenzaHeader,
  CredenzaContent,
  CredenzaTitle,
} from "../ui/credenza";
import GroupContainer from "../groups/GroupContainer";
import { useCallback, useEffect, useMemo } from "react";
import { Group } from "@/types/groupTypes";
import { useRankings } from "@/hooks/rankingHooks";
import { Button } from "../ui/button";
import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useSearchParams } from "next/navigation";
import { useRemoveSearchParams } from "@/hooks/otherHooks";
import { postGroupJoin } from "@/apis/groupsApi";
import {
  useGroupsUpdater,
  useMyGroupsUpdater,
} from "@/hooks/updaters/groupUpdaters";
import { useAccount } from "@/hooks/accountHooks";

const passwordSchema = z
  .string()
  .min(5, { message: "Password is too short (5 characters minimum)" })
  .max(20, { message: "Password is too long (20 characters maximum)" });

const FormSchema = (visibility: boolean) =>
  z.object({
    password: visibility ? z.string().optional() : passwordSchema,
  });

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
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  const group: Group | null = useMemo(() => {
    const group = groups?.find(
      (group) => group.group_id === joinGroupModal.group_id
    );
    return group ? group : null;
  }, [groups, joinGroupModal.group_id]);

  const form = useForm<z.infer<ReturnType<typeof FormSchema>>>({
    resolver: zodResolver(FormSchema(group?.visibility ?? true)),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<ReturnType<typeof FormSchema>>) => {
      if (!group?.group_id || !account) return;
      const response = await postGroupJoin(group?.group_id, data.password);
      if (!response.success) return;

      setJoinGroupModal((prev) => ({ ...prev, opened: false }));

      form.reset();

      localStorage.setItem("swiperGroupId", group.group_id);

      updateGroups((prev) => {
        const newGroups = [...prev];
        const groupIndex = newGroups.findIndex(
          (group) => group.group_id === joinGroupModal.group_id
        );
        if (groupIndex === -1) return prev;

        newGroups[groupIndex] = {
          ...newGroups[groupIndex],
          members: [...newGroups[groupIndex].members, account.user_id],
        };
        return newGroups;
      });

      const updatedMyGroups = await updateMyGroups((prev) => {
        const newGroup = { ...group };
        newGroup.members = [...newGroup.members, account.user_id];
        const newGroups = [...prev, newGroup.group_id];
        return newGroups;
      });

      //slide to my groups viewer & index of group
      const groupIndex = updatedMyGroups?.findIndex(
        (myGroupId) => myGroupId === group.group_id
      );
      if (groupIndex === -1 || !groupIndex) return;

      /* setTimeout(() => {
        joinGroupModal.myGroupsSwiper?.slideTo(groupIndex);
      }, 1000); */

      const myGroupsViewer = document.querySelector("#myGroupsViewer");
      myGroupsViewer?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    },
    [account, group, joinGroupModal]
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
      }}
    >
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
                className="space-y-6 flex justify-center flex-col"
              >
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
