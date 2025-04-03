import { useContext } from "react";
import styles from "./AccountWall.module.css";
import { useAccountModal } from "@/components/structure/ModalProviders";

export default function AccountWall() {
  const { setAccountModal } = useAccountModal();

  return (
    <div
      className={styles.AccountWall}
      onClick={() => {
        setAccountModal(prev => ({...prev, opened: true, isSignIn: true}));
      }}
    >
      <p>Login to use this feature!</p>
    </div>
  );
}
