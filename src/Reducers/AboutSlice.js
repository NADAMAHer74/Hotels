import { createSlice } from "@reduxjs/toolkit";
import { fetchAboutImgs, fetchAboutContent, fetchAboutStats, fetchWhatWeDoImg, fetchWhatWeDo } from "../APIs/AboutApi";

export const AboutSlice = createSlice({
    name: 'about',
    initialState: {
        aboutUsImgs: [],
        aboutUsContent: {},
        aboutUsStats: [],
        whatWeDoImg: [],
        whatWeDo: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAboutImgs.fulfilled, (state, action) => {
            state.aboutUsImgs = action.payload;
        });
        builder.addCase(fetchAboutContent.fulfilled, (state, action) => {
            state.aboutUsContent = action.payload;
        });
        builder.addCase(fetchAboutStats.fulfilled, (state, action) => {
            state.aboutUsStats = action.payload;
        });
        builder.addCase(fetchWhatWeDoImg.fulfilled, (state, action) => {
            state.whatWeDoImg = action.payload;
        });
        builder.addCase(fetchWhatWeDo.fulfilled, (state, action) => {
            state.whatWeDo = action.payload;
        });
    },
})


export default AboutSlice.reducer;