import { BORROW_BOOK_TYPE } from "@/initialValues/borrow";
import { lmsClient } from "./api";
import { convertDateString, YEAR_MONTH_DAY } from "@/const";
import dayjs from "dayjs";
import { enableLoadingModal } from "@/redux/features/loadingSlice";
import { store } from "@/redux/store";

const BORROW = "borrow";

export const borrowBookCreate = async (data: BORROW_BOOK_TYPE) => {
  store.dispatch(enableLoadingModal());
  const res = await lmsClient.post(BORROW, {
    books: data.books,
    studentId: data.studentId,
    teacherId: data.teacherId,
  });
  return res;
};

export const getBorrowBookWithQuery = async (
  page: number = 1,
  pageSize: number = 10,
  startDate: Date = new Date(dayjs().subtract(1, "day").format(YEAR_MONTH_DAY)),
  endDate: Date = new Date()
) => {
  const convertedStartDate = convertDateString(startDate, YEAR_MONTH_DAY);
  const convertedEndDate = convertDateString(endDate, YEAR_MONTH_DAY);

  const res = await lmsClient.get(
    `${BORROW}?page=${page}&pageSize=${pageSize}&startDate=${convertedStartDate}&endDate=${convertedEndDate}`
  );
  return res?.data;
};

export const getAllBorrowBook = async () => {
  const res = await lmsClient.get(`${BORROW}`);
  return res?.data;
};
