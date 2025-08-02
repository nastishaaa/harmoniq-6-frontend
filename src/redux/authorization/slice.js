import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, logoutThunk, refresh, registerThunk } from "./operations";

const initialState = {
    user: {
        name: "",
        email: "",
        avatarUrl: null,
    },
    token: '',
    isLoggedIn: false,
    isRefreshing: false,
};

const handlePending = (state, action) => {
    state.isRefreshing = true;
}

const handleRejected = (state, action) => {
    state.isRefreshing = false;
}

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setUserData(state, action) {
        state.user = action.payload;
    },
    clearUserData(state) {
        state.user = {
            name: "",
            email: "",
            avatar: "",
        }
      },
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    },
    extraReducers: builder => 
        builder
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = {
                    name: "",
                    email: "",
                    avatar: "",
                }
                state.isLoggedIn = false;
                state.isRefreshing = false;
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addMatcher(isAnyOf(registerThunk.pending, login.pending, logoutThunk.pending, refresh.pending), 
                (state, action) => {
                    handlePending(state, action);
            })
            .addMatcher(isAnyOf(registerThunk.rejected, login.rejected, logoutThunk.rejected, refresh.rejected), 
                (state, action) => {
                    handleRejected(state, action);
                })
});
        
export const { setUserData, clearUserData, setAuth } = authSlice.actions;

export const authorizationReducer = authSlice.reducer;
