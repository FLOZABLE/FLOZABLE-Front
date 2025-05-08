import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ComponentProps } from "react";
import { cn } from "@/utils/tools";

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
    <Card className={cn("w-fit gap-2 py-3 fixed", className)} {...props}>
      <CardHeader className="px-3 flex items-center">
        <Button
          onClick={() => {
            onClose();
          }}
          className="w-fit"
          variant={"ghost"}
        >
          <X />
        </Button>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-3">{children}</CardContent>
    </Card>
  );
}
