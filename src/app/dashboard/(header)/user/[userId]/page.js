"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useAccountProfile } from "@/hooks/accountHooks";
import { useGroups } from "@/hooks/groupsHook";
import { DateTime } from "luxon";
import UserStatus from "@/components/users/UserStatus/UserStatus";
import FriendRequestBtn from "@/components/buttons/FriendRequestBtn/FriendRequestBtn";
import ChatBtn from "@/components/buttons/ChatBtn/ChatBtn";
import StudyTrendChart from "@/components/charts/StudyTrendChart/StudyTrendChart";
import RankingsTrendsChart from "@/components/charts/RankingsTrendsChart/RankingsTrendsChart";
import GroupContainer from "@/components/groups/GroupContainer/GroupContainer";
import config from "@/utils/config";
import Image from "next/image";

function User({ params }) {
  const { userId } = React.use(params);

  const { accountProfileData } = useAccountProfile(userId);
  const { groups } = useGroups();

  //const [friends, setFriends] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [userGroups, setUserGroups] = useState([]);
  const [joinedAt, setJointedAt] = useState("");

  const [viewDate, setViewDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [viewer, setViewer] = useState("day");

  useEffect(() => {
    if (!accountProfileData) return;

    const { userinfo, friends } = accountProfileData;

    setUserInfo(userinfo);
    //setFriends(friends);
  }, [accountProfileData]);

  useEffect(() => {
    if (!userInfo) return;

    const diff = DateTime.now().diff(DateTime.fromSeconds(userInfo.created_at));
    const diffSec = diff.as("seconds");

    let mode = "seconds";

    if (diffSec > 60 * 60 * 24 * 30) {
      mode = "months";
    } else if (diffSec > 60 * 60 * 24) {
      mode = "days";
    } else if (diffSec > 60 * 60) {
      mode = "hours";
    } else if (diffSec > 60) {
      mode = "minutes";
    }

    const value = Math.round(diff.as(mode));
    setJointedAt(`Joined ${value} ${mode} ago`);
  }, [userInfo?.created_at]);

  useEffect(() => {
    if (!userInfo || !groups) return;
    setUserGroups(
      groups.filter((group) => userInfo.groups.includes(group.group_id))
    );
  }, [groups, userInfo?.groups]);

  if (!userInfo) {
    return null;
  }

  return (
    <div className={`page`}>
      <main className={"main"}>
        <div className={styles.layer}>
          <div className={styles.left}>
            <div className={styles.profileCard}>
              <div className={styles.profile}>
                <Image
                  className={styles.profileImage}
                  src={`${config.static_server}/img/profile-images/${userId}.jpeg`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  alt={`${userId} profile image`}
                  unoptimized
                />
                <div className={styles.userStatus}>
                  <UserStatus userInfo={userInfo} />
                </div>
              </div>
              <div className={styles.userInfo}>
                <p className={styles.name}>{userInfo.name}</p>
                <p>{joinedAt}</p>
                <div className={styles.buttons}>
                  <FriendRequestBtn userInfo={userInfo} />
                  <ChatBtn targetInfo={userInfo} />
                </div>
              </div>
            </div>
            <div className={styles.box}>
              <StudyTrendChart
                viewDate={viewDate}
                setViewDate={setViewDate}
                viewer={viewer}
                subjects={accountProfileData.subjects}
                userId={userId}
              />
            </div>
            <div className={styles.box}>
              <RankingsTrendsChart
                viewDate={viewDate}
                setViewDate={setViewDate}
                viewer={viewer}
                userId={userInfo?.user_id}
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.groups}>
              {userGroups.map((group, i) => {
                return (
                  <GroupContainer groupInfo={group} key={i} isSearched={true} />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default User;
