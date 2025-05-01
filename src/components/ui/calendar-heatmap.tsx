"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { Calendar } from "./calendar";

// type utilities
type UnionKeys<T> = T extends T ? keyof T : never;
type Expand<T> = T extends T ? { [K in keyof T]: T[K] } : never;
type OneOf<T extends object[]> = {
  [K in keyof T]: Expand<
    T[K] & Partial<Record<Exclude<UnionKeys<T[number]>, keyof T[K]>, never>>
  >;
}[number];

// types
export type Classname = string;
export type WeightedDateEntry = {
  date: Date;
  weight: number;
};

interface IDatesPerVariant {
  datesPerVariant: Date[][];
}
interface IWeightedDatesEntry {
  weightedDates: WeightedDateEntry[];
}

type VariantDatesInput = OneOf<[IDatesPerVariant, IWeightedDatesEntry]>;

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  variantClassnames: Classname[];
} & VariantDatesInput;

/// utlity functions
function useModifers(
  variantClassnames: Classname[],
  datesPerVariant: Date[][]
): [Record<string, Date[]>, Record<string, string>] {
  const noOfVariants = variantClassnames.length;

  const variantLabels = [...Array(noOfVariants)].map(
    (_, idx) => `__variant${idx}`
  );

  const modifiers = variantLabels.reduce((acc, key, index) => {
    acc[key] = datesPerVariant[index];
    return acc;
  }, {} as Record<string, Date[]>);

  const modifiersClassNames = variantLabels.reduce((acc, key, index) => {
    acc[key] = variantClassnames[index];
    return acc;
  }, {} as Record<string, string>);

  return [modifiers, modifiersClassNames];
}

function categorizeDatesPerVariant(
  weightedDates: WeightedDateEntry[],
  noOfVariants: number
) {
  const sortedEntries = weightedDates.sort((a, b) => a.weight - b.weight);

  const categorizedRecord = [...Array(noOfVariants)].map(() => [] as Date[]);

  const minNumber = sortedEntries[0].weight;
  const maxNumber = sortedEntries[sortedEntries.length - 1].weight;
  const range =
    minNumber == maxNumber ? 1 : (maxNumber - minNumber) / noOfVariants;

  sortedEntries.forEach((entry) => {
    const category = Math.min(
      Math.floor((entry.weight - minNumber) / range),
      noOfVariants - 1
    );
    categorizedRecord[category].push(entry.date);
  });

  return categorizedRecord;
}

function CalendarHeatmap({
  variantClassnames,
  datesPerVariant,
  weightedDates,
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const noOfVariants = variantClassnames.length;

  weightedDates = weightedDates ?? [];
  datesPerVariant =
    datesPerVariant ?? categorizeDatesPerVariant(weightedDates, noOfVariants);

  const [modifiers, modifiersClassNames] = useModifers(
    variantClassnames,
    datesPerVariant
  );

  return (
    <Calendar
    numberOfMonths={5}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      showOutsideDays={showOutsideDays}
    />
  );
}
CalendarHeatmap.displayName = "CalendarHeatmap";

export { CalendarHeatmap };
