"use client";

import { putSubject } from "@/apis/subjectApi";
import { useTutorial } from "@/hooks/tutorialHooks";
import { useSubjectsUpdater } from "@/hooks/updaters/subjectUpdaters";
import emitter from "@/lib/emitter";
import {
  putSubjectSchema,
  PutSubjectSchemaValues,
} from "@/schemas/subjectSchemas";
import { Subject, TimePeriodData, TimeRange } from "@/types/subjectTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { ColorPicker } from "../inputs/ColorPicker";
import { FloatingLabelInput } from "../inputs/FloatingLabelInput";
import { useAddSubjectModal } from "../structure/ModalProviders";
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

export default function AddSubjectModal() {
  const { currentTour, currentStep, setCurrentStep } = useTutorial();

  const { addSubjectModal, setAddSubjectModal } = useAddSubjectModal();

  const form = useForm<PutSubjectSchemaValues>({
    resolver: zodResolver(putSubjectSchema),
    defaultValues: {
      name: "",
      color: undefined,
    },
  });
  const color = form.watch("color");

  const updateSubjects = useSubjectsUpdater();

  const onSubmit = useCallback(
    async (values: PutSubjectSchemaValues) => {
      const response = await putSubject(values);
      if (!response.success || !response.data?.subject) return;

      setAddSubjectModal((prev) => ({ ...prev, opened: false }));

      setCurrentStep(4);

      form.reset();

      await updateSubjects((prev) => {
        const newSubjects = [...prev];
        const subjectStart = newSubjects.toSorted(
          (a, b) => a.created_at - b.created_at,
        )[0].created_at;

        const dayStart = DateTime.fromSeconds(subjectStart).startOf("day");
        const weekStart = dayStart.startOf("week");
        const monthStart = dayStart.startOf("month");

        const now = DateTime.now().startOf("day");

        const daysLength = now.diff(dayStart, "days").days + 1;
        const weeksLength =
          now.startOf("week").diff(weekStart, "weeks").weeks + 1;
        const monthsLength =
          now.startOf("month").diff(monthStart, "months").months + 1;

        const dailyArray = [];
        for (let i = 0; i < daysLength; i++) {
          dailyArray.push({
            date: dayStart.plus({ days: i }).toISODate() ?? "", // force string
            data: 0, // for total/focus
          });
        }

        const weeklyArray = [];
        for (let i = 0; i < weeksLength; i++) {
          weeklyArray.push({
            date: weekStart.plus({ weeks: i }).toISODate() ?? "",
            data: 0,
          });
        }

        const monthlyArray = [];
        for (let i = 0; i < monthsLength; i++) {
          monthlyArray.push({
            date: monthStart.plus({ months: i }).toISODate() ?? "",
            data: 0,
          });
        }

        const day: TimePeriodData = {
          timeline: dailyArray.map((val) => ({
            date: val.date,
            data: [] as TimeRange[],
          })),
          total: dailyArray.map((val) => ({ date: val.date, data: val.data })),
          focus: dailyArray.map((val) => ({ date: val.date, data: val.data })),
        };

        const week: TimePeriodData = {
          timeline: weeklyArray.map((val) => ({
            date: val.date,
            data: [] as TimeRange[],
          })),
          total: weeklyArray.map((val) => ({ date: val.date, data: val.data })),
          focus: weeklyArray.map((val) => ({ date: val.date, data: val.data })),
        };

        const month: TimePeriodData = {
          timeline: monthlyArray.map((val) => ({
            date: val.date,
            data: [] as TimeRange[],
          })),
          total: monthlyArray.map((val) => ({
            date: val.date,
            data: val.data,
          })),
          focus: monthlyArray.map((val) => ({
            date: val.date,
            data: val.data,
          })),
        };

        const newSubject: Subject = {
          ...response.data!.subject,
          timeline: [],
          day,
          week,
          month,
        };

        setTimeout(() => {
          emitter.emit("addedSubject", newSubject);
        }, 1000);

        newSubjects.push(newSubject);
        return newSubjects;
      });
    },
    [setCurrentStep],
  );

  useEffect(() => {
    if (currentTour === "newUser" && currentStep !== 3) {
      setAddSubjectModal((prev) => ({ ...prev, opened: false }));
    }
  }, [currentStep, currentTour]);

  return (
    <Credenza
      open={addSubjectModal.opened}
      onOpenChange={(opened) => {
        setAddSubjectModal((prev) => ({ ...prev, opened }));
      }}>
      <CredenzaContent desktopClassName="!max-w-100" id="tour1-step3">
        <CredenzaHeader className="justify-self-center">
          <CredenzaTitle className="text-2xl">Add Subject</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 flex flex-col">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingLabelInput
                        placeholder="Name"
                        label="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <ColorPicker
                        color={color}
                        setColor={(newColor) =>
                          form.setValue("color", newColor, {
                            shouldValidate: true,
                          })
                        }
                        options={["solid"]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
