import AxiosInstance from "@/lib/axiosInstance";
import { getTimezone, requestHandler } from "@/lib/utils";
import { PutSubjectResponse, SubjectsResponse } from "@/types/subjectTypes";

export async function getSubjects(): Promise<SubjectsResponse> {
  const timezone = getTimezone();
  return requestHandler(
    AxiosInstance.get(`/subject/all`, { params: { timezone } }),
  );
}

type PutSubjectParams = {
  name: string;
  color: string;
};
export async function putSubject({
  name,
  color,
}: PutSubjectParams): Promise<PutSubjectResponse> {
  return requestHandler(
    AxiosInstance.put(`/subject`, {
      name,
      color,
    }),
  );
}

type PatchSubjectParams = {
  subjectId: string;
  name: string;
  color: string;
};
export async function patchSubject({
  subjectId,
  name,
  color,
}: PatchSubjectParams) {
  return requestHandler(
    AxiosInstance.patch(`/subject`, {
      subject_id: subjectId,
      name,
      color,
    }),
  );
}

export async function deleteSubjectsSubject(subjectId: string) {
  return requestHandler(
    AxiosInstance.delete(`/subject`, {
      data: { subject_id: subjectId },
    }),
  );
}

export async function getSubjectUsers(subjectId: string) {
  return requestHandler(
    AxiosInstance.get(`/subject/users`, {
      params: { subject_id: subjectId },
    }),
  );
}

type PostSubjectShareParams = {
  subjectId: string;
  users: string[];
};
export async function postSubjectShare({
  subjectId,
  users,
}: PostSubjectShareParams) {
  return requestHandler(
    AxiosInstance.post(`/subject/share`, {
      subject_id: subjectId,
      users,
    }),
  );
}

type DeleteSubjectShareParams = {
  subjectId: string;
  targetId: string;
};
export async function deleteSubjectShare({
  subjectId,
  targetId,
}: DeleteSubjectShareParams) {
  return requestHandler(
    AxiosInstance.delete(`/subject/share`, {
      data: { subject_id: subjectId, target_id: targetId },
    }),
  );
}
