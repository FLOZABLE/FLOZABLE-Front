"use client";

import { deletePlan } from "@/apis/planApi";
import { useWindowSize } from "@/hooks/otherHooks";
import { usePlans } from "@/hooks/planHooks";
import { cn, formatPlanDateRange } from "@/lib/utils";
import { EventPlan } from "@/types/planTypes";
import parser from "html-react-parser";
import { Pencil, Trash, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { usePlanModal } from "../structure/ModalProviders";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Position {
  top: number;
  left: number;
}

interface PlanViewerProps {
  position: Position;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  plan: EventPlan | null;
  width: number;
  viewDate: Date;
}

export default function PlanViewer({
  position,
  open,
  setOpen,
  plan,
  width,
  viewDate,
}: PlanViewerProps) {
  const windowSize = useWindowSize();

  const { setPlanModal } = usePlanModal();

  const { updatePlans } = usePlans(viewDate);

  const planViewerRef = useRef<HTMLDivElement | null>(null);

  const [adjustedPos, setAdjustedPos] = useState<Position>({ top: 0, left: 0 });

  useEffect(() => {
    const element = planViewerRef.current?.getBoundingClientRect();
    if (!element) return;

    if (windowSize.height / 2 < position.top) {
      //plan is too low
      setAdjustedPos({
        top: position.top - element.height,
        left: position.left,
      });
    } else {
      setAdjustedPos(position);
    }
  }, [position, windowSize]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isExceptionByClass = Array.from(target.classList).some(
        (className) => className.startsWith("fc-event"),
      );

      if (isExceptionByClass) return;

      // Close if click is outside the viewer
      if (planViewerRef.current && !planViewerRef.current.contains(target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  const onDeletePlan = useCallback(async () => {
    if (!plan?.id || !plan.calendar_id) return;

    const response = await deletePlan(plan.calendar_id, plan.id);
    if (!response.success) return;

    updatePlans((prev) =>
      prev.map((calendar) => {
        return {
          ...calendar,
          events: calendar.events.filter((prevPlan) => prevPlan.id !== plan.id),
        };
      }),
    );
  }, [plan]);

  return (
    <Card
      className={cn(
        `fixed z-50 transition-all duration-300 ease-in-out w-[${width}px]`,
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
      style={adjustedPos}
      ref={planViewerRef}>
      <CardHeader>
        <CardTitle className="flex gap-2 ml-auto">
          {plan?.editable && (
            <>
              <Button
                variant={"ghost"}
                onClick={() => {
                  setPlanModal((prev) => ({
                    ...prev,
                    opened: true,
                    plan_id: plan.id,
                  }));
                }}>
                <Pencil />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost">
                    <Trash />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your plan and remove its data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onDeletePlan();
                      }}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
          <Button
            variant={"ghost"}
            onClick={() => {
              setOpen(false);
            }}>
            <X />
          </Button>
        </CardTitle>
        <CardTitle>{plan?.title}</CardTitle>
        <CardDescription>
          {formatPlanDateRange(plan?.start, plan?.end)}
        </CardDescription>
      </CardHeader>
      <CardContent className="wrap-break-word max-h-40 overflow-auto">
        {parser(plan?.description || "")}
      </CardContent>
    </Card>
  );
}
