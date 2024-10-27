import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogData } from "../APIs/BlogDetailApi";


export const BlogSlice = createSlice({
    name: 'blog',
    initialState: {
        blog: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBlogData.fulfilled, (state, action) => {
            state.blog = action.payload;
        });
    },
});

export default BlogSlice.reducer;