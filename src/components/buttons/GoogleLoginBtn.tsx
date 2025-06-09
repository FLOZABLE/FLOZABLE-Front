import config from "@/lib/config";
import { getTimezone } from "@/lib/utils";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import { useAccountGoogle } from "@/hooks/accountHooks";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { IconGoogle } from "../others/Svgs";

const redirect_uri = config.server + "/auth/signin/google";

type GoogleLoginBtnProps = {
  scope: string;
  required: string;
  className?: string;
};

export default function GoogleLoginBtn({
  scope,
  required,
  className,
  ...props
}: GoogleLoginBtnProps) {
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
    <Button
      effect={"expandIcon"}
      variant={"secondary"}
      icon={ArrowRightIcon}
      iconPlacement="right"
      onClick={login}
      className={className}
      {...props}
    >
      {accountGoogleIsLoading ? (
        <Loader2 className="animate-spin" />
      ) : !accountGoogleData ||
        !accountGoogleData?.scopes?.some((scope: string) =>
          scope.includes(required)
        ) ? (
        <p>Login with Google</p>
      ) : (
        <p>Logged in as {accountGoogleData.name}</p>
      )}
      <IconGoogle className={"size-6 ml-2"}/>
    </Button>
  );
}
