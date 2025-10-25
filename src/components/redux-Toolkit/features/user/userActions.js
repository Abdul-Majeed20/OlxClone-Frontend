import { createAsyncThunk } from "@reduxjs/toolkit";

  let BASE_URL = "https://olx-clone-backend-new.vercel.app"

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is correct
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json(); // Add 'await' here
        return rejectWithValue(errorData);
      }
      
      const result = await response.json(); // Add 'await' here
      return result;
    } catch (error) {
      return rejectWithValue(error.message); // Return the rejected value
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/allUsers`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// In your userActions.js
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include", // Important to include cookies
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);