"use client";

import { useChatRooms } from "@/hooks/chatHooks";
import { useGroup } from "@/hooks/groupHooks";
import { useJoinGroupMutation } from "@/hooks/mutations/groupMutations";
import { useRemoveSearchParams } from "@/hooks/otherHooks";
import { useRankings } from "@/hooks/rankingHooks";
import {
  postGroupJoinSchema,
  PostGroupJoinSchemaValues,
} from "@/schemas/groupSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
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

  const joinMutation = useJoinGroupMutation();

  const { group } = useGroup(joinGroupModal.groupId);

  const { rankingsData } = useRankings(
    "day",
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const { chatroomsRefetch } = useChatRooms();

  const form = useForm<PostGroupJoinSchemaValues>({
    resolver: zodResolver(postGroupJoinSchema(group?.visibility ?? true)),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: PostGroupJoinSchemaValues) => {
      if (!group) return;
      joinMutation.mutate(
        {
          groupId: group.group_id,
          password: data.password,
        },
        {
          onSuccess: (response) => {
            if (!response.success) return;

            setJoinGroupModal((prev) => ({ ...prev, opened: false }));

            form.reset();

            localStorage.setItem("swiperGroupId", group.group_id);

            chatroomsRefetch();

            const myGroupsViewer = document.querySelector("#myGroupsViewer");
            myGroupsViewer?.scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "nearest",
            });
          },
        },
      );
    },
    [group],
  );

  useEffect(() => {
    if (!groupId) return;

    setTimeout(() => {
      setJoinGroupModal((prev) => ({
        ...prev,
        groupId,
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
                groupId={group.group_id}
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
