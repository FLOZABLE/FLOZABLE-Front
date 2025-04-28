import { MessageCircle } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { Userinfo } from "@/types/account";

interface ChatButtonProps extends ButtonProps {
  userInfo?: Userinfo;
}

export default function ChatButton({ ...props }: ChatButtonProps) {
  return (
    <Button effect={"shineHover"} onClick={() => {

    }} {...props}>
      <MessageCircle />
    </Button>
  );
}
