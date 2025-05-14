import { Move, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ComponentProps, useRef } from "react";
import { cn } from "@/utils/tools";
import { Badge } from "../ui/badge";
import Draggable from "react-draggable";

interface StudyModalContainerProps extends ComponentProps<"div"> {
  open: boolean;
  onClose: () => void;
  title: string;
  cardClassName?: string;
}

export default function StudyModalContainer({
  open,
  onClose,
  title,
  children,
  className,
  cardClassName,
  ...props
}: StudyModalContainerProps) {
  const ref = useRef<HTMLDivElement>(null!);

  return (
    <Draggable nodeRef={ref} handle=".drag-handle">
      <div
        ref={ref}
        className={cn(
          "fixed ease-in-out transform bg-transparent transition-[opacity,margin,visibility] duration-300",
          open ? "opacity-100 mt-0 visible" : "opacity-0 mt-4 invisible",
          className
        )}
        {...props}
      >
        <Card className={cn("w-fit gap-2 py-3 relative", cardClassName)}>
          <CardHeader className="flex items-center px-2">
            <Button onClick={onClose} className="bg-background" variant="ghost">
              <X className="size-5" />
            </Button>
            <CardTitle>
              <Badge className="text-xl bg-background" variant="secondary">
                {title}
              </Badge>
            </CardTitle>
            <Button
              variant="ghost"
              className="drag-handle cursor-move ml-auto bg-background"
            >
              <Move />
            </Button>
          </CardHeader>
          <CardContent className="px-3">{children}</CardContent>
        </Card>
      </div>
    </Draggable>
  );
}
