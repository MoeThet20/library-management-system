import {
  TEACHER_REGISTER_TYPE,
  TEACHER_UPDATE_TYPE,
} from "@/initialValues/teacher";
import { lmsClient } from "./api";

const TEACHER = "teacher";

export const teacherRegister = async (data: TEACHER_REGISTER_TYPE) => {
  const res = await lmsClient.post(TEACHER, {
    name: data.name,
    email: data.email,
    rfid: data.rfid,
    phoneNumber: data.phoneNumber,
    occupation: data.occupation,
    password: data.password,
  });
  return res;
};

export const teacherUpdate = async (data: TEACHER_UPDATE_TYPE) => {
  const res = await lmsClient.patch(`${TEACHER}/${data.id}`, {
    name: data.name,
    rfid: data,
    phoneNumber: data.phoneNumber,
    occupation: data.occupation,
  });

  return res;
};

export const getTeacherWithQuery = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) => {
  const res = await lmsClient.get(
    `${TEACHER}?page=${page}&pageSize=${pageSize}&search={${search}}`
  );
  return res?.data;
};

export const teacherDelete = async (id: string) =>
  await lmsClient.delete(`${TEACHER}/${id}`);
