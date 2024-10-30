import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PAGINATION_URL = "http://localhost:1000/api/paginationOfTours";
const BASE_URL = "http://localhost:1000/api/tors";

export const fetchTours = createAsyncThunk("tours/fetchTours", async (page) => {
  try {
    const response = await axios.get(`${PAGINATION_URL}?page=${page}&limit=6`);
    return response.data.tours;
  } catch (error) {
    throw error;
  }
});
export const fetchTour = createAsyncThunk("tour/fetchTour", async ({ id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
