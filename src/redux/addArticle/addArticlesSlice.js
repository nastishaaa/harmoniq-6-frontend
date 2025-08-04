import { createSlice } from '@reduxjs/toolkit';
import { addArticle } from './addArticleOperations';

const initialState = {
  isLoading: false,
  error: null,
  article: null,
};

const articlesSlice = createSlice({
  name: 'addArticles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = action.payload;
      })
      .addCase(addArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export  const  addArticlesReducer = articlesSlice.reducer;