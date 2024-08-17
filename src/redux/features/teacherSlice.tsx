import { createSlice } from "@reduxjs/toolkit";

type ListType = {
  id: string;
  email: string;
  name: string;
  occupation: string;
  rfid: string;
  createdDate: string;
  phoneNumber: string;
};

interface TeacherInterface {
  selectedTeacher: ListType | null;
}

const initialState: TeacherInterface = {
  selectedTeacher: null,
};

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    updatedSelectedTeacher: (state, action) => {
      state.selectedTeacher = action.payload;
    },
  },
});

export const { updatedSelectedTeacher } = teacherSlice.actions;

export default teacherSlice.reducer;
