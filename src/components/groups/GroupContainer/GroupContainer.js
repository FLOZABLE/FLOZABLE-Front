import React, { useCallback, useEffect, useState } from "react";
import styles from "./GroupContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faHeart,
  faPeopleGroup,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";
import config from "@//utils/config";
import { postGroupLike } from "@/apis/groupsApi";
import { useAccount } from "@/hooks/accountHooks";
import { useGroups } from "@/hooks/groupsHook";

function GroupContainer({
  groupInfo,
  isSearched = true,
  rankings,
  style = {},
}) {
  const { accountData } = useAccount();
  const { updateGroupsData } = useGroups();

  const [members, setMembers] = useState([]);
  const [likes, setLikes] = useState([]);
  const [totalTime, setTotalTime] = useState("0 h");

  const onLike = useCallback(async () => {
    if (!accountData?.user_id) return;

    const like = !likes.includes(accountData?.user_id);
    const groupId = groupInfo.group_id;
    const response = await postGroupLike({ groupId, like });
    if (!response.success) return;

    updateGroupsData((prev) => {
      const newGroups = [...prev];
      const groupIndex = newGroups.findIndex(
        (group) => group.group_id === groupId
      );
      if (groupIndex === -1) return prev;

      if (like) {
        newGroups[groupIndex].likes.push(accountData.user_id);
      } else {
        newGroups[groupIndex].likesfilter(
          (like) => like !== accountData.user_id
        );
      }
      return newGroups;
    });

    if (like) {
      setLikes([...new Set([...likes, accountData.user_id])]);
    } else {
      setLikes(likes.filter((like) => like !== accountData.user_id));
    }
  }, [likes, groupInfo, accountData]);

  useEffect(() => {
    if (!groupInfo) return;
    setMembers(groupInfo.members);
    setLikes(groupInfo.likes);
  }, [groupInfo]);

  useEffect(() => {
    if (!rankings || !members.length) return;
    const groupMembers = rankings.filter((user) =>
      members.includes(user.user_id)
    );
    const totalTime = groupMembers.reduce(
      (partialTime, a) => partialTime + a.study_time,
      0
    );
    const membersAvg = Math.floor(totalTime / members.length);
    const formattedValue = secondConverter({ sec: membersAvg });
    setTotalTime(formattedValue);
  }, [members, rankings]);

  return (
    <div
      className={`${styles.GroupContainer} ${!isSearched ? styles.hidden : ""}`}
      style={style}
    >
      {/* <div
        className={styles.layer}
        id={styles.name}
      >
        <p className={`overflowDot`}>{groupInfo?.name}</p>
      </div>
      <div className={`hiddenScroll ${styles.layer}`} id={styles.description}>
        {parse(groupInfo.description)}
      </div>
      <div className={styles.layer} id={styles.info}>
        <div>
          <i>
            <FontAwesomeIcon icon={faPeopleGroup} />
          </i>
          <GroupMemCounter
            initialMembers={members}
            groupId={groupInfo.group_id}
          />
        </div>
        <div>
          <i>
            <FontAwesomeIcon icon={faBullseye} />
          </i>
          <p>{groupInfo.goal_hr}hr</p>
        </div>
        <div>
          <i>
            <FontAwesomeIcon icon={faStopwatch} />
          </i>
          <p>{totalTime}</p>
        </div>
        <div>
          <i>
            <FontAwesomeIcon icon={faHeart} />
          </i>
          <SocketCounter
            id={groupInfo.group_id}
            events={{ add: "like:group", remove: "unlike:group" }}
            members={likes}
            setMembers={setLikes}
          />
        </div>
      </div>
      <div className={`hiddenScroll ${styles.layer}`} id={styles.tags}>
        {groupInfo.tags.map((tag, i) => {
          return (
            <div
              className={styles.tag}
              key={i}
              style={{ backgroundColor: groupInfo.color }}
            >
              #{tag}
            </div>
          );
        })}
      </div>
      <div className={styles.layer} id={styles.buttons}>
        <GroupUrlBtn
          text={`${config.next_server}/dashboard/groups?groupId=${groupInfo.group_id}`}
        />
        <GroupJoinBtn groupInfo={groupInfo} />
        <LikeBtn
          liked={likes.includes(accountData?.user_id)}
          onClick={onLike}
        />
      </div> */}
    </div>
  );
}

export default GroupContainer;
