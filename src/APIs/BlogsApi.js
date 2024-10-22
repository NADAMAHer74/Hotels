import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://hotels-api.onrender.com/api/blogs";
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async (page) => {
  const limit = 6;

  const response = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
  return { blogs: response.data, totalPages: response.data.totalPages };
});
