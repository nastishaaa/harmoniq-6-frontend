import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const saveArticleThunk = createAsyncThunk(
  "user/saveArticle",
  async (articleId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.authorization.token;

      const response = await axios.post(
        `https://harmoniq-6.onrender.com/users/me/saved-articles/${articleId}`,
        null, // немає body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const removeSavedArticleThunk = createAsyncThunk(
  "user/removeSavedArticle",
  async (articleId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.authorization.token;

      const response = await axios.delete(
        `https://harmoniq-6.onrender.com/users/me/saved-articles/${articleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getSavedArticlesThunk = createAsyncThunk(
  "user/getSavedArticles",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.authorization.token;

      const response = await axios.get(
        `https://harmoniq-6.onrender.com/users/me/saved-articles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      return response.data.data; // тут масив збережених статей
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
