import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://eecf8975-6c57-4990-969b-6a32dc2c0aff.mock.pstmn.io/hotels";
export const fetchDestinations = createAsyncThunk(
  "distinations/fetchDestinations",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);
