export type BOOK_CREATE_TYPE = {
  title: string;
  author: string;
  isbn: string;
  categories: Array<String>;
  description: string;
  publication_date: Date;
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
  publication_date: new Date(),
  amount: 0,
  place: "",
  teacherId: "",
};

export type BOOK_UPDATE_TYPE = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  categories: Array<String>;
  description: string;
  publication_date: Date;
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
  publication_date: new Date(),
  amount: 0,
  place: "",
  teacherId: "",
};
