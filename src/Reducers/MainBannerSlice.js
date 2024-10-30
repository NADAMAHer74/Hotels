import { createSlice } from "@reduxjs/toolkit";
import { fetchBanner } from "../APIs/MainBannerApi";

const bannerSlice = createSlice({
    name: 'banner',
    initialState: {
      bannerData: {},
      status: 'idle',
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBanner.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchBanner.fulfilled, (state, action) => {
          state.bannerData = action.payload;
          state.status = 'succeeded';
        })
        .addCase(fetchBanner.rejected, (state, action) => {
          state.error = action.error.message;
          state.status = 'failed';
        });
    }
  });
  
  export default bannerSlice.reducer;