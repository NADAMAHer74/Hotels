import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "./Url";

const BASE_URL = `${BaseUrl}/imagebanners`;

export const fetchBanner = createAsyncThunk("banner/fetchBanner", async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
});
