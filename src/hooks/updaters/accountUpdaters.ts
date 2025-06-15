import { Account } from "@/types/accountTypes";

import { useUpdater } from "../otherHooks";

export function useUserInfoUpdater() {
  return useUpdater<{ userinfo: Account }, "userinfo">(["account"], "userinfo");
}
