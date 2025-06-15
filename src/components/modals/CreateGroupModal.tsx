"use client";

import { putGroup } from "@/apis/groupApi";
import {
  useGroupsUpdater,
  useMyGroupsUpdater,
} from "@/hooks/updaters/groupUpdaters";
import { putGroupSchema, PutGroupSchemaValues } from "@/schemas/groupSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import Editor from "../editor/Editor";
import { ColorPicker } from "../inputs/ColorPicker";
import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { useCreateGroupModal } from "../structure/ModalProviders";
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

export default function CreateGroupModal() {
  const { createGroupModal, setCreateGroupModal } = useCreateGroupModal();

  const form = useForm<PutGroupSchemaValues>({
    resolver: zodResolver(putGroupSchema),
    defaultValues: {
      name: "",
      password: "",
      description: "",
      max_members: 10,
      tags: [],
      color: "",
      goal_hr: 1,
      visibility: true,
    },
  });

  const visibility = form.watch("visibility");

  const updateGroups = useGroupsUpdater();
  const updateMyGroups = useMyGroupsUpdater();

  const onSubmit = useCallback(async (data: PutGroupSchemaValues) => {
    const response = await putGroup(data);
    if (!response.success || !response.data?.group) return;

    setCreateGroupModal((prev) => !prev);

    form.reset();

    const newGroup = response.data.group;

    localStorage.setItem("swiperGroupId", newGroup.group_id);

    updateGroups((prev) => {
      const newGroups = [...prev, newGroup];
      return newGroups;
    });

    updateMyGroups((prev) => {
      const newGroups = [...prev, newGroup.group_id];
      return newGroups;
    });

    const myGroupsViewer = document.querySelector("#myGroupsViewer");
    myGroupsViewer?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, []);

  return (
    <Credenza
      open={createGroupModal}
      onOpenChange={(opened) => {
        setCreateGroupModal(opened);
      }}>
      <CredenzaContent desktopClassName="!max-w-100">
        <CredenzaHeader className="justify-self-center justify-center items-center text-center">
          <CredenzaTitle className="text-2xl">Create group</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="overflow-y-auto overflow-x-visible max-h-[80vh]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 flex flex-col px-3 py-2">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        placeholder="Group Name"
                        label="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor
                        value={field.value}
                        onHtmlChange={(text) => field.onChange(text)}
                        contentEditorClassName="max-h-[200]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Max Members */}
              <FormField
                control={form.control}
                name="max_members"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        type="number"
                        placeholder="Max Members"
                        label="Max Members"
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        placeholder="Tags (comma-separated)"
                        label="Tags"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.split(","))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Color */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ColorPicker
                        color={field.value}
                        setColor={(newColor) =>
                          form.setValue("color", newColor, {
                            shouldValidate: true,
                          })
                        }
                        options={["solid"]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Goal Hour */}
              <FormField
                control={form.control}
                name="goal_hr"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        type="number"
                        placeholder="Goal Hours"
                        label="Goal Hours"
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Visibility */}
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <input
                          id="visibility"
                          type="checkbox"
                          className="accent-primary w-4 h-4"
                          checked={field.value}
                          onChange={(e) => {
                            form.setValue("visibility", e.target.checked, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        <label htmlFor="visibility">Public Group</label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              {!visibility && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          placeholder="Password"
                          label="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Submit Button */}
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
