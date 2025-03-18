"use client";

import React, { useContext, useEffect } from "react";
import styles from "./FriendsActivityViewer.module.css";
import { useRouter } from "next/navigation";
import { useFriendsStatus } from "@/hooks/friendsHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SearchUsersModalContext } from "@/components/structure/ModalProviders";
import RecommendedFriendsViewer from "../RecommendedFriendsViewer/RecommendedFriendsViewer";
import CircularLoading from "@/components/loadings/CircularLoading/CircularLoading";
import UserContainer from "@/components/users/UserContainer/UserContainer";
import UserSubjectViewer from "@/components/users/UserSubjectViewer/UserSubjectViewer";
import UserGroupViewer from "@/components/users/UserGroupViewer/UserGroupViewer";
import ChatBtn from "@/components/buttons/ChatBtn/ChatBtn";

function FriendsActivityViewer() {
  const { setSearchUsersModal } = useContext(SearchUsersModalContext);

  const router = useRouter();

  const { friendsStatus, friendsStatusIsLoading, friendsStatusError } =
    useFriendsStatus();

  console.log("friends err", friendsStatusError);

  if (friendsStatusError) {
    return <RecommendedFriendsViewer />;
  }

  return (
    <div className={`box ${styles.FriendsActivityViewer}`}>
      <div className={`header ${styles.header}`}>
        <h2>Friends</h2>
        <div
          id={styles.searchFriendBtn}
          onClick={() => {
            setSearchUsersModal((prev) => ({
              onClick: (userInfo) => {
                router.push(`/dashboard/user/${userInfo.user_id}`);
              },
              opened: !prev.opened,
            }));
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <div className={`hoverText ${styles.hoverText}`}>Add friend!</div>
        </div>
      </div>
      <div className={`${styles.friends} contents customScroll`}>
        {friendsStatusIsLoading ? (
          <CircularLoading />
        ) : (
          friendsStatus.map((friend, i) => {
            return (
              <div
                className={styles.friend}
                key={i}
                style={{ zIndex: friendsStatus.length - i }}
              >
                <div className={styles.info}>
                  <UserContainer
                    userInfo={friend}
                    onClick={() => {
                      router.push(`/dashboard/user/${friend.user_id}`);
                    }}
                  />
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
          })
        )}
      </div>
    </div>
  );
}

export default FriendsActivityViewer;
