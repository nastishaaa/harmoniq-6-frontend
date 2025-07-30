import { createSlice } from "@reduxjs/toolkit";
import { registerThunk } from "./operation";

const initialState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
};

const slice = createSlice({
    name: 'register',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            });
    },
});
export const registerReducer = slice.reducer;