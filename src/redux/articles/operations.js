import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArticles = createAsyncThunk(
  "articles/fetchAll",
  async ({ page = 1, perPage = 12, filter = "all" }, thunkAPI) => {
    try {
      const params = { page, perPage };

      if (filter === "popular") {
        params.sortBy = "rate";
        params.sortOrder = "desc";
      }
      const response = await axios.get(
        "https://harmoniq-6.onrender.com/articles",
        {
          params,
        }
      );
      return {
        data: response.data?.data?.data ?? [],
        page: response.data?.data?.page ?? 1,
        total: response.data?.data?.totalItems ?? 0,
        hasNextPage: response.data?.data?.hasNextPage ?? false,
      };
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
