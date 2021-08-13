import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./CreateSlice";

export const store = configureStore({
  reducer: { chatReducer }
});
