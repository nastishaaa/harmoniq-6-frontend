import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchHomeArticles, fetchTopCreators } from "./operations";

const initialState = {
    popularArticles: [],
    topCreators: [],
    isLoading: false,
    isError: false,
};

const slice = createSlice({
    name: "homeData",
    initialState: initialState,
    extraReducers: (builder) => { 
        builder.addCase(fetchHomeArticles.fulfilled, (state, action) => {
            state.popularArticles = action.payload;
        }).addCase(fetchTopCreators.fulfilled, (state, payload) => {
            state.topCreators = payload.payload;
        }).addMatcher(isAnyOf(fetchHomeArticles.pending, fetchTopCreators.pending), (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addMatcher(isAnyOf(fetchHomeArticles.fulfilled, fetchTopCreators.fulfilled), (state) => {
            state.isLoading = false;
        }).addMatcher(isAnyOf(fetchHomeArticles.rejected, fetchTopCreators.rejected), (state) => { 
            state.isLoading = false;
            state.isError = true;
        })
    },
});

export const homeDataReducer = slice.reducer;