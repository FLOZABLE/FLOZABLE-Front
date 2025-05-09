import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ComponentProps } from "react";
import { cn } from "@/utils/tools";
import { Badge } from "../ui/badge";

interface StudyModalContainerProps extends ComponentProps<"div"> {
  open: boolean;
  onClose: () => void;
  title: string;
}

export default function StudyModalContainer({
  open,
  onClose,
  title,
  children,
  className,
  ...props
}: StudyModalContainerProps) {
  return (
    <Card
      className={cn(
        "w-fit gap-2 py-3 fixed transition-all duration-300 ease-in-out transform",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
      {...props}
    >
      <CardHeader className="px-3 flex items-center">
        <Button
          onClick={() => {
            onClose();
          }}
          className="w-fit bg-background"
          variant={"ghost"}
        >
          <X />
        </Button>
        <CardTitle>
          <Badge className="text-xl bg-background" variant={"secondary"}>
            {title}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3">{children}</CardContent>
    </Card>
  );
}
