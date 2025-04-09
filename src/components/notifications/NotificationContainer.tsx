import AvatarWrapper from "../ui/avatar";
import { Userinfo } from "@/types/account";
import Image from "next/image";

interface NotificationContainerProps {
  children?: React.ReactNode;
  userInfo: Userinfo;
  title: string;
  contents: string;
  coverImg: string;
  onClick?: () => void;
}

export default function NotificationContainer({
  children,
  userInfo,
  title,
  contents,
  coverImg,
  onClick,
}: NotificationContainerProps) {
  return (
    <div
      className="my-3 flex gap-2 cursor-pointer hover:bg-accent p-2 rounded-lg transition"
      onClick={onClick}
    >
      {coverImg === "profile" ? (
        <AvatarWrapper name={userInfo.user_id} userId={userInfo.user_id} />
      ) : (
        <Image
          src={coverImg}
          alt="cover image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-md object-cover"
        />
      )}
      <div>
        <h2 className="text-md font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{contents}</p>
        <div className="flex gap-2 mt-1">{children}</div>
      </div>
    </div>
  );
}
