import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "./Url";

const PAGINATION_URL = `${BaseUrl}/paginationOfTours`;
const BASE_URL = `${BaseUrl}/tours`;

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
