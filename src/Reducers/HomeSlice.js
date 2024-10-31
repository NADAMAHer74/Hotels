import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDestination,
  fetchAbout,
  fetchTour,
  fetchBlog,
<<<<<<< HEAD
=======
  fetchAboutContent,
>>>>>>> b7edde223d82121660b60e7a96642e64f2ba22cf
  fetchBannerHome,
} from "../APIs/HomeApi";

const initialState = {
  distinationData: [],
  aboutData: [],
  tourData: [],
  bannerHomeData:[],
  blogData: [],
<<<<<<< HEAD
  bannerHomeData: [],
=======
  aboutContent: [],
>>>>>>> b7edde223d82121660b60e7a96642e64f2ba22cf
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
<<<<<<< HEAD

=======
    builder.addCase(fetchAboutContent.fulfilled, (state, action) => {
      state.aboutContent = action.payload;
    });
>>>>>>> b7edde223d82121660b60e7a96642e64f2ba22cf
    builder.addCase(fetchBannerHome.fulfilled, (state, action) => {
      state.bannerHomeData = action.payload;
    });
  },
});

export default HomeSlice.reducer;
