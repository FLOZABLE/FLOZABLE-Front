"use client";

import { putTheme } from "@/apis/themeApi";
import { getYouTubeId } from "@/lib/utils";
import {
  putThemeSchema,
  putThemeSchemaSchemaValues,
} from "@/schemas/themeSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import Editor from "../editor/Editor";
import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { useCreateThemeModal } from "../structure/ModalProviders";
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

export default function CreateThemeModal() {
  const { createThemeModal, setCreateThemeModal } = useCreateThemeModal();

  const form = useForm<putThemeSchemaSchemaValues>({
    resolver: zodResolver(putThemeSchema),
    defaultValues: {
      name: "",
      description: "",
      youtube_video_id: "",
      tags: [],
    },
  });

  const onSubmit = useCallback(async (data: putThemeSchemaSchemaValues) => {
    const { name, description, tags, youtube_video_id } = data;

    const video_id = getYouTubeId(youtube_video_id);

    if (!video_id) return;

    const response = await putTheme({
      name,
      description,
      tags,
      video_id,
    });
    console.log(response);

    if (response.success) {
      form.reset();
      setCreateThemeModal((prev) => ({ ...prev, opened: false }));
    }
  }, []);

  return (
    <Credenza
      open={createThemeModal.opened}
      onOpenChange={(opened) => {
        setCreateThemeModal((prev) => ({ ...prev, opened }));
        form.reset();
      }}>
      <CredenzaContent desktopClassName="!max-w-100">
        <CredenzaHeader className="justify-self-center justify-center items-center text-center">
          <CredenzaTitle className="text-2xl">Add Theme</CredenzaTitle>
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

                <FormField
                  control={form.control}
                  name="youtube_video_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          placeholder=""
                          label="Youtube link"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <Button type="submit">Search</Button>
              </form>
            </Form>
            <div className="max-h-40 overflow-auto"></div>
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
