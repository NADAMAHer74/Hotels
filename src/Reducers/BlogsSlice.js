import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogs } from "../APIs/BlogsApi";
import { fetchBlogData } from "../APIs/BlogDetailApi";

const initialState = {
  blogs: [],
  blog: {},
  limit: 6,
};

export const BlogSlice = createSlice({
  name: "Blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
    builder.addCase(fetchBlogData.fulfilled, (state, action) => {
      state.loading = false;
      state.blog = action.payload;
    });
  },
});

export default BlogSlice.reducer;
