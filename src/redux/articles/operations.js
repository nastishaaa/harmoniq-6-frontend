import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArticles = createAsyncThunk(
  "articles/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://harmoniq-6.onrender.com/articles"
      );
      return response.data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const fetchArticleById = createAsyncThunk(
  "articles/fetchArticleById",
  async (articleId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://harmoniq-6.onrender.com/articles/${articleId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
