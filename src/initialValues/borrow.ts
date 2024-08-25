import { YEAR_MONTH_DAY } from "@/const";
import dayjs from "dayjs";

export type BORROW_BOOK_TYPE = {
  books: Array<String>;
  studentId: string;
  teacherId: string;
};

export type BORROW_BOOK_SEARCH_TYPE = {
  startDate: Date;
  endDate: Date;
};

export const BORROW_BOOK_SEARCH_INITIAL_VALUE = {
  startDate: new Date(dayjs().subtract(1, "day").format(YEAR_MONTH_DAY)),
  endDate: new Date(),
};

export type RETURN_BOOK_TYPE = {
  bookId: string;
  studentId: string;
  teacherId: string;
};
