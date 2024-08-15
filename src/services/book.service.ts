import { BOOK_CREATE_TYPE, BOOK_UPDATE_TYPE } from "@/initialValues/book";
import { lmsClient } from "./api";

const BOOK = "book";

export const bookCreate = async (data: BOOK_CREATE_TYPE) => {
  const res = await lmsClient.post(BOOK, {
    data,
  });
  return res;
};

export const bookUpdate = async (data: BOOK_UPDATE_TYPE) => {
  const res = await lmsClient.patch(`${BOOK}/${data.id}`, {
    data: { ...data, isBorrowAble: true }, //TODO need to add isBorrowAble logic
  });

  return res;
};

export const getBookWithQuery = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) => {
  const res = await lmsClient.get(
    `${BOOK}?page=${page}&pageSize=${pageSize}&search=${search}`
  );
  return res?.data;
};

export const bookDelete = async (id: string) =>
  await lmsClient.delete(`${BOOK}/${id}`);
