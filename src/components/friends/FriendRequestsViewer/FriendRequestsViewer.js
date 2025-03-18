import React, { useCallback, useEffect, useState } from "react";
import styles from "./FriendRequestsViewer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import {
  deleteFriendRequest,
  postFriendsRequestReply,
} from "@/apis/friendsApi";
import UserContainer from "@/components/users/UserContainer/UserContainer";
import { useFriendsStatus, useFriendsTrends } from "@/hooks/friendsHooks";
import { useNotifications } from "@/hooks/notificationsHooks";
import SlidingOptBtn from "@/components/buttons/SlidingOptBtn/SlidingOptBtn";

function SentFriendRequestContainer({
  friendRequest,
  friendRequestDelete,
  style,
}) {
  const router = useRouter();

  return (
    <div className={styles.FriendRequestContainer} style={style}>
      <UserContainer
        userInfo={friendRequest.userinfo}
        onClick={() => {
          router.push(`/dashboard/user/${friendRequest.userinfo.user_id}`);
        }}
      />
      <div className={styles.buttons}>
        <div
          className={styles.button}
          onClick={() => {
            friendRequestDelete(request.notification_id);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
          <div className={`hoverText ${styles.hoverText}`}>Abort</div>
        </div>
      </div>
    </div>
  );
}

function ReceivedFriendRequestContainer({
  friendRequest,
  friendRequestReply,
  style,
}) {
  const router = useRouter();

  return (
    <div className={styles.FriendRequestContainer} style={style}>
      <UserContainer
        userInfo={friendRequest.userinfo}
        onClick={() => {
          router.push(`/dashboard/user/${friendRequest.userinfo.user_id}`);
        }}
      />
      <div className={styles.buttons}>
        <div
          className={styles.button}
          onClick={() => {
            friendRequestReply(friendRequest.notification_id, false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
          <div className={`hoverText ${styles.hoverText}`}>Decline</div>
        </div>
        <div
          className={styles.button}
          onClick={() => {
            friendRequestReply(friendRequest.notification_id, true);
          }}
        >
          <FontAwesomeIcon icon={faCheck} />
          <div className={`hoverText ${styles.hoverText}`}>Accept</div>
        </div>
      </div>
    </div>
  );
}

export { SentFriendRequestContainer, ReceivedFriendRequestContainer };

function FriendRequestsViewer() {
  const { friendsStatusRefetch } = useFriendsStatus();
  const { friendsTrendRefetch } = useFriendsTrends();
  const { notifications, filterNotification } = useNotifications();

  const [viewer, setViewer] = useState(0);
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    if (!notifications) return;
    const friendRequests = [];
    const sentRequests = [];

    notifications.map((notification) => {
      if (notification.type === "friend_request") {
        friendRequests.push(notification);
      } else if (notification.type === "friend_request_sent") {
        sentRequests.push(notification);
      }
    });

    setFriendRequests(friendRequests);
    setSentRequests(sentRequests);
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

  const friendRequestDelete = useCallback(async (notificationId) => {
    await deleteFriendRequest(notificationId);

    filterNotification(notificationId);
  }, []);

  return (
    <div className={`box ${styles.FriendRequestsViewer}`}>
      <div className={`header ${styles.header}`}>
        <h2>Friend Requests</h2>
        <SlidingOptBtn
          options={[
            {
              name: `Incoming (${friendRequests.length})`,
              value: 0,
            },
            {
              name: `Outgoing (${sentRequests.length})`,
              value: 1,
            },
          ]}
          value={viewer}
          setValue={setViewer}
          isCheck={true}
        />
      </div>
      <div className={`contents ${styles.friendRequests} customScroll`}>
        {viewer
          ? sentRequests.map((request, i) => {
              return (
                <SentFriendRequestContainer
                  friendRequest={request}
                  key={i}
                  style={{ zIndex: friendRequests.length - i }}
                  friendRequestDelete={friendRequestDelete}
                />
              );
            })
          : friendRequests.map((request, i) => {
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
      {viewer === "1" && !sentRequests.length ? (
        <div className={styles.dispMsg}>No outgoing requests</div>
      ) : viewer === "0" && !friendRequests.length ? (
        <div className={styles.dispMsg}>No incoming requests</div>
      ) : null}
    </div>
  );
}

export default FriendRequestsViewer;
