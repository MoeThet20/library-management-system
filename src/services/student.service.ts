import {
  STUDENT_REGISTER_TYPE,
  STUDENT_UPDATE_TYPE,
} from "@/initialValues/student";
import { lmsClient } from "./api";

const STUDENT = "student";

export const studentRegister = async (data: STUDENT_REGISTER_TYPE) => {
  const { name, roleNumber, initialYear, currentYear, phoneNumber } = data;

  const res = await lmsClient.post(STUDENT, {
    name,
    roleNumber,
    initialYear,
    currentYear,
    phoneNumber,
  });
  return res;
};

export const studentUpdate = async (data: STUDENT_UPDATE_TYPE) => {
  const { id, name, roleNumber, initialYear, currentYear, phoneNumber } = data;

  const res = await lmsClient.patch(`${STUDENT}/${id}`, {
    name,
    roleNumber,
    initialYear,
    currentYear,
    phoneNumber,
  });

  return res;
};

export const getStudentWithQuery = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) => {
  const res = await lmsClient.get(
    `${STUDENT}?page=${page}&pageSize=${pageSize}&search={${search}}`
  );
  return res?.data;
};

export const studentDelete = async (id: string) =>
  await lmsClient.delete(`${STUDENT}/${id}`);
