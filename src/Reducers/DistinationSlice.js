import { createSlice } from "@reduxjs/toolkit";
import { fetchDestinations } from "../APIs/DistinationApi";

const initialState = {
  destinations: [],
};

export const DistinationSlice = createSlice({
  name: "distination",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDestinations.fulfilled, (state, action) => {
      state.destinations = action.payload;
    });
  },
});

export default DistinationSlice.reducer;
