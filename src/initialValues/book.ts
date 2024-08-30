import { YEAR_MONTH_DAY } from "@/const";
import dayjs from "dayjs";

export type BOOK_CREATE_TYPE = {
  title: string;
  author: string;
  isbn: string;
  categories: Array<string>;
  description: string;
  publicationDateFromDate: Date;
  publicationDateToDate: Date;
  amount: number;
  place: string;
};

export type BOOK_CREATE_SERVICE_TYPE = {
  title: string;
  author: string;
  isbn: string;
  categories: Array<string>;
  description: string;
  publicationDateFromDate: Date;
  publicationDateToDate: Date;
  amount: number;
  place: string;
  teacherId: string;
};

export const BOOK_CREATE_INITIAL_VALUES = {
  title: "",
  author: "",
  isbn: "",
  categories: [],
  description: "",
  publicationDateFromDate: new Date(dayjs().subtract(1, "year").toString()),
  publicationDateToDate: new Date(),
  amount: 1,
  place: "",
};

export type BOOK_UPDATE_TYPE = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  categories: Array<String>;
  description: string;
  publicationDateFromDate: Date;
  publicationDateToDate: Date;
  amount: number;
  place: string;
  teacherId: string;
};
export const BOOK_UPDATE_INITIAL_VALUES = {
  id: "",
  title: "",
  author: "",
  isbn: "",
  categories: [],
  description: "",
  publicationDateFromDate: new Date(dayjs().subtract(1, "year").toString()),
  publicationDateToDate: new Date(),
  amount: 1,
  place: "",
  teacherId: "",
};
