import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAccount } from "@/hooks/accountHooks";
import StudyBtn from "../buttons/StudyBtn";
import Image from "next/image";
import { ComponentProps } from "react";

export default function Welcome({ ...props }: ComponentProps<"div">) {
  const { account } = useAccount();

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-3xl">Hi, {account?.name} 👋</CardTitle>
        <CardDescription className="flex">
          <p>What do you want to learn today?</p>
          <Image
            alt="cover image"
            width={40}
            height={40}
            className="w-48 ml-auto h-auto object-cover"
            src={"/img/icons/study.svg"}
          />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <StudyBtn />
      </CardFooter>
    </Card>
  );
}
