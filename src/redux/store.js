import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles/slice";
import userReducer from "./user/slice";
import authorArticlesReducer from "./authorArticles/authorArticlesSlice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    authorArticles: authorArticlesReducer,
    user: userReducer,
  },
});
