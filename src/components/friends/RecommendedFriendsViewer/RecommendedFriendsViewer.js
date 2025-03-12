"use client";

import React from "react";
import styles from "./RecommendedFriendsViewer.module.css";
import { useRouter } from "next/navigation";
import { useFriendsRecommended } from "@/hooks/friendsHooks";
import RefreshBtn from "@/components/buttons/RefreshBtn/RefreshBtn";
import CircularLoading from "@/components/loadings/CircularLoading/CircularLoading";
import UserContainer from "@/components/Users/UserContainer/UserContainer";
import FriendRequestBtn from "@/components/buttons/FriendRequestBtn/FriendRequestBtn";

function RecommendedFriendsViewer({}) {
  const {
    friendsRecommendedData,
    friendsRecommendedIsLoading,
    friendsRecommendedRefetch,
  } = useFriendsRecommended();

  const router = useRouter();

  return (
    <div className={`box ${styles.RecommendedFriendsViewer}`}>
      <div className={"header"}>
        <h2>Recommended Friends</h2>
        <RefreshBtn onClick={friendsRecommendedRefetch} />
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
