import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogs } from "../APIs/BlogsApi";

const initialState = {
  blogs: [],
  totalPages: 0,
  currentPage: 1,
};

export const BlogSlice = createSlice({
  name: "Blogs",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload.blogs;
      state.totalPages = action.payload.totalPages;
    });
  },
});
export const { setPage } = BlogSlice.actions;

export default BlogSlice.reducer;
