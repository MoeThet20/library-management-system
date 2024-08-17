import { createSlice } from "@reduxjs/toolkit";

type ListType = {
  id: string;
  category: string;
  createdBy: string;
  createdDate: string;
};

interface CategoryInterface {
  selectedCategory: ListType | null;
}

const initialState: CategoryInterface = {
  selectedCategory: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updatedSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { updatedSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
