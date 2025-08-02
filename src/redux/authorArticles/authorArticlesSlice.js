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
    resetAuthorArticles: () => ({
      items: [],
      isLoading: false,
      error: null,
      page: 1,
      perPage: 12,
      hasMore: true,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuthorArticles.fulfilled, (state, action) => {
        const { data, pagination } = action.payload || {};
        if (!Array.isArray(data)) return;

        // ✅ Debug: перевіряємо, що приходить і що оновлюється
        console.log("Fetched articles page:", pagination.page);
        console.log("Articles received:", data.length);
        console.log("Current items length before:", state.items.length);

        state.items.push(...data);
        state.page = pagination.page + 1;
        state.hasMore = pagination.hasMore;
        state.isLoading = false;

        console.log("Current items length after:", state.items.length);
        console.log("Next page to fetch will be:", state.page);
      })

      .addCase(fetchAuthorArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error fetching author articles";
      });
  },
});

export const { resetAuthorArticles } = authorArticlesSlice.actions;
export default authorArticlesSlice.reducer;
