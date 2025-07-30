import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global/slice";
import articlesReducer from "./articles/slice";
import { registerReducer } from "./register/slice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    articles: articlesReducer,
    register: registerReducer,
  },
});
