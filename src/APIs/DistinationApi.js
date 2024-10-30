import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/destinations";
export const fetchDestinations = createAsyncThunk(
  "distinations/fetchDestinations",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);
