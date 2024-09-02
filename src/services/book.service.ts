import {
  BOOK_CREATE_SERVICE_TYPE,
  BOOK_UPDATE_TYPE,
} from "@/initialValues/book";
import { lmsClient } from "./api";
import { setYearOnly } from "@/utils/helper";

const BOOK = "book";

export const bookCreate = async (data: BOOK_CREATE_SERVICE_TYPE) => {
  const res = await lmsClient.post(BOOK, {
    title: data.title,
    author: data.author,
    isbn: data.isbn.toLocaleLowerCase().trim(),
    categories: data.categories,
    description: data.description,
    publicationDate: data.disablePublication
      ? "N/A"
      : `${setYearOnly(data.publicationDateFromDate)}-${setYearOnly(
          data.publicationDateToDate
        )}`,
    amount: data.amount,
    place: data.place,
    teacherId: data.teacherId,
  });
  return res;
};

export const bookUpdate = async (data: BOOK_UPDATE_TYPE) => {
  const res = await lmsClient.patch(`${BOOK}/${data.id}`, {
    title: data.title,
    author: data.author,
    isbn: data.isbn.toLocaleLowerCase().trim(),
    categories: data.categories,
    description: data.description,
    publicationDate: data.disablePublication
      ? "N/A"
      : `${setYearOnly(data.publicationDateFromDate)}-${setYearOnly(
          data.publicationDateToDate
        )}`,
    amount: data.amount,
    place: data.place,
    teacherId: data.teacherId,
  });

  return res;
};

export const getBookWithQuery = async (
  page: number | null = 1,
  pageSize: number | null = 10,
  search: string = "",
  allSearch: boolean = false
) => {
  const res = await lmsClient.get(
    `${BOOK}?page=${page}&pageSize=${pageSize}&search=${search}&allSearch=${allSearch}`
  );
  return res?.data;
};

export const getBookWithQueryMoreFilter = async (
  page: number | null = 1,
  pageSize: number | null = 10,
  search: string = "",
  category: string = "all"
) => {
  const res = await lmsClient.get(
    `${BOOK}?page=${page}&pageSize=${pageSize}&search=${search}&category=${category}`
  );
  return res?.data;
};

export const bookDelete = async (id: string) =>
  await lmsClient.delete(`${BOOK}/${id}`);
