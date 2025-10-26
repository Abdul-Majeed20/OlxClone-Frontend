import { createAsyncThunk } from "@reduxjs/toolkit";

let BASE_URL = "https://olx-clone-backend-new.vercel.app"

export const getMyProducts = createAsyncThunk(
  "getMyProducts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/myProducts`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      return result;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/allProducts`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      return result;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/productDetails/${id}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("product details API Response:", result);
      return result;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "addProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/addProduct`, {
        method: "POST",
        body: data, // ✅ Just pass FormData directly
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      console.log("Product Added Successfully", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async (ProductId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/user/favourite/${ProductId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ ProductId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFavourites = createAsyncThunk(
  "getFavourites",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/favourite`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      return result.data;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "addToCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/addToCart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // ✅ required for Express to parse JSON
        },
        body: JSON.stringify({ id }),
      });
      console.log("Product Id: ", id);
      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      return result.data;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/cartItems`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result.data; // Assuming { data: [...] } format
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOrder = createAsyncThunk(
  "product/addOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/user/addOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to place order");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getMyOrders = createAsyncThunk(
  "getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/myOrders`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      return result.data; // Assuming { data: [...] } format
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "getAllOrders ",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/allOrders`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      return result.data; // Assuming { data: [...] } format
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateStatus",
  async ({orderId, newStatus}, { rejectWithValue }) => {
    console.log("Order Id in action ",orderId , "new Status in action" , newStatus)
    try {
      const response = await fetch(
        `${BASE_URL}/admin/updateOrder/${orderId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result.data; // Assuming backend returns { data: updatedOrder }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      return result.data; // Assuming { data: {...} } format
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
