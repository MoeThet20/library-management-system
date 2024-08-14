import { BORROW_BOOK_TYPE } from "@/initialValues/borrow";
import { lmsClient } from "./api";

const BORROW = "borrow";

export const borrowBookCreate = async (data: BORROW_BOOK_TYPE) => {
  const res = await lmsClient.post(BORROW, {
    data,
  });
  return res;
};

export const getBorrowBookWithQuery = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) => {
  const res = await lmsClient.get(
    `${BORROW}?page=${page}&pageSize=${pageSize}&search={${search}}`
  );
  return res?.data;
};
