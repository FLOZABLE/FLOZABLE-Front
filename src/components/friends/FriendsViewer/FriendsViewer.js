"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./FriendsViewer.module.css";
import RecommendedFriendsViewer from "../RecommendedFriendsViewer/RecommendedFriendsViewer";
import { useRouter } from "next/navigation";
import { useFriendsStatus, useFriendsTrends } from "@/hooks/friendsHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { postFriendsRequestReply } from "@/apis/friendsApi";
import { ReceivedFriendRequestContainer } from "../FriendRequestsViewer/FriendRequestsViewer";
import { SearchUsersModalContext } from "@/components/structure/ModalProviders";
import CircularLoading from "@/components/loadings/CircularLoading/CircularLoading";
import UserContainer from "@/components/Users/UserContainer/UserContainer";
import UserSubjectViewer from "@/components/users/UserSubjectViewer/UserSubjectViewer";
import UserGroupViewer from "@/components/users/UserGroupViewer/UserGroupViewer";
import ChatBtn from "@/components/buttons/ChatBtn/ChatBtn";
import { useNotifications } from "@/hooks/notificationsHooks";

function FriendsViewer() {
  const { setSearchUsersModal } = useContext(SearchUsersModalContext);

  const router = useRouter();

  const {
    friendsStatus,
    friendsStatusIsLoading,
    friendsStatusError,
    updateFriendsStatus,
    friendsStatusRefetch,
  } = useFriendsStatus();

  const { friendsTrendRefetch } = useFriendsTrends();
  const { notifications, filterNotification } = useNotifications();

  const [friendRequests, setFriendRequests] = useState([]);

  /* useEffect(() => {
    if (!notifications) return;
    const friendRequests = [];

    notifications.map((notification) => {
      if (notification.type === "friend_request") {
        friendRequests.push(notification);
      }
    });

    setFriendRequests(friendRequests);
  }, [notifications]);

  const friendRequestReply = useCallback(async (notificationId, accepted) => {
    const response = await postFriendsRequestReply({
      notificationId,
      accepted,
    });

    filterNotification(notificationId);

    if (!response.success) return;

    friendsStatusRefetch();
    friendsTrendRefetch();
  }, []);

  useEffect(() => {
    const onStudying = ({ userId, subject }) => {
      updateFriendsStatus((prev) => {
        const friendIndex = prev.findIndex(
          (friend) => friend.user_id === userId
        );
        if (friendIndex === -1) return prev;

        const newFriends = [...prev];
        newFriends[friendIndex] = {
          ...newFriends[friendIndex],
          activeSubject: subject,
        };

        return newFriends;
      });
    };

    const onStopStudying = ({ userId, subject, duration }) => {
      updateFriendsStatus((prev) => {
        const friendIndex = prev.findIndex(
          (friend) => friend.user_id === userId
        );
        if (friendIndex === -1) return prev;

        const newFriends = [...prev];
        const study_time = newFriends[friendIndex].study_time + duration;
        newFriends[friendIndex] = {
          ...newFriends[friendIndex],
          activeSubject: subject,
          study_time,
        };

        return newFriends;
      });
    };

    const onDeActiveGroup = ({ userId }) => {
      updateFriendsStatus((prev) => {
        const friendIndex = prev.findIndex(
          (friend) => friend.user_id === userId
        );
        if (friendIndex === -1) return prev;

        const newFriends = [...prev];
        newFriends[friendIndex] = {
          ...newFriends[friendIndex],
          activeGroup: null,
        };

        return newFriends;
      });
    };

    const onActiveGroup = ({ userId, group }) => {
      updateFriendsStatus((prev) => {
        const friendIndex = prev.findIndex(
          (friend) => friend.user_id === userId
        );
        if (friendIndex === -1) return prev;

        const newFriends = [...prev];
        newFriends[friendIndex] = {
          ...newFriends[friendIndex],
          activeGroup: group,
        };

        return newFriends;
      });
    };

    socket.on("studying", onStudying);
    socket.on("stopStudying", onStopStudying);
    socket.on(`deActiveGroup`, onDeActiveGroup);
    socket.on(`activeGroup`, onActiveGroup);
    return () => {
      socket.off("studying", onStudying);
      socket.off("stopStudying", onStopStudying);
      socket.off(`deActiveGroup`, onDeActiveGroup);
      socket.off(`activeGroup`, onActiveGroup);
    };
  }, []); */

  const addFriend = useCallback(() => {
    setSearchUsersModal((prev) => ({
      onClick: (userInfo) => {
        router.push(`/dashboard/user/${userInfo.user_id}`);
      },
      opened: !prev.opened,
    }));
  }, []);

  if (friendsStatusError) {
    return <RecommendedFriendsViewer />;
  }

  const onlineFriends = friendsStatus.filter((friend) => friend.activeSubject);
  const offlineFriends = friendsStatus.filter(
    (friend) => !friend.activeSubject
  );

  return (
    <div className={`Box ${styles.FriendsViewer}`}>
      <div className={`header`}>
        <h2>Friends</h2>
        <div className="button" onClick={addFriend}>
          <FontAwesomeIcon icon={faPlus} />
          <div className={`HoverText ${styles.hoverText}`}>Add friend!</div>
        </div>
      </div>
      <div className={styles.sections}>
        <div className={styles.section} id={styles.onlineFriends}>
          <div className={styles.header}>
            <h2>Online Friends ({onlineFriends.length})</h2>
          </div>
          <div className={`${styles.contents} contents customScroll`}>
            {friendsStatusIsLoading ? (
              <CircularLoading />
            ) : (
              onlineFriends.map((friend, i) => {
                return (
                  <FriendCard
                    key={i}
                    friend={friend}
                    index={i}
                    total={onlineFriends.length}
                    onClick={() =>
                      router.push(`/dashboard/user/${friend.user_id}`)
                    }
                  />
                );
              })
            )}
          </div>
        </div>
        <div className={styles.section} id={styles.offlineFriends}>
          <div className={styles.header}>
            <h2>Offline Friends ({offlineFriends.length})</h2>
          </div>
          <div className={`${styles.contents} contents customScroll`}>
            {friendsStatusIsLoading ? (
              <CircularLoading />
            ) : (
              offlineFriends.map((friend, i) => {
                return (
                  <FriendCard
                    key={i}
                    friend={friend}
                    index={i}
                    total={offlineFriends.length}
                    onClick={() =>
                      router.push(`/dashboard/user/${friend.user_id}`)
                    }
                  />
                );
              })
            )}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.header}>
            <h2>Friend Requests</h2>
          </div>
          <div className={`${styles.contents} contents customScroll`}>
            {friendRequests.map((request, i) => {
              return (
                <ReceivedFriendRequestContainer
                  friendRequest={request}
                  key={i}
                  style={{ zIndex: friendRequests.length - i }}
                  friendRequestReply={friendRequestReply}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const FriendCard = ({ friend, index, total, onClick }) => (
  <div className={styles.FriendCard} style={{ zIndex: total - index }}>
    <div className={styles.info}>
      <UserContainer userInfo={friend} onClick={onClick} />
      <div className={styles.activeInfo}>
        <UserSubjectViewer userInfo={friend} />
        <UserGroupViewer userInfo={friend} />
      </div>
    </div>
    <div className={styles.buttons}>
      <ChatBtn targetInfo={friend} padding={"0.3rem 0.6rem"} />
    </div>
  </div>
);

export default FriendsViewer;
