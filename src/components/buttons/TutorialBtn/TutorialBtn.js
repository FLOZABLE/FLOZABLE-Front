import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TutorialBtn.module.css";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function TutorialBtn() {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/dashboard");
        setTimeout(() => {
          setIsOpen(true);
          //new tutorial
        }, 500);
      }}
      className={styles.TutorialBtn}
    >
      <i>
        <FontAwesomeIcon icon={faMap} />
      </i>
      <div className={`${styles.hoverText} hoverText`}>Start Tutorial!</div>
    </div>
  );
}
