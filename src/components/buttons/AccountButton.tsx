import { useAccountModal } from "../structure/ModalProviders";
import { useAccount } from "@/hooks/accountHooks";
import { LogIn, LogOut } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { getAuthLogout } from "@/apis/authApi";

export default function AccountButton({ ...props }: ButtonProps) {
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
            const response = await getAuthLogout();
            if (response.success) {
              clearAccountData();
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }
          }}
          {...props}
        >
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
            {...props}
          >
            Sign in
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              setAccountModal((prev) => ({
                ...prev,
                opened: true,
                isSignIn: false,
              }));
            }}
            {...props}
          >
            Start for free
          </Button>
        </div>
      )}
    </>
  );
}
