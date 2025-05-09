"use client";

import { patchAccountInfo, patchAccountPassword } from "@/apis/accountApi";
import { FloatingLabelInput } from "@/components/inputs/FloatingLabelInput";
import { passwordSchema, strictString } from "@/components/modals/AccountModal";
import AvatarWrapper from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useAccount } from "@/hooks/accountHooks";
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
      <div>
        <div>
          <AvatarWrapper
            userId={account.user_id}
            name={account.name}
            className="size-50"
          />
          <p className="text-2xl">Welcome, {account.name}</p>
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
        {/* <Card>
          <CardHeader>
            <CardTitle>Subjects</CardTitle>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card> */}
      </div>
    </main>
  );
}
