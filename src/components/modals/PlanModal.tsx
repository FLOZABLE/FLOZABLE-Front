"use client";

import { patchPlan, putPlan } from "@/apis/plansApi";
import { usePlans } from "@/hooks/plansHooks";
import { ViewerType } from "@/types/othersTypes";
import { defaultPlan, EventPlan } from "@/types/planTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePicker } from "../buttons/DatePicker";
import TimePicker from "../buttons/TimePicker";
import Editor from "../editor/Editor";
import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { usePlanModal } from "../structure/ModalProviders";
import { Button } from "../ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const planSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  start: z.string().min(1, { message: "Start time is required" }),
  end: z.string().min(1, { message: "End time is required" }),
});

type PlanFormValues = z.infer<typeof planSchema>;

export default function PlanModal() {
  const { planModal, setPlanModal } = usePlanModal();

  const { plansData, updatePlans } = usePlans(planModal.viewDate);

  const [viewer, _setViewer] = useState<ViewerType>("day");

  const [plans, setPlans] = useState<EventPlan[]>([]);

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      title: "",
      description: "",
      start: "",
      end: "",
    },
  });

  const start = form.watch("start");
  const end = form.watch("end");

  const handleSave = useCallback(
    async (values: PlanFormValues) => {
      if (planModal.plan_id === "new") {
        const response = await putPlan(values);
        if (!response.success) return;

        const newPlan = response.data?.plan;
        if (!newPlan) return;

        planModal.calendarApi?.unselect();

        updatePlans((prev) =>
          prev.map((calendar) => {
            if (calendar.id === newPlan.calendar_id) {
              return {
                ...calendar,
                events: [...calendar.events, newPlan],
              };
            }
            return calendar;
          }),
        );
      } else {
        const plan = plans.find((plan) => plan.id === planModal.plan_id);
        if (!plan) return;

        plan.title = values.title || "";
        plan.start = values.start;
        plan.end = values.end;
        plan.description = values.description || "";

        const response = await patchPlan(plan);
        const newPlan = response.data?.plan;
        if (!response.success || !newPlan) return;

        updatePlans((prev) =>
          prev.map((calendar) => {
            if (calendar.id === newPlan.calendar_id) {
              return {
                ...calendar,
                events: [
                  ...calendar.events.filter((event) => event.id !== newPlan.id),
                  newPlan,
                ],
              };
            }
            return calendar;
          }),
        );
      }

      setPlanModal((prev) => ({ ...prev, opened: false }));
    },
    [planModal, setPlanModal, updatePlans, plans],
  );

  useEffect(() => {
    if (!plansData) return;

    const plans = plansData
      .flatMap((calendar) => calendar.events)
      .map((plan) => {
        return {
          ...plan,
          backgroundColor: plan.background_color,
          borderColor: plan.background_color,
        };
      });
    setPlans(plans);
  }, [plansData]);

  useEffect(() => {
    if (!planModal.opened) return;

    const plan =
      planModal.plan_id === "new"
        ? defaultPlan
        : plans?.find((plan) => plan.id === planModal.plan_id);

    if (!plan) return;

    form.reset({
      title: plan.title || "",
      description: plan.description || "",
      start: plan.start || "",
      end: plan.end || "",
    });
  }, [planModal.opened, planModal.plan_id, form, plans]);

  useEffect(() => {
    if (!planModal.calendarSelect) return;

    const start =
      DateTime.fromJSDate(planModal.calendarSelect.start).toISO() || "";
    const end = DateTime.fromJSDate(planModal.calendarSelect.end).toISO() || "";

    form.setValue("start", start);
    form.setValue("end", end);
  }, [planModal.calendarSelect]);

  useEffect(() => {
    if (
      !planModal.calendarApi ||
      !planModal.opened ||
      planModal.plan_id !== "new"
    )
      return;
    if (!start || !end) return;

    planModal.calendarApi.select({ start, end });
  }, [start, end, planModal.calendarApi, planModal.opened]);

  return (
    <Credenza
      open={planModal.opened}
      onOpenChange={(opened) => {
        if (!opened) {
          planModal.calendarApi?.unselect();
        }
        setPlanModal((prev) => ({ ...prev, opened }));
      }}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>
            {planModal.plan_id === "new" ? "Add Plan" : "Edit Plan"}
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        placeholder="Title"
                        label="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date + Time Pickers */}
              <div className="flex gap-5">
                {/* Date Picker for Start */}
                <DatePicker
                  viewDate={new Date(form.getValues("start"))}
                  setViewDate={(newDate) => {
                    const newStartDate = DateTime.fromJSDate(newDate);
                    const oldStart = DateTime.fromISO(form.getValues("start"));
                    const oldEnd = DateTime.fromISO(form.getValues("end"));

                    const newStart = newStartDate.set({
                      hour: oldStart.hour,
                      minute: oldStart.minute,
                      second: oldStart.second,
                      millisecond: oldStart.millisecond,
                    });

                    const duration = oldEnd.diff(oldStart);
                    const newEnd = newStart.plus(duration);

                    form.setValue("start", newStart.toISO() || "");
                    form.setValue("end", newEnd.toISO() || "");
                  }}
                  align="start"
                  viewer={viewer}
                />

                {/* Start Time Picker */}
                <FormField
                  control={form.control}
                  name="start"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TimePicker
                          date={new Date(form.getValues("start"))}
                          setDate={(newStartDate) => {
                            const prevStart = new Date(form.getValues("start"));
                            const prevEnd = new Date(form.getValues("end"));

                            const durationMs =
                              prevEnd.getTime() - prevStart.getTime();
                            const newEnd = new Date(
                              newStartDate.getTime() + durationMs,
                            );
                            const iso = newStartDate.toISOString();

                            form.setValue("start", iso);
                            form.setValue("end", newEnd.toISOString());
                            field.onChange(iso);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Time Picker */}
                <FormField
                  control={form.control}
                  name="end"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TimePicker
                          date={new Date(form.getValues("end"))}
                          setDate={(date) => {
                            const newEnd = new Date(date);
                            const start = new Date(form.getValues("start"));

                            if (newEnd <= start) {
                              newEnd.setDate(newEnd.getDate() + 1);
                            }

                            const iso = newEnd.toISOString();
                            form.setValue("end", iso);
                            field.onChange(iso);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description Editor */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor
                        value={field.value}
                        onHtmlChange={(text) => field.onChange(text)}
                        contentEditorClassName="max-h-[200]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full"
                  effect={"expandIcon"}
                  icon={ArrowRightIcon}
                  iconPlacement="right">
                  {planModal.plan_id === "new" ? "Create Plan" : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
