import { useFriendsStatus } from "@/hooks/friendsHooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import UserContainer from "../users/UserContainer";
import UserSubjectViewer from "../users/UserSubjectViewer";
import ChatBtn from "../buttons/ChatBtn";

export default function FriendsViewer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { friendsStatus } = useFriendsStatus();

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Friends</CardTitle>
        <CardDescription>See what your friends are doing</CardDescription>
      </CardHeader>
      <CardContent>
        {friendsStatus?.map((friend, i) => {
          return (
            <div key={i}>
              <UserContainer userinfo={friend} >
                <ChatBtn className="ml-10"/>
              </UserContainer>
              <UserSubjectViewer userInfo={friend} />
            </div>
          );
        })}
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
