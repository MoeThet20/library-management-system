import { createSlice } from "@reduxjs/toolkit";

type ListType = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  categories: Array<string>;
  description: string;
  publicationDate: string;
  amount: number;
  place: string;
  createdBy: string;
  createdDate: string;
  teacherId: string;
};

interface BookInterface {
  selectedBook: ListType | null;
}

const initialState: BookInterface = {
  selectedBook: null,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    updatedSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
});

export const { updatedSelectedBook } = bookSlice.actions;

export default bookSlice.reducer;
