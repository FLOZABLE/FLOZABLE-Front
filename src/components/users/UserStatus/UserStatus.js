import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./UserStatus.module.css";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useProfileStatus } from "@/hooks/accountHooks";

export default function UserStatus({ userInfo }) {
  const { profileStatus } = useProfileStatus(userInfo?.user_id);

  const color = !profileStatus?.active_subject?.subject_id
    ? "gray"
    : profileStatus?.active_subject?.subject_id !== "0"
    ? "#25cb33"
    : "red";
  return (
    <div className={styles.UserStatus}>
      <i style={{ color }}>
        <FontAwesomeIcon icon={faCircle} />
      </i>
    </div>
  );
}
