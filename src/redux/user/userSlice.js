import { createSlice } from "@reduxjs/toolkit";
import { fetchCreatedArticles, fetchSavedArticles } from "./userOperations";

const initialState = {
  currentUser: null,
  createdArticles: [],
  savedArticles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatedArticles.fulfilled, (state, action) => {
        state.createdArticles = action.payload;
      })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.savedArticles = action.payload;
      });
  },
});
export default userSlice.reducer;
