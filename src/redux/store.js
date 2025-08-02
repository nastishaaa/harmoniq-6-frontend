import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles/slice";
import { homeDataReducer } from "./homeData/slice";
import globalReducer from "./global/slice";
import userReducer from "./user/userSlice";
import authorArticlesReducer from "./authorArticles/authorArticlesSlice";
import { authReducer } from "./auth/slice.js";
import { registerReducer } from "./register/slice.js";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    articles: articlesReducer,
    homeData: homeDataReducer,
    auth: authReducer,
    register: registerReducer,
    user: userReducer,
    authorArticles: authorArticlesReducer,
  },
});
