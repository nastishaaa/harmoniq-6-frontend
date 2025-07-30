import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchHomeArticles } from "./operations";

const initialState = {
    popularArticles: [],
    isLoading: false,
    isError: false,
};

const slice = createSlice({
    name: "homeData",
    initialState: initialState,
    extraReducers: (builder) => { 
        builder.addCase(fetchHomeArticles.fulfilled, (state, action) => {
            state.popularArticles = action.payload;
        }).addMatcher(isAnyOf(fetchHomeArticles.pending), (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addMatcher(isAnyOf(fetchHomeArticles.fulfilled), (state) => {
            state.isLoading = false;
        }).addMatcher(isAnyOf(fetchHomeArticles.rejected), (state) => { 
            state.isLoading = false;
            state.isError = true;
        })
    },
});

export const homeDataReducer = slice.reducer;