import {
  CATEGORY_CREATE_TYPE,
  CATEGORY_UPDATE_TYPE,
} from "@/initialValues/category";
import { lmsClient } from "./api";

const CATEGORY = "category";

export const categoryCreate = async (data: CATEGORY_CREATE_TYPE) => {
  const res = await lmsClient.post(CATEGORY, {
    category: data.category,
    teacherId: data.teacherId,
  });
  return res;
};

export const categoryUpdate = async (data: CATEGORY_UPDATE_TYPE) => {
  const res = await lmsClient.patch(`${CATEGORY}/${data.id}`, {
    category: data.category,
  });

  return res;
};

export const getCategoryWithQuery = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) => {
  const res = await lmsClient.get(
    `${CATEGORY}?page=${page}&pageSize=${pageSize}&search={${search}}`
  );
  return res?.data;
};

export const categoryDelete = async (id: string) =>
  await lmsClient.delete(`${CATEGORY}/${id}`);
