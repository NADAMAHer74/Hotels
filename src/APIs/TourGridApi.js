import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/tours";

export const fetchTours = createAsyncThunk("tours/fetchTours", async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}&limit=6`);
    return response.data.tours;  
  } catch (error) {
    throw error;
  }
});



