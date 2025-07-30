import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles/slice";
import { homeDataReducer } from "./homeData/slice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    homeData: homeDataReducer,
  },
 });
