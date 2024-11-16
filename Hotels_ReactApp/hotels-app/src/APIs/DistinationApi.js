import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import BaseUrl from "./Url";

const BASE_URL = `${BaseUrl}/destinations`;
export const fetchDestinations = createAsyncThunk(
  "distinations/fetchDestinations",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);
