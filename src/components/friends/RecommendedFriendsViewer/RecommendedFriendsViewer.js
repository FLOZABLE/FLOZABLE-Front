"use client";

import React, { useContext } from "react";
import styles from "./RecommendedFriendsViewer.module.css";
import { useRouter } from "next/navigation";
import { SearchUsersModalContext } from "@/components/structure/ModalProviders";
import { useFriendsRecommended } from "@/hooks/friendsHooks";
import RefreshBtn from "@/components/buttons/RefreshBtn/RefreshBtn";
import CircularLoading from "@/components/loadings/CircularLoading/CircularLoading";
import UserContainer from "@/components/Users/UserContainer/UserContainer";
import FriendRequestBtn from "@/components/buttons/FriendRequestBtn/FriendRequestBtn";

function RecommendedFriendsViewer({}) {
  const { setSearchUsersModal } = useContext(SearchUsersModalContext);

  const {
    friendsRecommendedData,
    friendsRecommendedIsLoading,
    friendsRecommendedRefetch,
  } = useFriendsRecommended();

  const router = useRouter();

  return (
    <div className={`Box ${styles.RecommendedFriendsViewer}`}>
      <div className={styles.header}>
        <h2>Recommended Friends</h2>
        <RefreshBtn onClick={friendsRecommendedRefetch} />
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
          +<div className={`HoverText ${styles.hoverText}`}>Add friend!</div>
        </div>
      </div>
      <div className={`contents customScroll`}>
        {friendsRecommendedIsLoading ? (
          <CircularLoading />
        ) : (
          friendsRecommendedData.map((user, i) => {
            return (
              <div className={styles.user} key={i}>
                <UserContainer
                  userInfo={user}
                  onClick={() => {
                    router.push(`/dashboard/user/${user.user_id}`);
                  }}
                >
                  <FriendRequestBtn
                    userInfo={user}
                    padding={"0.1875rem 0.313rem"}
                  />
                </UserContainer>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default RecommendedFriendsViewer;
