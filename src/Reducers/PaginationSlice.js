import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  totalPages: 3,
};

const PaginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      console.log(state.currentPage);
    },
    nextPage: (state) => {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
        console.log(state.currentPage);
      }
    },
    previousPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
        console.log(state.currentPage);
      }
    },
  },
});

export const { setCurrentPage, nextPage, previousPage } =
  PaginationSlice.actions;
export default PaginationSlice.reducer;
