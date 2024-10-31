import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDestination,
  fetchAbout,
  fetchTour,
  fetchBlog,
  fetchBannerHome,
} from "../APIs/HomeApi";

const initialState = {
  distinationData: [],
  aboutData: [],
  tourData: [],
  blogData: [],
  bannerHomeData: [],
};

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDestination.fulfilled, (state, action) => {
      state.distinationData = action.payload;
    });

    builder.addCase(fetchAbout.fulfilled, (state, action) => {
      state.aboutData = action.payload;
    });

    builder.addCase(fetchTour.fulfilled, (state, action) => {
      state.tourData = action.payload;
    });

    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.blogData = action.payload;
    });

    builder.addCase(fetchBannerHome.fulfilled, (state, action) => {
      state.bannerHomeData = action.payload;
    });
  },
});

export default HomeSlice.reducer;
