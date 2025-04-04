import { useAccountModal } from "../structure/ModalProviders";
import { useAccount } from "@/hooks/accountHooks";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function AccountBtn() {
  const { setAccountModal } = useAccountModal();
  const { accountData, clearAccountData } = useAccount();

  return (
    <>
      {accountData ? (
        <Button
          effect={"expandIcon"}
          icon={ArrowRightIcon}
          iconPlacement="right"
          onClick={() => {
            clearAccountData();
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
