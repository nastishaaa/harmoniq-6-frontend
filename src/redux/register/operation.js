import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const API = axios.create({
  baseURL: 'https://harmoniq-6.onrender.com',
});




export const registerThunk = createAsyncThunk('register', async (body, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('name', body.name);
    formData.append('email', body.email);
      formData.append('password', body.password);

    const response = await API.post('/auth/register', formData);
    
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});
