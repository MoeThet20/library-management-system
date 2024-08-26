import { RETURN_BOOK_TYPE } from "@/initialValues/borrow";
import { lmsClient } from "./api";
import { store } from "@/redux/store";

import { convertDateString, YEAR_MONTH_DAY } from "@/const";
import dayjs from "dayjs";

const RETURN = "return";

export const returnBookCreate = async (data: RETURN_BOOK_TYPE) => {
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
  startDate: Date = new Date(dayjs().subtract(1, "day").format(YEAR_MONTH_DAY)),
  endDate: Date = new Date(dayjs().add(1, "day").format(YEAR_MONTH_DAY))
) => {
  const convertedStartDate = convertDateString(startDate, YEAR_MONTH_DAY);
  const convertedEndDate = convertDateString(endDate, YEAR_MONTH_DAY);

  const res = await lmsClient.get(
    `${RETURN}?page=${page}&pageSize=${pageSize}&startDate=${convertedStartDate}&endDate=${convertedEndDate}`
  );
  return res?.data;
};
