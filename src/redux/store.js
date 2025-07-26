import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles/slice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
 });
