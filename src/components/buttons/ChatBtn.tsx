import { MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function ChatBtn() {
  return (
    <div>
      <Button effect={"shineHover"} onClick={() => {}}>
        <MessageCircle />
      </Button>
    </div>
  );
}
