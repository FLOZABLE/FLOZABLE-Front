"use client";

import styles from "./GoogleLoginBtn.module.css";
import React from "react";
import CircularLoading from "@/components/loadings/CircularLoading/CircularLoading";
import { getTimezone } from "@/utils/tools";
import config from "@/utils/config";
import { useAccountGoogle } from "@/hooks/accountHooks";
import { useGoogleLogin } from "@react-oauth/google";
import { IconGoogle } from "@/components/others/Svgs";

const redirect_uri = config.server + "/auth/signin/google";

function GoogleLoginBtn({ scope, required }) {
  const { accountGoogleData, accountGoogleIsLoading } = useAccountGoogle();

  const timezone = getTimezone();

  const login = useGoogleLogin({
    flow: "auth-code",
    select_account: true,
    redirect_uri,
    ux_mode: "redirect",
    scope,
    state: JSON.stringify({ timezone }),
  });

  return (
    <div className={styles.GoogleLoginBtn} onClick={login}>
      {accountGoogleIsLoading ? (
        <CircularLoading />
      ) : !accountGoogleData ||
        !accountGoogleData?.scopes?.some((scope) =>
          scope.includes(required)
        ) ? (
        <p>Login with Google</p>
      ) : (
        <p>Logged in as {accountGoogleData.name}</p>
      )}
      <IconGoogle />
    </div>
  );
}

export default GoogleLoginBtn;
