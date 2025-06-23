import { GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button, ButtonProps } from "../ui/button";

export default function StudyButton({ ...props }: ButtonProps) {
  const router = useRouter();

  return (
    <Button
      effect={"expandIcon"}
      icon={GraduationCap}
      iconPlacement="right"
      onClick={() => {
        router.push("/dashboard/study");
      }}
      {...props}>
      Go Study!
    </Button>
  );
}
