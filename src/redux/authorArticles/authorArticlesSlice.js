import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthorArticles } from "./authorArticlesOperations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  page: 1,
  perPage: 12,
  hasMore: true,
};

const authorArticlesSlice = createSlice({
  name: "authorArticles",
  initialState,
  reducers: {
    resetAuthorArticles: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuthorArticles.fulfilled, (state, action) => {
        const { data, pagination } = action.payload || {};
        if (!Array.isArray(data)) return; // safety

        state.items.push(...data);
        state.page = pagination.page + 1;
        state.hasMore = pagination.hasMore;
        state.isLoading = false;
      })

      .addCase(fetchAuthorArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error fetching author articles";
      });
  },
});

export const { resetAuthorArticles } = authorArticlesSlice.actions;
export default authorArticlesSlice.reducer;
