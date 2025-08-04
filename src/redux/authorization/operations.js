import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const API = axios.create({
    baseURL: 'https://harmoniq-6.onrender.com',
});

export const setAuthHeader = token => {
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
    API.defaults.headers.common.Authorization = '';
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const response = await API.post('/auth/login', credentials);
            
            setAuthHeader(response.data.data.token);
            
            return {
                accessToken: response.data.data.token,
                user: response.data.data.user,
    };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

export const registerThunk = createAsyncThunk('auth/register',
    async (body, thunkAPI) => {
    try {
        const formData = new FormData();
        formData.append('name', body.name);
        formData.append('email', body.email);
        formData.append('password', body.password);

        const response = await API.post('/auth/register', formData);

        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const logoutThunk = createAsyncThunk('auth/logout',
    async (_, thunkAPI) => {
        try {
            await API.post('/auth/logout');
            clearAuthHeader();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// export const refresh = createAsyncThunk('auth/refresh',
//     async (_, thunkAPI) => {
//         const state = thunkAPI.getState();
//         const persistedToken = state.authorization.token;

//         if (persistedToken === null || !persistedToken) {
//             return thunkAPI.rejectWithValue('Unable to fetch user');
//         }

//         try {
//             setAuthHeader(persistedToken);
//             const res = await API.post('/auth/refresh');
//             console.log('RES', res);
            
//             return res.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     });

export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    // Виконуємо запит до сервера для рефрешу токена
      const res = await API.get('/auth/refresh',  { withCredentials: true });
      
    // Перевіряємо, чи містить відповідь accessToken
    const { accessToken } = res.data.data;
    
    if (!accessToken) {
      return thunkAPI.rejectWithValue('No access token in response');
    }

    // Оновлюємо заголовок авторизації для всіх майбутніх запитів
    setAuthHeader(accessToken);

    // Повертаємо новий токен для оновлення стану
    return accessToken;
  } catch (error) {
    // Перевіряємо, чи є error.response для отримання детальної інформації
    const errorMessage = error.response?.data?.message || error.message || 'Unexpected error';
    
    // Відправляємо повідомлення про помилку в Redux
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const uploadAvatarThunk = createAsyncThunk(
    'auth/uploadAvatar',
    async (avatarFile, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('avatar', avatarFile);
            const response = await API.patch('/users/me/avatar', formData);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

