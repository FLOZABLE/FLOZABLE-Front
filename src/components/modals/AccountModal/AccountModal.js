"use client";

import styles from "./AccountModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";
import { postAuthSignin, postAuthSignup } from "@/apis/authApi";
import { useAccount } from "@/hooks/accountHooks";
import GoogleLoginBtn from "@/components/buttons/GoogleLoginBtn/GoogleLoginBtn";
import ShowPasswordBtn from "@/components/buttons/ShowPasswordBtn/ShowPasswordBtn";
import LineInput from "@/components/inputs/LineInput/LineInput";
import { getTimezone } from "@/utils/tools";
import { useAccountModal } from "@/components/structure/ModalProviders";

export default function AccountModal() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { accountRefetch } = useAccount();

  const { isAccountModal, setIsAccountModal } = useAccountModal();

  const [isSignIn, setIsSignIn] = useState(true);

  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    name: "",
    timezone: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const submitSignIn = useCallback(async () => {
    const response = await postAuthSignin(signIn);
    if (!response.success) return;

    setIsAccountModal(false);
    accountRefetch();
  }, [signIn]);

  const submitSignUp = useCallback(async () => {
    const response = await postAuthSignup(signUp);
    if (!response.success) return;

    accountRefetch();
    setIsSignIn(false);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("welcome", "true");
    router.replace(`/dashboard?${newSearchParams.toString()}`, {
      scroll: false,
    });
  }, [signUp]);

  useEffect(() => {
    try {
      const timezone = getTimezone();
      setSignUp((prev) => ({ ...prev, timezone }));
    } catch (error) {
      console.error("Intl.DateTimeFormat not supported:", error);
      return "UTC";
    }
  }, []);

  if (isSignIn) {
    return (
      <>
        <div
          className={`${styles.touchBlocker} ${
            isAccountModal ? styles.opened : ""
          }`}
        ></div>
        <div
          className={`${styles.AccountModal} ${
            isAccountModal ? styles.opened : ""
          }`}
        >
          <div className={styles.header}>
            <h3>Login</h3>
            <i
              className={styles.closeBtn}
              onClick={() => {
                setIsAccountModal(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </i>
          </div>
          <div className={styles.input}>
            <LineInput
              label={"Email"}
              type={"email"}
              value={signIn.email}
              setValue={(email) => setSignIn((prev) => ({ ...prev, email }))}
              icon={<FontAwesomeIcon icon={faEnvelope} />}
              autoComplete="email"
            />
          </div>
          <div className={styles.input}>
            <LineInput
              type={isShowPassword ? "text" : "password"}
              label={"Password"}
              value={signIn.password}
              setValue={(password) =>
                setSignIn((prev) => ({ ...prev, password }))
              }
              icon={<FontAwesomeIcon icon={faLock} />}
              autoComplete="password"
            />
            <div className={styles.showPasswordBtn}>
              <ShowPasswordBtn
                isShowPassword={isShowPassword}
                setIsShowPassword={setIsShowPassword}
              />
            </div>
          </div>
          <div className={styles.buttons}>
            <BlobBtn onClick={submitSignIn}>Login</BlobBtn>
          </div>

          <div className={styles.options}>
            <GoogleLoginBtn scope={"email profile"} required={"email"} />
            <p
              className={styles.noAccount}
              onClick={() => {
                setIsSignIn(false);
              }}
            >
              {"Don't have an account?"}
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={`${styles.touchBlocker} ${
            isAccountModal ? styles.opened : ""
          }`}
        ></div>
        <div
          className={`${styles.AccountModal} ${
            isAccountModal ? styles.opened : ""
          }`}
        >
          <div className={styles.header}>
            <h3>Sign Up</h3>
            <i
              className={styles.closeBtn}
              onClick={() => {
                setIsAccountModal(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </i>
          </div>
          <form action="" id="sdfsd">
            <div className={styles.input}>
              <LineInput
                label={"Name"}
                type={"name"}
                value={signUp.name}
                setValue={(name) => setSignUp((prev) => ({ ...prev, name }))}
                icon={<FontAwesomeIcon icon={faUser} />}
                autoComplete="off"
              />
            </div>
            <div className={styles.input}>
              <LineInput
                label={"Email"}
                type={"email"}
                value={signUp.email}
                setValue={(email) => setSignUp((prev) => ({ ...prev, email }))}
                icon={<FontAwesomeIcon icon={faEnvelope} />}
                autoComplete="username"
              />
            </div>
            <div className={styles.input}>
              <LineInput
                type={isShowPassword ? "text" : "password"}
                label={"Password"}
                value={signUp.password}
                setValue={(password) =>
                  setSignUp((prev) => ({ ...prev, password }))
                }
                icon={<FontAwesomeIcon icon={faLock} />}
                autoComplete="new-password"
              />
              <div className={styles.showPasswordBtn}>
                <ShowPasswordBtn
                  isShowPassword={isShowPassword}
                  setIsShowPassword={setIsShowPassword}
                />
              </div>
            </div>
            <div className={styles.buttons}>
              <BlobBtn onClick={submitSignUp}>Sign Up</BlobBtn>
            </div>
          </form>
          <div className={styles.options}>
            <GoogleLoginBtn scope={"email profile"} required={"email"} />
            <p
              className={styles.noAccount}
              onClick={() => {
                setIsSignIn(true);
              }}
            >
              {"Already have an account?"}
            </p>
          </div>
        </div>
      </>
    );
  }
}
