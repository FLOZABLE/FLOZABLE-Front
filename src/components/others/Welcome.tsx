import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAccount } from "@/hooks/accountHooks";
import StudyBtn from "../buttons/StudyBtn";

export default function Welcome() {
  const { account } = useAccount();
  
  return (
    <Card className="flex-1/2">
      <CardHeader>
        <CardTitle className="text-3xl">Hi, {account?.name} 👋</CardTitle>
        <CardDescription className="relative">
          What do you want to learn today!
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <StudyBtn />
      </CardFooter>
    </Card>
  );
}
