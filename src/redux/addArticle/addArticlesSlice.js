import { createSlice } from '@reduxjs/toolkit';
import { addArticle } from './addArticlesOperations.js';

const initialState = {
  isLoading: false,
  error: null,
  article: null,
};

const articlesSlice = createSlice({
  name: 'articles',
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

export  default  articlesSlice.reducer;