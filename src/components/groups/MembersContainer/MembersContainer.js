import React from "react";
import styles from "./MembersContainer.module.css";
import { useAccount } from "@/hooks/accountHooks";
import CircularLoading from "@/components/loadings/CircularLoading/CircularLoading";
import MyEl from "../MyEl/MyEl";
import MemberEl from "../MemberEl/MemberEl";

//window.localStorage.setItem('debug', 'mediasoup-client:WARN* mediasoup-client:ERROR*');

function MembersContainer({ members, recvTransport, device, videoStream }) {
  const { account } = useAccount();

  if (!account) return <CircularLoading />;

  return (
    <div className={styles.MembersContainer}>
      {members.map((member, i) => {
        if (account.user_id === member.user_id) {
          return <MyEl key={i} userInfo={member} videoStream={videoStream} />;
        } else {
          return (
            <div key={i}>
              <MemberEl
                memberInfo={member}
                device={device}
                recvTransport={recvTransport}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

export default MembersContainer;
