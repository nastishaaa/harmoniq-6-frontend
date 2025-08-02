import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearUserData(state) {
      state.name = "";
      state.email = "";
      state.password = "";
    },
  },
});

export const { setUserData, clearUserData } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
