import styles from "./GroupJoinBtn.module.css";
import { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useGroups } from "@/hooks/groupsHook";
import { JoinGroupModalContext } from "@/components/structure/ModalProviders";

export default function GroupJoinBtn({ groupInfo }) {
  const { setJoinGroupModal } = useContext(JoinGroupModalContext);

  const { myGroups } = useGroups();

  return (
    <div className={styles.GroupJoinBtn}>
      {myGroups.find((group) => group.group_id === groupInfo.group_id) ? (
        <Link
          href={`/dashboard/study?group=${groupInfo.group_id}`}
          className={styles.inner}
          onClick={() => {
            localStorage.removeItem("swiperGroupId");
          }}
        >
          Join the session
        </Link>
      ) : (
        <div
          onClick={() => {
            setJoinGroupModal({
              open: true,
              group: groupInfo,
            });
          }}
          className={styles.inner}
        >
          {!groupInfo.visibility ? (
            <i className={styles.lock}>
              <FontAwesomeIcon icon={faLock} />
            </i>
          ) : null}
          Join
        </div>
      )}
    </div>
  );
}
