import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './global/slice'
import articlesReducer from './articles/slice'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    articles: articlesReducer,
  },
})
