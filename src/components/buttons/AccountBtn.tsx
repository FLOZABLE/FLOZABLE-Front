import { useAccountModal } from "../structure/ModalProviders";
import { useAccount } from "@/hooks/accountHooks";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { getAuthLogout } from "@/apis/authApi";

export default function AccountBtn() {
  const { setAccountModal } = useAccountModal();
  const { account, clearAccountData } = useAccount();

  return (
    <>
      {account ? (
        <Button
          effect={"expandIcon"}
          icon={ArrowRightIcon}
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
        >
          Logout
        </Button>
      ) : (
        <div className="flex gap-3">
          <Button
            effect={"expandIcon"}
            icon={ArrowRightIcon}
            iconPlacement="right"
            onClick={() => {
              setAccountModal((prev) => ({
                ...prev,
                opened: true,
                isSignIn: true,
              }));
            }}
          >
            Sign in
          </Button>
          <Button
            effect={"expandIcon"}
            icon={ArrowRightIcon}
            variant={"outline"}
            iconPlacement="right"
            onClick={() => {
              setAccountModal((prev) => ({
                ...prev,
                opened: true,
                isSignIn: false,
              }));
            }}
          >
            Start for free
          </Button>
        </div>
      )}
    </>
  );
}
