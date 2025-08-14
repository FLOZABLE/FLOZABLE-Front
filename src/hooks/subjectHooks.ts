import { getSubjects } from "@/apis/subjectApi";
import { calculateTimeToMidnight } from "@/lib/utils";
import { GroupedSubjects } from "@/types/subjectTypes";
import { useQuery } from "@tanstack/react-query";

import { useAccount } from "./accountHooks";

const defaultGroupedSubjects: GroupedSubjects = {
  day: { timeline: [], total: [], focus: [] },
  week: { timeline: [], total: [], focus: [] },
  month: { timeline: [], total: [], focus: [] },
};

export function useSubjects() {
  const { account } = useAccount();

  const queryResult = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    staleTime: 1000 * 60 * 10,
    enabled: !!account,
    select: (response) => ({
      subjects: response.data?.subjects ?? [],
      grouped_subjects:
        response.data?.grouped_subjects ?? defaultGroupedSubjects,
    }),
    placeholderData: () => ({
      data: {
        subjects: [],
        grouped_subjects: defaultGroupedSubjects,
      },
      status: 200,
      success: true,
    }),
    refetchIntervalInBackground: true,
    refetchInterval: calculateTimeToMidnight,
  });

  const {
    data: subjectsData,
    refetch: subjectsRefetch,
    isLoading: subjectsIsLoading,
  } = queryResult;

  const subjects = subjectsData?.subjects;
  const groupedSubjects = subjectsData?.grouped_subjects;

  return {
    subjects,
    groupedSubjects,
    subjectsData,
    subjectsRefetch,
    subjectsIsLoading,
    ...queryResult,
  };
}
