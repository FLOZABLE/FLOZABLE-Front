import { postAuthLogout } from "@/apis/authApi";
import { useAccount } from "@/hooks/accountHooks";
import { LogIn, LogOut } from "lucide-react";

import { useAccountModal } from "../structure/ModalProviders";
import { Button, ButtonProps } from "../ui/button";

interface AccountButtonProps extends ButtonProps {
  isSignupButton?: boolean;
}

export default function AccountButton({
  isSignupButton = true,
  ...props
}: AccountButtonProps) {
  const { setAccountModal } = useAccountModal();
  const { account, clearAccountData } = useAccount();

  return (
    <>
      {account ? (
        <Button
          effect={"expandIcon"}
          icon={LogOut}
          iconPlacement="right"
          onClick={async () => {
            const response = await postAuthLogout();
            if (response.success) {
              clearAccountData();
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }
          }}
          {...props}>
          Logout
        </Button>
      ) : (
        <div className="flex gap-3">
          <Button
            effect={"expandIcon"}
            icon={LogIn}
            iconPlacement="right"
            onClick={() => {
              setAccountModal((prev) => ({
                ...prev,
                opened: true,
                isSignIn: true,
              }));
            }}
            {...props}>
            Sign in
          </Button>
          {isSignupButton && (
            <Button
              variant={"outline"}
              onClick={() => {
                setAccountModal((prev) => ({
                  ...prev,
                  opened: true,
                  isSignIn: false,
                }));
              }}
              {...props}>
              Start for free
            </Button>
          )}
        </div>
      )}
    </>
  );
}
