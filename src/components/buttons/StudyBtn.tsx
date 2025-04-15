import { GraduationCap } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function StudyBtn() {
  const router = useRouter();

  return (
    <Button
      effect={"expandIcon"}
      icon={GraduationCap}
      iconPlacement="right"
      onClick={() => {
        router.push("/dashboard/study");
      }}
    >
      Go Study!
    </Button>
  );
}
