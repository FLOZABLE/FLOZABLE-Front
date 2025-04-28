import { UserRoundPlus, UserRoundX } from "lucide-react";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { deleteFriend, postFriendsRequest } from "@/apis/friendsApi";
import { Userinfo } from "@/types/account";
import {
  useFriends,
  useFriendsStatus,
  useFriendsTrends,
} from "@/hooks/friendsHooks";
import { useFriendsUpdater } from "@/hooks/updaters/friendsUpdaters";

interface FriendRequestButtonProps {
  userInfo: Userinfo;
}

export default function FriendRequestButton({
  userInfo,
}: FriendRequestButtonProps) {
  const { friendsData } = useFriends();
  const { friendsStatusRefetch } = useFriendsStatus();
  const { friendsTrendRefetch } = useFriendsTrends();

  const updateFriends = useFriendsUpdater();

  const requestFriend = useCallback(async () => {
    await postFriendsRequest(userInfo.user_id);
  }, [userInfo]);

  const unFriend = useCallback(async () => {
    const response = await deleteFriend(userInfo.user_id);

    if (!response.success) return;

    updateFriends((prev) =>
      prev.filter((friend) => friend.friend_id !== userInfo.user_id)
    );
    friendsStatusRefetch();
    friendsTrendRefetch();
  }, [userInfo]);

  const isFriend = friendsData?.find(
    (friend) => friend.user_id === userInfo.user_id
  );

  return (
    <Button
      onClick={() => {
        if (isFriend) {
          unFriend();
        } else {
          requestFriend();
        }
      }}
    >
      {isFriend ? <UserRoundX /> : <UserRoundPlus />}
    </Button>
  );
}
