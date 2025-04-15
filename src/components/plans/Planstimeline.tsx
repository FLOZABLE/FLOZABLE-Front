import { ComponentProps } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ViewerType } from "@/types/others";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";
import { usePlanModal } from "../structure/ModalProviders";

interface PlanstimelineProps extends ComponentProps<"div"> {
  viewDate?: Date;
  viewer?: ViewerType;
}

export default function Planstimeline({
  viewer,
  viewDate,
  ...props
}: PlanstimelineProps) {
  const { setPlanModal } = usePlanModal();

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="flex items-center">
          Plans
          <Button
            variant={"outline"}
            className="ml-auto"
            onClick={() => {
              setPlanModal((prev) => ({
                ...prev,
                opened: true,
                plan_id: "new",
              }));
            }}
          >
            <CirclePlus /> Add Plan
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>sdfsdf</CardContent>
    </Card>
  );
}
