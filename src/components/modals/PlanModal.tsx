"use client";

import { useCallback, useState } from "react";
import { usePlanModal } from "../structure/ModalProviders";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";
import { Plan } from "@/types/plan";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deletePlan } from "@/apis/plansApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { Button } from "../ui/button";
import { ArrowRightIcon, Trash2Icon } from "lucide-react";

const planSchema = z.object({
  summary: z.string().min(1, { message: "Summary is required" }),
  start: z.object({
    dateTime: z.string().min(1, { message: "Start time is required" }),
  }),
  end: z.object({
    dateTime: z.string().min(1, { message: "End time is required" }),
  }),
});

type PlanFormValues = z.infer<typeof planSchema>;

export default function PlanModal() {
  const { planModal, setPlanModal } = usePlanModal();

  const [plan, setPlan] = useState<Plan>({
    id: "",
    summary: "",
    start: { dateTime: "" },
    end: { dateTime: "" },
  });

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      summary: "",
      start: { dateTime: "" },
      end: { dateTime: "" },
    },
  });

  const handleSave = useCallback(
    async (values: PlanFormValues) => {},
    [planModal, setPlanModal]
  );

  const handleDelete = useCallback(async () => {
    if (planModal.plan_id !== "new") {
      await deletePlan(planModal.plan_id);
      setPlanModal((prev) => ({ ...prev, opened: false }));
    }
  }, [planModal.plan_id, setPlanModal]);

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
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        placeholder="Summary"
                        label="Summary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start.dateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        type="datetime-local"
                        label="Start Time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end.dateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        type="datetime-local"
                        label="End Time"
                        {...field}
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
                {/* {planModal.plan_id !== "new" && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    icon={Trash2Icon}
                    className="w-full"
                  >
                    Delete Plan
                  </Button>
                )} */}
              </div>
            </form>
          </Form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
