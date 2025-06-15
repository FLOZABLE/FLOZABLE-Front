import { cn } from "@/lib/utils";

import AvatarWrapper from "../ui/avatar";

type ChatRoomCoverImageProps = {
  memberIds: string[];
};

export default function ChatRoomCoverImage({
  memberIds,
}: ChatRoomCoverImageProps) {
  return (
    <div className="relative rounded-4xl w-12 h-12 overflow-hidden bg-secondary shrink-0">
      {memberIds.slice(0, 3).map((memberId, i) => {
        return (
          <AvatarWrapper
            key={i}
            userId={memberId}
            name={memberId}
            className={cn(
              "absolute",
              i === 0
                ? "right-2 bottom-0 size-6"
                : i === 2
                  ? "top-1 right-0 size-5"
                  : "",
            )}
          />
        );
      })}
    </div>
  );
}
