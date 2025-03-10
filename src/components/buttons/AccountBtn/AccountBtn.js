import styles from "./AccountBtn.module.css";
import { useContext } from "react";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAccount } from "@/hooks/accountHooks";
import { getAuthLogout } from "@/apis/authApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AccountModalContext } from "@/components/structure/ModalProviders";

export default function AccountBtn() {
  const { setIsAccountModal } = useContext(AccountModalContext);
  const { accountData, clearAccountData } = useAccount();

  return (
    <div
      className={styles.AccountBtn}
      onClick={async () => {
        try {
          if (accountData) {
            const response = await getAuthLogout();
            if (response.success) {
              clearAccountData();
              window.location.reload();
            }
          } else {
            setIsAccountModal(true);
          }
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {accountData ? (
        <>
          <i>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </i>
          <p>Logout</p>
        </>
      ) : (
        <>
          <i>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </i>
          <p>Login</p>
        </>
      )}
    </div>
  );
}
