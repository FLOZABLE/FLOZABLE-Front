import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "./accountHooks";
import { useCallback } from "react";
import { calculateTimeToMidnight, updateQueryData } from "@/utils/tools";
import { getSubjects } from "@/apis/subjectsApi";
import { GroupedSubjects, Subject, SubjectsResponse } from "@/types/subject";

const defaultGroupedSubjects: GroupedSubjects = {
  day: { timeline: [], total: [], focus: [] },
  week: { timeline: [], total: [], focus: [] },
  month: { timeline: [], total: [], focus: [] },
};

export function useSubjects() {
  const queryClient = useQueryClient();

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

  const updateSubjects = useCallback(async (newData: Subject[]) => {
    await queryClient.setQueryData(
      ["subjects"],
      (oldData: SubjectsResponse | undefined) => {
        return updateQueryData(oldData, newData, "subjects");
      }
    );
  }, []);

  return {
    subjects,
    groupedSubjects,
    subjectsData,
    subjectsRefetch,
    subjectsIsLoading,
    updateSubjects,
    ...queryResult,
  };
}

/* function useSubjectUsers(subjectId) {
  const queryClient = useQueryClient();

  const queryResult = useQuery({
    queryKey: [`useSubjectUsers`, subjectId],
    queryFn: () => getSubjectUsers(subjectId),
    staleTime: 1000 * 60 * 10,
    enabled: !!false,
  });

  const clearSubjectUsers = () => {
    queryClient.resetQueries({ queryKey: ["useSubjectUsers", subjectId] });
  };

  const {
    data: subjectUsersData,
    refetch: subjectUsersRefetch,
    isLoading: subjectUsersIsLoading,
  } = queryResult;

  return {
    subjectUsersData,
    subjectUsersRefetch,
    subjectUsersIsLoading,
    clearSubjectUsers,
    ...queryResult,
  };
} */
