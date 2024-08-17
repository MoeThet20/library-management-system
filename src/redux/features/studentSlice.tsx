import { createSlice } from "@reduxjs/toolkit";

type ListType = {
  id: string;
  name: string;
  roleNumber: string;
  phoneNumber: string;
  currentYear: string;
  initialYear: string;
  createdBy: string;
  createdDate: string;
  teacherId: string;
};

interface StudentInterface {
  selectedStudent: ListType | null;
}

const initialState: StudentInterface = {
  selectedStudent: null,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updatedSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
  },
});

export const { updatedSelectedStudent } = studentSlice.actions;

export default studentSlice.reducer;
