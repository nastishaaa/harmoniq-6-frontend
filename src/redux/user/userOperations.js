import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../authorization/operations";

export const fetchCreatedArticles = createAsyncThunk(
  "user/fetchCreatedArticles",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/users/me/created-articles");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchSavedArticles = createAsyncThunk(
  "user/fetchSavedArticles",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/users/me/saved-articles");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
