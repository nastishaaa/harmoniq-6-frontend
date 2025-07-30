import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const homeDataAPI = axios.create({
    baseURL: 'https://harmoniq-6.onrender.com',
});

export const fetchHomeArticles = createAsyncThunk("homeData/fetchHomeArticles", async(_, { rejectWithValue }) => {
    try {
        const response = await homeDataAPI.get('/articles?page=1&perPage=4&sortBy=rate&sortOrder=desc');
        return response.data['data']['data'];
     } catch (e) {
        return rejectWithValue(e.message);
    }
});