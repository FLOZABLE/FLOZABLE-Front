import { Userinfo } from "@/types/account";
import AvatarWrapper from "../ui/avatar";
import CountryViewer from "./CountryViewer";
import { cn } from "@/utils/tools";

interface UserContainerProps {
  userinfo: Userinfo;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxNameWidth?: string;
}

export default function UserContainer({
  userinfo,
  children,
  className,
  onClick,
  maxNameWidth = "9rem",
}: UserContainerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-2 rounded-xl shadow-sm bg-white dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
        <AvatarWrapper name={userinfo.name} userId={userinfo.user_id} />
        <div
          className="truncate text-base font-medium"
          style={{ maxWidth: maxNameWidth }}
        >
          {userinfo.name}
        </div>
        <div className="ml-1">
          <CountryViewer timezone={userinfo.timezone} />
        </div>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
