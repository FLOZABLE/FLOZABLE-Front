import { GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

export default function StudyButton() {
  const router = useRouter();

  return (
    <Button
      effect={"expandIcon"}
      icon={GraduationCap}
      iconPlacement="right"
      onClick={() => {
        router.push("/dashboard/study");
      }}>
      Go Study!
    </Button>
  );
}
