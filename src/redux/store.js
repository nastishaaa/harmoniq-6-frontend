import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles/slice";
import { homeDataReducer } from "./homeData/slice";
import globalReducer from "./global/slice";
import userReducer from "./user/userSlice";
import authorArticlesReducer from "./authorArticles/authorArticlesSlice";
// import { authReducer } from "./auth/slice.js";
// import { registerReducer } from "./register/slice.js";
import { authorizationReducer } from "./authorization/slice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { addArticlesReducer } from "./addArticle/addArticlesSlice.js";

const authPersistConfig = {
    key: 'authorization',
    storage,
    whitelist: ['token', 'user'],
};

export const store = configureStore({
  reducer: {
    global: globalReducer,
    addArticles: addArticlesReducer,
    articles: articlesReducer,
    homeData: homeDataReducer,
    authorization: persistReducer(authPersistConfig, authorizationReducer),
    // auth: authReducer,
    // register: registerReducer,
    user: userReducer,
    authorArticles: authorArticlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});

export const persistor = persistStore(store);