import {
  BOOK_CREATE_SERVICE_TYPE,
  BOOK_UPDATE_TYPE,
} from "@/initialValues/book";
import { lmsClient } from "./api";

const BOOK = "book";

export const bookCreate = async (data: BOOK_CREATE_SERVICE_TYPE) => {
  const res = await lmsClient.post(BOOK, {
    title: data.title,
    author: data.author,
    isbn: data.isbn.toLocaleLowerCase().trim(),
    categories: data.categories,
    description: data.description,
    publicationDate: data.publicationDate,
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
    publicationDate: data.publicationDate,
    amount: data.amount,
    place: data.place,
    teacherId: data.teacherId,
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
