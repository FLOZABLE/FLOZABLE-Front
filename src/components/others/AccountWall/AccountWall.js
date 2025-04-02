import { useContext } from "react";
import styles from "./AccountWall.module.css";
import { useAccountModal } from "@/components/structure/ModalProviders";

export default function AccountWall() {
  const { setIsAccountModal } = useAccountModal();

  return (
    <div
      className={styles.AccountWall}
      onClick={() => {
        setIsAccountModal(true);
      }}
    >
      <p>Login to use this feature!</p>
    </div>
  );
}
