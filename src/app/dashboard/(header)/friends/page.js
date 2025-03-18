"use client";

import React from "react";
import styles from "./page.module.css";
import FriendRequestsViewer from "@/components/friends/FriendRequestsViewer/FriendRequestsViewer";
import FriendsActivityViewer from "@/components/friends/FriendsActivityViewer/FriendsActivityViewer";
import FriendsTrendChart from "@/components/charts/FriendsTrendChart";

function Friends({}) {
  return (
    <div className={`page`}>
      <main className={"main"}>
        <div className={styles.layer}>
          <div className={styles.left}>
            <div className={`box`} id={styles.friendsTrendChart}>
              <FriendsTrendChart />
            </div>
          </div>
          <div className={styles.right}>
            <div id={styles.friendRequestsViewer}>
              <FriendRequestsViewer />
            </div>
            <div id={styles.friendsActivityViewer}>
              <FriendsActivityViewer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Friends;
