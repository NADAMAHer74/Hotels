import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://api.example.com/package-details'; 

// export const fetchPackageDetails = createAsyncThunk('package/fetchPackageDetails', async () => {
//   const response = await fetch(API_URL);
//   const data = await response.json();
//   return data;
// });
export const fetchPackageDetails = createAsyncThunk(
    "package/fetchPackageDetails",
    async () => {
      const response = await axios.get(API_URL);
      return response.data;
    }
  );
