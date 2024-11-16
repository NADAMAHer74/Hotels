import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "./Url";

const BASE_URL = `${BaseUrl}/pagination`;
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async (page) => {
  const response = await axios.get(`${BASE_URL}?page=${page}&limit=6`);
  return response.data.blogs;
});
