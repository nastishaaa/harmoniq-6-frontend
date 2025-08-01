import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAuthorArticles = createAsyncThunk(
  "authorArticles/fetchAuthorArticles",
  async ({ authorId, page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://harmoniq-6.onrender.com/users/${authorId}/articles?page=${page}&perPage=${perPage}`
      );

      console.log("✅ articles response:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ fetchAuthorArticles error:", err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
