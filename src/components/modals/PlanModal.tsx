"use client";

import { useCallback, useEffect, useState } from "react";
import { usePlanModal } from "../structure/ModalProviders";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import { defaultPlan, EventPlan } from "@/types/plan";
import TimePicker from "../buttons/TimePicker";
import { DatePicker } from "../buttons/DatePicker";
import { ViewerType } from "@/types/others";
import { usePlans } from "@/hooks/plansHooks";
import { EventInput } from "@fullcalendar/core";

const planSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  start: z.string().min(1, { message: "Start time is required" }),
  end: z.string().min(1, { message: "End time is required" }),
});

type PlanFormValues = z.infer<typeof planSchema>;

export default function PlanModal() {
  const { planModal, setPlanModal } = usePlanModal();
  const [plan, setPlan] = useState<EventPlan>(defaultPlan);

  const { plansData } = usePlans(planModal.viewDate);

  const [viewDate, setViewDate] = useState(new Date());
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

  const handleSave = useCallback(
    async (values: PlanFormValues) => {
      console.log("Saving plan", values);
      // convert values back to EventPlan and handle save
    },
    [planModal, setPlanModal]
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
    console.log(planModal);

    const plan =
      planModal.plan_id === "new"
        ? defaultPlan
        : plans?.find((plan) => plan.id === planModal.plan_id);

    if (!plan) return;
    setPlan(plan);

    form.reset({
      title: plan.title,
      description: plan.description,
      start: plan.start,
      end: plan.end,
    });
  }, [planModal.opened, planModal.plan_id, form, plans]);

  console.log(plan)

  return (
    <Credenza
      open={planModal.opened}
      onOpenChange={(opened) => setPlanModal((prev) => ({ ...prev, opened }))}
    >
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
              className="space-y-6"
            >
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        placeholder="Description"
                        label="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Time */}
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TimePicker
                        date={new Date(field.value || plan.start)}
                        setDate={(date) => {
                          const iso = date.toISOString();
                          field.onChange(iso);
                          setPlan((prev) => ({ ...prev, start: iso }));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Time */}
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TimePicker
                        date={new Date(field.value || plan.end)}
                        setDate={(date) => {
                          const iso = date.toISOString();
                          field.onChange(iso);
                          setPlan((prev) => ({ ...prev, end: iso }));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full"
                  effect={"expandIcon"}
                  icon={ArrowRightIcon}
                  iconPlacement="right"
                >
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
