import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ComponentProps } from "react";
import { cn } from "@/utils/tools";

interface StudyModalContainerProps extends ComponentProps<"div"> {
  open: boolean;
  onClose: () => void;
}

export default function StudyModalContainer({
  open,
  onClose,
  children,
  className,
  ...props
}: StudyModalContainerProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          <X />
        </Button>
        <CardTitle>{}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
