"use client";

import { postAuthSignin, postAuthSignup } from "@/apis/authApi";
import { useAccount } from "@/hooks/accountHooks";
import { getTimezone } from "@/lib/utils";
import {
  postAuthSigninSchema,
  PostAuthSigninSchemaValues,
  postAuthSignupSchema,
  PostAuthSignupSchemaValues,
} from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import GoogleLoginButton from "../buttons/GoogleLoginButton";
import ShowPasswordBtn from "../buttons/ShowPasswordBtn";
import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { useAccountModal } from "../structure/ModalProviders";
import { Button } from "../ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
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

export default function AccountModal() {
  const { accountModal, setAccountModal } = useAccountModal();
  const { account, accountRefetch, status } = useAccount();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [alreadyViewed, setAlreadyViewed] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState(false);

  const signInForm = useForm<PostAuthSigninSchemaValues>({
    resolver: zodResolver(postAuthSigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<PostAuthSignupSchemaValues>({
    resolver: zodResolver(postAuthSignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSignIn = useCallback(
    async (values: PostAuthSigninSchemaValues) => {
      const response = await postAuthSignin({
        email: values.email,
        password: values.password,
      });

      if (!response.success) return;
      setAccountModal((prev) => ({ ...prev, opened: false }));
      accountRefetch();
    },
    [accountRefetch, setAccountModal, searchParams, router],
  );

  const onSignUp = useCallback(
    async (values: PostAuthSignupSchemaValues) => {
      const timezone = getTimezone();
      const response = await postAuthSignup({
        ...values,
        timezone,
      });

      if (!response.success) return;
      accountRefetch();
      setAccountModal((prev) => ({
        ...prev,
        isSignIn: true,
      }));

      router.push("/dashboard?welcome=true");
    },
    [accountRefetch, setAccountModal, searchParams, router],
  );

  useEffect(() => {
    setTimeout(() => {
      if (
        pathname.includes("dashboard") &&
        !alreadyViewed &&
        !account &&
        status !== "pending"
      ) {
        setAccountModal((prev) => ({
          ...prev,
          opened: true,
          isSignIn: true,
        }));
        setAlreadyViewed(true);
      } else {
        setAccountModal((prev) => ({ ...prev, opened: false }));
      }
    }, 100);
  }, [account, status]);

  return (
    <Credenza
      open={accountModal.opened}
      onOpenChange={(opened) => {
        setAccountModal((prev) => ({ ...prev, opened }));
      }}>
      <CredenzaContent desktopClassName="!max-w-100">
        <CredenzaHeader className="justify-self-center justify-center items-center text-center">
          <Image src={"/logo.png"} width={100} height={100} alt="logo" />
          <CredenzaTitle className="text-2xl">
            {accountModal.isSignIn ? "Sign In" : "Sign Up"}
          </CredenzaTitle>
          <CredenzaDescription>
            {accountModal.isSignIn ? "Welcome Back" : "Create a new account"}
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          {accountModal.isSignIn ? (
            <>
              <Form {...signInForm}>
                <form
                  onSubmit={signInForm.handleSubmit(onSignIn)}
                  className="space-y-6">
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
                      <FormItem className="relative">
                        <FormControl>
                          <FloatingLabelInput
                            type={isShowPassword ? "text" : "password"}
                            placeholder="Password"
                            label="Password"
                            {...field}
                          />
                        </FormControl>
                        <ShowPasswordBtn
                          isShowPassword={isShowPassword}
                          setIsShowPassword={setIsShowPassword}
                          className="absolute right-0"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    effect={"expandIcon"}
                    icon={ArrowRightIcon}
                    iconPlacement="right"
                    className="w-full">
                    Login
                  </Button>
                  <GoogleLoginButton
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
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form submitted");
                  signUpForm.handleSubmit(onSignUp)(e);
                }}
                className="space-y-6">
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
                    <FormItem className="relative">
                      <FormControl>
                        <FloatingLabelInput
                          type={isShowPassword ? "text" : "password"}
                          placeholder="Password"
                          label="Password"
                          {...field}
                        />
                      </FormControl>
                      <ShowPasswordBtn
                        isShowPassword={isShowPassword}
                        setIsShowPassword={setIsShowPassword}
                        className="absolute right-0"
                      />
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
                  className="w-full">
                  Sign up
                </Button>
                <GoogleLoginButton
                  scope={"email profile"}
                  required={"email"}
                  className="w-full"
                />
              </form>
            </Form>
          )}
          {accountModal.isSignIn ? (
            <div className="flex justify-center items-center mt-3">
              <p>{"Don't have an account?"}</p>
              <Button
                type="submit"
                effect={"hoverUnderline"}
                variant={"link"}
                onClick={() => {
                  setAccountModal((prev) => ({
                    ...prev,
                    isSignIn: false,
                  }));
                }}>
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
                  setAccountModal((prev) => ({
                    ...prev,
                    isSignIn: true,
                  }));
                }}>
                Sign in
              </Button>
            </div>
          )}
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
