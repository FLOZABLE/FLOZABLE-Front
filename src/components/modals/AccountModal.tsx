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
import { getTimezone } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import GoogleLoginBtn from "../buttons/GoogleLoginBtn";
import ShowPasswordBtn from "../buttons/ShowPasswordBtn";

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
  .min(8, { message: "Password is too short (8 characters minimum)" })
  .max(20, { message: "Password is too long (20 characters maximum)" })
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
  const { accountModal, setAccountModal } = useAccountModal();
  const { account, accountRefetch, status } = useAccount();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [alreadyViewed, setAlreadyViewed] = useState(false);

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
      const response = await postAuthSignin({
        email: values.email,
        password: values.password,
      });

      if (!response.success) return;
      setAccountModal((prev) => ({ ...prev, opened: false }));
      accountRefetch();
    },
    [accountRefetch, setAccountModal, searchParams, router]
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
      setAccountModal((prev) => ({
        ...prev,
        isSignIn: true,
      }));

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("welcome", "true");
      router.replace(`/dashboard?${newSearchParams.toString()}`, {
        scroll: false,
      });
    },
    [accountRefetch, setAccountModal, searchParams, router]
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
      }}
    >
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
                  setAccountModal((prev) => ({
                    ...prev,
                    isSignIn: true,
                  }));
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
