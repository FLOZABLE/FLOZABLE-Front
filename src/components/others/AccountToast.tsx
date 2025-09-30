import emitter from "@/lib/emitter";
import { toast } from "sonner";

export default function AccountToast() {
  return <div>Login to use this feature</div>;
}

export function showAccountToast() {
  toast.info(<AccountToast />, {
    action: {
      label: "Login",
      onClick: () => {
        emitter.emit("openAccountModal");
      },
    },
  });
}
