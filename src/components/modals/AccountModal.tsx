"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccountModal } from "../structure/ModalProviders";
import {
  Credenza,
  CredenzaBody,
  CredenzaHeader,
  CredenzaContent,
  CredenzaTitle,
  CredenzaDescription,
} from "../ui/credenza";
import { postAuthSignin, postAuthSignup } from "@/apis/authApi";
import { useAccount } from "@/hooks/accountHooks";
import { getTimezone } from "@/utils/tools";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import BlobBtn from "../buttons/BlobBtn/BlobBtn";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import GoogleLoginBtn from "../buttons/GoogleLoginBtn";

export const strictString = (type: string, maxLength = 20, minLength = 1) =>
  z
    .string()
    .min(minLength, { message: `${type} is too short` })
    .max(maxLength, { message: `${type} is too long` })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: `Invalid ${type} (Only A-Z, a-z, and 0-9 allowed)`,
    });

export const passwordSchema = z
  .string()
  .min(5, { message: "Password is too short (5 characters minimum)" })
  .max(30, { message: "Password is too long (30 characters maximum)" })
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
    message: "You need at least one special character",
  });

// Zod Schemas using the validations
export const signInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: passwordSchema,
});

export const signUpFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: passwordSchema,
  name: strictString("Name", 25, 1),
});

export default function AccountModal() {
  const { isAccountModal, setIsAccountModal } = useAccountModal();
  const { accountRefetch } = useAccount();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isSignIn, setIsSignIn] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSignIn = useCallback(
    async (values: z.infer<typeof signInFormSchema>) => {
      console.log("submit");
      const response = await postAuthSignin({
        email: values.email,
        password: values.password,
      });

      console.log("resp", response);

      if (!response.success) return;
      setIsAccountModal(false);
      accountRefetch();
    },
    [accountRefetch, setIsAccountModal, searchParams, router]
  );

  const onSignUp = useCallback(
    async (values: z.infer<typeof signUpFormSchema>) => {
      const timezone = getTimezone();
      const response = await postAuthSignup({
        ...values,
        timezone,
      });

      if (!response.success) return;
      accountRefetch();
      setIsSignIn(true);

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("welcome", "true");
      router.replace(`/dashboard?${newSearchParams.toString()}`, {
        scroll: false,
      });
    },
    [accountRefetch, setIsAccountModal, searchParams, router]
  );

  return (
    <Credenza open={isAccountModal} onOpenChange={setIsAccountModal}>
      <CredenzaContent desktopClassName="!max-w-100">
        <CredenzaHeader className="justify-self-center justify-center items-center text-center">
          <Image src={"/logo.png"} width={100} height={100} alt="logo" />
          <CredenzaTitle className="text-2xl">
            {isSignIn ? "Sign In" : "Sign Up"}
          </CredenzaTitle>
          <CredenzaDescription>Welcome Back</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          {isSignIn ? (
            <>
              <Form {...signInForm}>
                <form
                  onSubmit={signInForm.handleSubmit(onSignIn)}
                  className="space-y-6"
                >
                  <FormField
                    control={signInForm.control}
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
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            type={isShowPassword ? "text" : "password"}
                            placeholder="Password"
                            label="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    effect={"expandIcon"}
                    icon={ArrowRightIcon}
                    iconPlacement="right"
                    onClick={() => {}}
                    className="w-full"
                  >
                    Login
                  </Button>
                  <GoogleLoginBtn
                    scope={"email profile"}
                    required={"email"}
                    className="w-full"
                  />
                </form>
              </Form>
            </>
          ) : (
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(onSignUp)}
                className="space-y-6"
              >
                <FormField
                  control={signUpForm.control}
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
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingLabelInput
                          type={isShowPassword ? "text" : "password"}
                          placeholder="Password"
                          label="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
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
                <Button
                  type="submit"
                  effect={"expandIcon"}
                  icon={ArrowRightIcon}
                  iconPlacement="right"
                  onClick={() => {}}
                  className="w-full"
                >
                  Sign up
                </Button>
                <GoogleLoginBtn
                  scope={"email profile"}
                  required={"email"}
                  className="w-full"
                />
              </form>
            </Form>
          )}
          {isSignIn ? (
            <div className="flex justify-center items-center mt-3">
              <p>{"Don't have an account?"}</p>
              <Button
                type="submit"
                effect={"hoverUnderline"}
                variant={"link"}
                onClick={() => {
                  setIsSignIn(false);
                }}
              >
                Sign up
              </Button>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-3">
              <p>Already have an account?</p>
              <Button
                effect={"hoverUnderline"}
                variant={"link"}
                onClick={() => {
                  setIsSignIn(true);
                }}
              >
                Sign in
              </Button>
            </div>
          )}
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
