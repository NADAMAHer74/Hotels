import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogs } from "../APIs/BlogsApi";

const initialState = {
  blogs: [],
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
  },
});

export default BlogSlice.reducer;
