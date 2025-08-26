"use client";

import { useFriendSearch } from "@/hooks/friendHooks";
import {
  getFriendSearchSchema,
  getFriendSearchSchemaSchemaValues,
} from "@/schemas/friendSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { useSearchUsersModal } from "../structure/ModalProviders";
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
import UserContainer from "../users/UserContainer";

export default function SearchUsersModal() {
  const { searchUsersModal, setSearchUsersModal } = useSearchUsersModal();

  const form = useForm<getFriendSearchSchemaSchemaValues>({
    resolver: zodResolver(getFriendSearchSchema),
    defaultValues: {
      name: "",
    },
  });

  const [fetchedQuery, setFetchedQuery] = useState("");

  const { friendsSearchData } = useFriendSearch(fetchedQuery);

  const onSubmit = useCallback(
    async (data: getFriendSearchSchemaSchemaValues) => {
      setFetchedQuery(data.name);
    },
    [],
  );

  return (
    <Credenza
      open={searchUsersModal.opened}
      onOpenChange={() => {
        setSearchUsersModal((prev) => ({ opened: !prev }));
      }}>
      <CredenzaContent desktopClassName="!max-w-100">
        <CredenzaHeader className="justify-self-center justify-center items-center text-center">
          <CredenzaTitle className="text-2xl">
            Search your friends!
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="">
          <div className="flex flex-col gap-4 px-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex justify-center flex-col">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          placeholder="Name"
                          label="Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Search</Button>
              </form>
            </Form>
            <div className="max-h-40 overflow-auto">
              {friendsSearchData?.map((friend) => (
                <div key={friend.user_id}>
                  <UserContainer userinfo={friend} />
                </div>
              ))}
            </div>
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
