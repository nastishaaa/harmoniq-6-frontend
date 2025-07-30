import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const setAuthHeader = (value) => {
  axios.defaults.headers.common.Authorization = value;
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
        const response = await axios.post("/api/auth/login", credentials);
    // const response = await axios.post("/user/login", credentials);check
      setAuthHeader(`Bearer ${response.data.data.token}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);