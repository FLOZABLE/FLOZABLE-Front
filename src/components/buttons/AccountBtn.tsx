import { useAccountModal } from "../structure/ModalProviders";
import { useAccount } from "@/hooks/accountHooks";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function AccountBtn() {
  const { isAccountModal, setIsAccountModal } = useAccountModal();
  const { accountData, clearAccountData } = useAccount();

  console.log("account", isAccountModal);

  return (
    <>
      {!accountData ? (
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
              setIsAccountModal(true);
            }}
          >
            Sign in
          </Button>
          <Button
            effect={"expandIcon"}
            icon={ArrowRightIcon}
            iconPlacement="right"
            onClick={() => {
              setIsAccountModal(true);
            }}
          >
            Start for free
          </Button>
        </div>
      )}
    </>
  );
}
