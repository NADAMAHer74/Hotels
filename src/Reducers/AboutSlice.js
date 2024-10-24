import { createSlice } from "@reduxjs/toolkit";
import { fetchAboutData } from "../APIs/AboutApi";

export const AboutSlice = createSlice({
    name: 'about',
    initialState: {
        about: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAboutData.fulfilled, (state, action) => {
            state.about = action.payload;
        });
    },
})


export default AboutSlice.reducer;