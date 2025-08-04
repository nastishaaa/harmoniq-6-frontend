import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addArticle = createAsyncThunk(
  'articles/addArticle',
  async (formData, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.authorization.token;
      const user = state.authorization.user;

      formData.append('authorName', user.name);
      const response = await axios.post('https://harmoniq-6.onrender.com/articles', formData, {
        headers: { 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, 
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);