import { PutSubjectResponse, SubjectsResponse } from "@/types/subject";
import AxiosInstance from "@/utils/axiosInstance";
import { getTimezone, requestHandler } from "@/utils/tools";

export async function getSubjects(): Promise<SubjectsResponse> {
  const timezone = getTimezone();
  return requestHandler(
    AxiosInstance.get(`/subjects`, { params: { timezone } })
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
    AxiosInstance.put(`/subjects/subject`, {
      name,
      color,
    })
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
    AxiosInstance.patch(`/subjects/subject`, {
      subject_id: subjectId,
      name,
      color,
    })
  );
}

export async function deleteSubjectsSubject(subjectId: string) {
  return requestHandler(
    AxiosInstance.delete(`/subjects/subject`, {
      data: { subject_id: subjectId },
    })
  );
}

export async function getSubjectUsers(subjectId: string) {
  return requestHandler(
    AxiosInstance.get(`/subjects/subject/users`, {
      params: { subject_id: subjectId },
    })
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
    AxiosInstance.post(`/subjects/subject/share`, {
      subject_id: subjectId,
      users,
    })
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
    AxiosInstance.delete(`/subjects/subject/share`, {
      data: { subject_id: subjectId, target_id: targetId },
    })
  );
}
