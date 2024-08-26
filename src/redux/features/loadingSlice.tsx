import { createSlice } from "@reduxjs/toolkit";

interface LoadingInterface {
  isOpenLoading: boolean;
}

const initialState: LoadingInterface = {
  isOpenLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    enableLoadingModal: (state) => {
      state.isOpenLoading = true;
    },
    disableLoadingModal: (state) => {
      state.isOpenLoading = false;
    },
  },
});

export const { enableLoadingModal, disableLoadingModal } = loadingSlice.actions;

export default loadingSlice.reducer;
