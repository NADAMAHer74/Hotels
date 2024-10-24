import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API endpoint

const API_ENDPOINT = "https://eecf8975-6c57-4990-969b-6a32dc2c0aff.mock.pstmn.io/hotels";
export const fetchAboutData = createAsyncThunk(
    "about/fetchAboutData", async () => {
        const response = await axios.get(API_ENDPOINT);
        return response.data;
    }
);
