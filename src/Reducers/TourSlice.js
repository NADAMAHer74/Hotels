// src/store/tourSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTours } from "../APIs/TourGridApi";


const tourSlice = createSlice({
  name: "tours",
  initialState: {
    tours: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tourSlice.reducer;
