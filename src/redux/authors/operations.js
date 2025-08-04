import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAuthors = createAsyncThunk('authors/fetchAll', async ({ page = 1 }, thunkAPI) => {
  try {
    const response = await axios.get(`https://harmoniq-6.onrender.com/users?page=${page}`)
    return response.data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})
