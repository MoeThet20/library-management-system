import { RETURN_BOOK_TYPE } from "@/initialValues/borrow";
import { lmsClient } from "./api";

const RETURN = "return";

export const returnBookCreate = async (data: RETURN_BOOK_TYPE) => {
  const res = await lmsClient.post(RETURN, {
    data,
  });
  return res;
};

export const getReturnBookWithQuery = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) => {
  const res = await lmsClient.get(
    `${RETURN}?page=${page}&pageSize=${pageSize}&search={${search}}`
  );
  return res?.data;
};
