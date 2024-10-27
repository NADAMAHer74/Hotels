import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API endpoint

const API_ENDPOINT = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
export const fetchAboutData = createAsyncThunk(
    "about/fetchAboutData", async () => {
        const response = await axios.get(API_ENDPOINT);
        return response.data;
    }
);
