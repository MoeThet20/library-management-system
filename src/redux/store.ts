import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import { storage } from "./storage";
import messageModalSlice from "./features/messageModalSlice";
import teacherSlice from "./features/teacherSlice";
import studentSlice from "./features/studentSlice";
import categorySlice from "./features/categorySlice";

const reducers = combineReducers({
  messageModal: messageModalSlice,
  teacher: teacherSlice,
  student: studentSlice,
  category: categorySlice,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["teacher", "student", "category"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }).concat(thunk),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
