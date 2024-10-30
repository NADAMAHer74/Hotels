import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API endpoint

const BASE_URL = "http://localhost:5000/api/blogs";

export const fetchBlogData = createAsyncThunk(
  "BlogData/fetchBlogData",
  async ({ id }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
