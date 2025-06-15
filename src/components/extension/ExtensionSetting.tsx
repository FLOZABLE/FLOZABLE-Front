import {
  deleteExtensionSetting,
  patchExtensionSetting,
  putExtensionSetting,
} from "@/apis/extensionApi";
import { useExtensionSettings } from "@/hooks/extensionHooks";
import { useExtensionSettingsUpdater } from "@/hooks/updaters/extensionUpdaters";
import { validateURL } from "@/lib/validate";
import { WebsiteSettingMode } from "@/types/websiteTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Trash } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { AlertDialogWrapper } from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";

const extensionSettingFormSchema = z.object({
  url: z
    .string()
    .min(1, "Please provide URL")
    .refine(
      (value) => validateURL(value).isValid,
      (value) => ({ message: validateURL(value).reason || "Invalid URL" }),
    ),
});

type ExtensionSettingFormType = z.infer<typeof extensionSettingFormSchema>;

export default function ExtensionSetting() {
  const { extensionSettings } = useExtensionSettings();

  const extensionSettingsUpdater = useExtensionSettingsUpdater();

  const [confirmDeleteModal, setConfirmDeleteModal] = useState<{
    open: boolean;
    website: string | null;
  }>({
    open: false,
    website: null,
  });

  const extensionSettingForm = useForm<ExtensionSettingFormType>({
    resolver: zodResolver(extensionSettingFormSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof extensionSettingFormSchema>) => {
      const response = await putExtensionSetting(values.url);
      if (!response.success || !response.data?.setting) return;

      extensionSettingsUpdater((prev) => {
        const newSettings = [...prev, response.data!.setting];
        return newSettings;
      });
      extensionSettingForm.reset();
    },
    [],
  );

  const settingUpdate = useCallback(
    async (website: string, mode: WebsiteSettingMode, value: boolean) => {
      const response = await patchExtensionSetting({ website, mode, value });
      if (!response.success) return;

      extensionSettingsUpdater((prev) => {
        const settingIndex = prev.findIndex(
          (setting) => setting.website === website,
        );
        if (settingIndex === -1) return prev;
        const newSettings = [...prev];
        newSettings[settingIndex][mode] = value;
        return newSettings;
      });
    },
    [],
  );

  const settingDelete = useCallback(async () => {
    if (!confirmDeleteModal.website) return;
    const response = await deleteExtensionSetting(confirmDeleteModal.website);
    if (!response.success) return;

    extensionSettingsUpdater((prev) => {
      const newSettings = [...prev].filter(
        (setting) => setting.website !== confirmDeleteModal.website,
      );
      return newSettings;
    });
  }, [confirmDeleteModal]);

  return (
    <Card>
      <AlertDialogWrapper
        open={confirmDeleteModal.open}
        onOpenChange={(open) => {
          setConfirmDeleteModal((prev) => ({ ...prev, open }));
        }}
        onContinue={settingDelete}
        description={
          "This action cannot be undone. This will permanently remove your control settings for chess.com and stop blocking or tracking it."
        }
      />
      <CardHeader>
        <CardTitle>Chrome Extension</CardTitle>
        <CardDescription>
          Set up and manage your chrome extension
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...extensionSettingForm}>
          <form
            onSubmit={extensionSettingForm.handleSubmit(onSubmit)}
            className="space-y-4">
            <FormField
              control={extensionSettingForm.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      placeholder="Enter site URL"
                      label="Enter site URL"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
        <div className="flex content-around">
          <p className="flex-1/5 text-center">Websites</p>
          <div className="flex-1/5 text-center">
            <Badge>Block</Badge>
          </div>
          <div className="flex-1/5 text-center">
            <Badge>Block when studying</Badge>
          </div>
          <div className="flex-1/5 text-center">
            <Badge>Timer</Badge>
          </div>
          <div className="flex-1/5 text-center">
            <Badge>Timer when studying</Badge>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col gap-1">
          <AnimatePresence>
            {extensionSettings?.map((setting) => (
              <motion.div
                key={setting.website}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex">
                <div className="flex-1/5 flex items-center justify-between">
                  <p className="truncate">{setting.website}</p>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      setConfirmDeleteModal((prev) => ({
                        ...prev,
                        open: true,
                        website: setting.website,
                      }));
                    }}>
                    <Trash />
                  </Button>
                </div>
                <div className="flex-1/5 text-center">
                  <Switch
                    checked={setting.block}
                    onCheckedChange={(checked) => {
                      settingUpdate(setting.website, "block", checked);
                    }}
                  />
                </div>
                <div className="flex-1/5 text-center">
                  <Switch
                    checked={setting.study_block}
                    onCheckedChange={(checked) => {
                      settingUpdate(setting.website, "study_block", checked);
                    }}
                  />
                </div>
                <div className="flex-1/5 text-center">
                  <Switch
                    checked={setting.timer}
                    onCheckedChange={(checked) => {
                      settingUpdate(setting.website, "timer", checked);
                    }}
                  />
                </div>
                <div className="flex-1/5 text-center">
                  <Switch
                    checked={setting.study_timer}
                    onCheckedChange={(checked) => {
                      settingUpdate(setting.website, "study_timer", checked);
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
