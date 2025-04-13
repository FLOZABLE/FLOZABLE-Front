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

export default function FriendsViewer({}) {
  const { friendsStatus } = useFriendsStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Friends</CardTitle>
        <CardDescription>See what your friends are doing</CardDescription>
      </CardHeader>
      <CardContent>
        {friendsStatus?.map((friend, i) => {
          return (
            <div key={i}>
              <UserContainer userinfo={friend} />
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
