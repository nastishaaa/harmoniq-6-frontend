import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles/slice";
import { homeDataReducer } from "./homeData/slice";
import globalReducer from "./global/slice";
import { registerReducer } from "./register/slice";
import userReducer from "./user/userSlice";
import authorArticlesReducer from "./authorArticles/authorArticlesSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    articles: articlesReducer,
    homeData: homeDataReducer,
    register: registerReducer,
    user: userReducer,
    authorArticles: authorArticlesReducer,
  },
});
