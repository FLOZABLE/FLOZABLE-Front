import { UserRoundPlus, UserRoundX } from "lucide-react";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { Userinfo } from "@/types/accountTypes";
import {
  useFriends,
  useFriendsStatus,
  useFriendsTrends,
} from "@/hooks/friendHooks";
import { useFriendsUpdater } from "@/hooks/updaters/friendUpdaters";
import { deleteFriend, sendFriendRequest } from "@/apis/friendApi";

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
    await sendFriendRequest(userInfo.user_id);
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
