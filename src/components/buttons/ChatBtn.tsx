import { MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function ChatBtn({ className }: React.ComponentProps<"div">) {
  return (
    <Button effect={"shineHover"} onClick={() => {}} className={className}>
      <MessageCircle />
    </Button>
  );
}
