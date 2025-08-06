import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCurrentUser } from "../user/userSlice"; // ⬅️ Додай цей імпорт

export const API = axios.create({
  baseURL: "https://harmoniq-6.onrender.com",
});
API.defaults.withCredentials = true;

export const setAuthHeader = (token) => {
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  API.defaults.headers.common.Authorization = "";
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await API.post("/auth/login", credentials);

      const { token: accessToken, refreshToken, user } = response.data.data;

      setAuthHeader(accessToken);

      // 🧠 ДОДАЙ КОРИСТУВАЧА У userSlice
      thunkAPI.dispatch(setCurrentUser(user)); // <== ⬅️ Ось це потрібно

      return {
        accessToken,
        refreshToken,
        user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (body, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("name", body.name);
      formData.append("email", body.email);
      formData.append("password", body.password);

      const response = await API.post("/auth/register", formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await API.post("/auth/logout");
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const refreshToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) {
    return thunkAPI.rejectWithValue("No refresh token found");
  }

  try {
    const res = await API.post("/auth/refresh", { refreshToken });

    const { accessToken } = res.data.data;
    if (!accessToken) {
      return thunkAPI.rejectWithValue("Failed to refresh token");
    }

    setAuthHeader(accessToken);
    return accessToken;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const uploadAvatarThunk = createAsyncThunk(
  "auth/uploadAvatar",
  async (avatarFile, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      const response = await API.patch("/users/me/avatar", formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
