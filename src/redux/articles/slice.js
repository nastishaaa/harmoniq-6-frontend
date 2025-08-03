import { createSlice } from "@reduxjs/toolkit";
import { fetchArticleById, fetchArticles } from "./operations";
const initialState = {
  items: [],
  total: 0,
  hasNextPage: false,
  page: 1,
  selectedArticle: null,
  isLoadingArticles: false,
  isErrorArticles: false,
  isLoadingArticle: false,
  isErrorArticle: false,
};

const slice = createSlice({
  name: "articles",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoadingArticles = true;
        state.isErrorArticles = false;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoadingArticles = false;
        state.total = action.payload.total;
        state.hasNextPage = action.payload.hasNextPage;
        state.page = action.payload.page;
        if (action.payload.page === 1) {
          state.items = action.payload.data;
        } else {
          state.items = [...state.items, ...action.payload.data];
        }
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.isLoadingArticles = false;
        state.isErrorArticles = true;
      })
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoadingArticle = true;
        state.isErrorArticle = false;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.isLoadingArticle = false;
        state.selectedArticle = action.payload.data;
      })
      .addCase(fetchArticleById.rejected, (state) => {
        state.selectedArticle = null;
        state.isLoadingArticle = false;
        state.isErrorArticle = true;
      });
  },
});

export default slice.reducer;
