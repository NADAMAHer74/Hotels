import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:2000/api/pagination";
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async (page) => {
  const response = await axios.get(`${BASE_URL}?page=${page}&limit=6`);
  return response.data.blogs;
});
