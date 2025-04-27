import { Account } from "@/types/account";
import { useUpdater } from "../otherHooks";

export function useUserInfoUpdater() {
  return useUpdater<{ userinfo: Account }, "userinfo">(["account"], "userinfo");
}
