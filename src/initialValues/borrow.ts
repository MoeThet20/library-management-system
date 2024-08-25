export type BORROW_BOOK_TYPE = {
  books: Array<String>;
  studentId: string;
  teacherId: string;
};

export type RETURN_BOOK_TYPE = {
  bookId: string;
  studentId: string;
  teacherId: string;
};
