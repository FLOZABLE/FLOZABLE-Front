"use client";

import { patchAccountInfo, patchAccountPassword } from "@/apis/accountApi";
import GoogleLoginBtn from "@/components/buttons/GoogleLoginBtn";
import ExtensionSetting from "@/components/extension/ExtensionSetting";
import { FloatingLabelInput } from "@/components/inputs/FloatingLabelInput";
import { passwordSchema, strictString } from "@/components/modals/AccountModal";
import { IconGoogleCalendar, IconYoutube } from "@/components/others/Svgs";
import AvatarWrapper from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useAccount, useAccountGoogle } from "@/hooks/accountHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, UserRoundPen } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod Schemas using the validations
const profileFormSchema = z
  .object({
    name: strictString("Name", 25, 1),
    email: z.string().email({ message: "Invalid email address." }),
    confirmEmail: z.string(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Email addresses do not match.",
  });

const passwordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export default function Account() {
  const { account } = useAccount();
  const { accountGoogleData } = useAccountGoogle();

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
      name: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onProfileUpdate = useCallback(
    async (values: z.infer<typeof profileFormSchema>) => {
      const response = await patchAccountInfo({
        ...values,
      });

      if (!response.success) return;
    },
    []
  );

  const onPasswordUpdate = useCallback(
    async (values: z.infer<typeof passwordFormSchema>) => {
      const response = await patchAccountPassword({
        ...values,
      });

      if (!response.success) return;
    },
    []
  );

  if (!account) return <div></div>;

  return (
    <main className="p-5">
      <div className="flex justify-between w-full items-center mb-5">
        <h1 className="text-2xl font-semibold">Account</h1>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center">
          <AvatarWrapper
            userId={account.user_id}
            name={account.name}
            className="size-50"
          />
          <p className="text-2xl font-semibold">Welcome, {account.name}</p>
        </div>
        <div className="flex gap-5">
          <Card className="flex-1/2">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileUpdate)}
                  className="space-y-6 flex flex-col h-full"
                >
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            placeholder="Name"
                            {...field}
                            label="name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            placeholder="Email"
                            {...field}
                            label="Email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="confirmEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            placeholder="Confirm Email"
                            {...field}
                            label="Confirm Email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    effect={"expandIcon"}
                    icon={UserRoundPen}
                    iconPlacement="right"
                    className="w-fit"
                  >
                    Update profile
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className="flex-1/2">
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordUpdate)}
                  className="space-y-6 flex flex-col h-full"
                >
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            placeholder="Password"
                            type="password"
                            {...field}
                            label="Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            placeholder="Confirm Password"
                            type="password"
                            {...field}
                            label="Confirm Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    effect={"expandIcon"}
                    icon={Lock}
                    iconPlacement="right"
                    className="mt-auto w-fit"
                  >
                    Update Password
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <ExtensionSetting />
        <Card>
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
            <CardDescription>Manage your integration settings</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div>
                <IconGoogleCalendar className="size-13" />
              </div>
              {!accountGoogleData?.scopes?.some((scope) =>
                scope.includes("calendar")
              ) ? (
                <p>
                  You haven&apos;t connected your Google Calendar yet or you
                  aren&apos;t authorized. Please authorize our application to
                  access your Google Calendar by signing in with your Google
                  account here.
                </p>
              ) : (
                <p>
                  {`You've successfully connected your Google Calendar! Our app now has access to your calendar events, allowing you to seamlessly integrate your schedule with our platform.`}
                </p>
              )}
              <GoogleLoginBtn
                scope={"email profile https://www.googleapis.com/auth/calendar"}
                required="calendar"
                className="ml-auto"
              />
            </div>
            <div className="flex gap-5">
              <div>
                <IconYoutube className="size-13" />
              </div>
              {!accountGoogleData?.scopes?.some((scope) =>
                scope.includes("youtube")
              ) ? (
                <p>
                  You haven&apos;t connected your YouTube Account yet or you
                  aren&apos;t authorized. Please authorize our application to
                  access your YouTube Playlists here.
                </p>
              ) : (
                <p>
                  {`Your YouTube account is now connected! You can now access your playlists directly within our app to enhance your experience with personalized content.`}
                </p>
              )}
              <GoogleLoginBtn
                scope="https://www.googleapis.com/auth/youtube.readonly"
                required="youtube"
                className="ml-auto"
              />
            </div>
            {/* <div className="flex gap-5">
              <div>
                <IconSpotify className="size-13" />
              </div>
              {!spotifyInfo ? (
                <p>
                  You haven&apos;t connected your Spotify Account yet or you
                  aren&apos;t authorized. Please authorize our application to
                  access your Spotify Playlists here.
                </p>
              ) : (
                <p>
                  Spotify is successfully connected! Enjoy your playlists within
                  our app and set the perfect mood for your tasks.
                </p>
              )}
              <GoogleLoginBtn
                scope={"email profile https://www.googleapis.com/auth/calendar"}
                required="calendar"
              />
            </div> */}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
