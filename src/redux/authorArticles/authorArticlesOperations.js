import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAuthorArticles = createAsyncThunk(
  "authorArticles/fetchAuthorArticles",
  async ({ authorId, page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/users/authors/${authorId}/articles?page=${page}&perPage=${perPage}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
