import { createSlice } from "@reduxjs/toolkit";

interface MessageModalInterface {
  message: string;
  isError: boolean;
  isOpenModal: boolean;
}

const initialState: MessageModalInterface = {
  message: "",
  isError: false,
  isOpenModal: false,
};

export const messageModalSlice = createSlice({
  name: "messageModal",
  initialState,
  reducers: {
    enableMessageModal: (state, action) => {
      state.message = action.payload;
      state.isOpenModal = true;
    },
    enableErrorMessageModal: (state, action) => {
      state.message = action.payload;
      state.isError = true;
      state.isOpenModal = true;
    },
    disableMessageModal: (state) => {
      state.message = initialState.message;
      state.isError = initialState.isError;
      state.isOpenModal = initialState.isOpenModal;
    },
  },
});

export const {
  enableMessageModal,
  enableErrorMessageModal,
  disableMessageModal,
} = messageModalSlice.actions;

export default messageModalSlice.reducer;
