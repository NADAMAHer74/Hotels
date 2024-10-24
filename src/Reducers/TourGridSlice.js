import { createSlice } from "@reduxjs/toolkit";
import { fetchTours } from "../APIs/TourGridApi";

export const ToursSlice = createSlice({
    name: 'tours',
    initialState: {
        tours: [],
        totalPages: 0,
        currentPage: 1,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchTours.fulfilled, (state, action) => {
            state.tours = action.payload.tours;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
        })
    }
});

export default ToursSlice.Reducers; 