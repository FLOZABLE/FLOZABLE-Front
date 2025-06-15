"use client";

import { putSubject } from "@/apis/subjectApi";
import { useSubjectsUpdater } from "@/hooks/updaters/subjectUpdaters";
import {
  putSubjectSchema,
  PutSubjectSchemaValues,
} from "@/schemas/subjectSchemas";
import { Subject } from "@/types/subjectTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import { useNextStep } from "nextstepjs";
import { useCallback } from "react";
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
  const { setCurrentStep } = useNextStep();

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

  const onSubmit = useCallback(async (values: PutSubjectSchemaValues) => {
    const response = await putSubject(values);
    if (!response.success || !response.data?.subject) return;

    setAddSubjectModal((prev) => ({ ...prev, opened: false }));

    setCurrentStep(3);

    form.reset();

    updateSubjects((prev) => {
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
          date: dayStart.plus({ day: i }).toISODate(),
          data: 0,
        });
      }

      const weeklyArray = [];
      for (let i = 0; i < weeksLength; i++) {
        weeklyArray.push({
          date: weekStart.plus({ week: i }).toISODate(),
          data: 0,
        });
      }

      const monthlyArray = [];
      for (let i = 0; i < monthsLength; i++) {
        monthlyArray.push({
          date: monthStart.plus({ month: i }).toISODate(),
          data: 0,
        });
      }

      const day = {
        timeline: structuredClone(
          dailyArray.map((val) => ({ ...val, data: [] })),
        ),
        total: structuredClone(dailyArray),
        focus: structuredClone(dailyArray),
      };

      const week = {
        timeline: structuredClone(
          weeklyArray.map((val) => ({ ...val, data: [] })),
        ),
        total: structuredClone(weeklyArray),
        focus: structuredClone(weeklyArray),
      };

      const month = {
        timeline: structuredClone(
          monthlyArray.map((val) => ({ ...val, data: [] })),
        ),
        total: structuredClone(monthlyArray),
        focus: structuredClone(monthlyArray),
      };

      const newSubject: Subject = {
        ...response.data!.subject,
        timeline: [],
        day,
        week,
        month,
      };
      newSubjects.push(newSubject);
      return newSubjects;
    });
  }, []);

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
