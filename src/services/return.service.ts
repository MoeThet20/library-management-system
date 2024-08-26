import { RETURN_BOOK_TYPE } from "@/initialValues/borrow";
import { lmsClient } from "./api";
import { store } from "@/redux/store";
import {
  disableLoadingModal,
  enableLoadingModal,
} from "@/redux/features/loadingSlice";

const RETURN = "return";

export const returnBookCreate = async (data: RETURN_BOOK_TYPE) => {
  store.dispatch(enableLoadingModal());
  const res = await lmsClient.post(RETURN, {
    books: data.books,
    borrowedIds: data.borrowedIds,
    studentId: data.studentId,
    teacherId: data.teacherId,
  });
  return res;
};

export const getReturnBookWithQuery = async (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) => {
  const res = await lmsClient.get(
    `${RETURN}?page=${page}&pageSize=${pageSize}&search=${search}`
  );
  return res?.data;
};
